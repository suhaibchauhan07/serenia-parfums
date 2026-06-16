const supabase = require('../config/supabase');

exports.getCart = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cart')
      .select('*, products(*)')
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    // Check if item already in cart
    const { data: existingItem } = await supabase
      .from('cart')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('product_id', product_id)
      .single();

    if (existingItem) {
      const { data, error } = await supabase
        .from('cart')
        .update({ quantity: existingItem.quantity + (quantity || 1) })
        .eq('id', existingItem.id)
        .select()
        .single();
      if (error) throw error;
      return res.json(data);
    }

    const { data, error } = await supabase
      .from('cart')
      .insert([{ user_id: req.user.id, product_id, quantity: quantity || 1 }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: req.body.quantity })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
