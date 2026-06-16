import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-primary">
            Serenia<span className="text-secondary">Parfums</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-secondary transition-colors uppercase tracking-widest">Home</Link>
            <Link to="/products" className="text-sm font-medium hover:text-secondary transition-colors uppercase tracking-widest">Products</Link>
            <Link to="/about" className="text-sm font-medium hover:text-secondary transition-colors uppercase tracking-widest">About Us</Link>
            <Link to="/contact" className="text-sm font-medium hover:text-secondary transition-colors uppercase tracking-widest">Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-600 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            
            <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-600 hover:text-primary transition-colors">
                  <User size={20} />
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-red-600 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="luxury-button text-xs py-2 px-4">
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
