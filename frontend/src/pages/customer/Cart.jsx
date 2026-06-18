import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { formatCurrency } from '../../utils/currency';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuyNow = async (paymentMethod) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/orders', { payment_method: paymentMethod });
      await fetchCart();
      setShowPaymentModal(false);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete order');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <div className="bg-accent w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart size={40} className="text-secondary" />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4">Please Login to View Cart</h2>
        <Link to="/login" className="luxury-button inline-block">
          Login
        </Link>
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
            {cartItems.map((item) => {
              const price = Number(item.products.price);
              const quantity = Number(item.quantity);
              const itemTotal = price * quantity;
              return (
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
                    <p className="text-gray-400 text-sm mb-2">{formatCurrency(price)}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-medium">{quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, quantity + 1)}
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
                    {formatCurrency(itemTotal)}
                  </div>
                </div>
              );
            })}
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

              <button 
                onClick={() => setShowPaymentModal(true)}
                className="w-full luxury-button flex items-center justify-center py-4"
              >
                BUY NOW <ArrowRight className="ml-2" size={18} />
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif font-bold">Select Payment Method</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            {error && <div className="text-red-600 mb-4">{error}</div>}
            
            <div className="space-y-4">
              <button
                onClick={() => handleBuyNow('google_pay')}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 p-4 border border-gray-200 hover:border-secondary rounded-sm transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {/* Google Pay icon placeholder */}
                  <svg viewBox="0 0 24 24" className="w-8 h-8">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <span className="font-bold">Google Pay</span>
              </button>
              
              <button
                onClick={() => handleBuyNow('paytm')}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 p-4 border border-gray-200 hover:border-secondary rounded-sm transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center bg-[#00BAF2] text-white rounded-sm font-bold text-xs">
                  P
                </div>
                <span className="font-bold">Paytm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
