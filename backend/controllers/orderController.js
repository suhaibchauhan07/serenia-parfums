const supabase = require('../config/supabase');

exports.createOrder = async (req, res) => {
  const { payment_method } = req.body;
  const userId = req.user.id;

  try {
    // Get cart items for the user
    const { data: cartItems, error: cartError } = await supabase
      .from('cart')
      .select('*, products(*)')
      .eq('user_id', userId);

    if (cartError) throw cartError;
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate order total
    const total = cartItems.reduce((sum, item) => {
      return sum + (Number(item.products.price) * Number(item.quantity));
    }, 0);

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: userId,
          total: total,
          payment_method: payment_method,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Clear cart
    const { error: clearCartError } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId);

    if (clearCartError) throw clearCartError;

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (ordersError) throw ordersError;
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get orders' });
  }
};
