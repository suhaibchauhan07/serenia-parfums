import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get('/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      await api.post('/cart', { product_id: productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await api.delete(`/cart/${cartItemId}`);
      await fetchCart();
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await api.put(`/cart/${cartItemId}`, { quantity: newQuantity });
      await fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.product_id === productId);
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.products.price);
      const quantity = Number(item.quantity);
      return total + (price * quantity);
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, loading, addToCart, removeFromCart, updateQuantity, cartTotal, isProductInCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
