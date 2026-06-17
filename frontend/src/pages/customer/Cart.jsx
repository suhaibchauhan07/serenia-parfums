import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, loading } = useCart();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <div className="bg-accent w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={40} className="text-secondary" />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">It looks like you haven't added any fragrances to your collection yet.</p>
        <Link to="/products" className="luxury-button inline-block">
          EXPLORE COLLECTION
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-serif font-bold mb-12">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-grow space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-sm shadow-sm flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-32 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                  <img 
                    src={item.products.image_url || 'https://via.placeholder.com/100x130'} 
                    alt={item.products.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow text-center sm:text-left">
                  <div className="text-xs text-secondary font-bold uppercase tracking-widest mb-1">{item.products.brand}</div>
                  <h3 className="text-lg font-serif font-bold mb-1">{item.products.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{formatCurrency(item.products.price)}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="w-24 text-right font-bold">
                  {formatCurrency(item.products.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="w-full lg:w-96">
            <div className="bg-white p-8 rounded-sm shadow-sm">
              <h3 className="text-xl font-serif font-bold mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
              </div>

              <button className="w-full luxury-button flex items-center justify-center py-4">
                PROCEED TO CHECKOUT <ArrowRight className="ml-2" size={18} />
              </button>
              
              <div className="mt-6 text-center">
                <Link to="/products" className="text-sm text-gray-400 hover:text-primary transition-colors uppercase tracking-widest font-medium">
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div className="mt-8 bg-secondary bg-opacity-10 p-6 rounded-sm border border-secondary border-opacity-20">
              <h4 className="font-bold text-sm uppercase tracking-widest mb-2 text-secondary">Concierge Service</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Need assistance with your order? Our fragrance experts are available to guide you.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
