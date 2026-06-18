import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

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
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/') ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              Home
            </Link>
            
            <Link 
              to="/products" 
              className={`text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/products') ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/about') ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/contact') ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-600 hover:text-primary transition-colors" onClick={() => setShowSearch(!showSearch)}>
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

      {/* Search Modal */}
      {showSearch && (
        <div className="border-t border-gray-100 bg-white py-4">
          <div className="container mx-auto px-4 md:px-6">
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for perfumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-b border-gray-200 py-2 focus:outline-none focus:border-secondary"
              autoFocus
            />
            <button
              type="submit"
              className="luxury-button text-xs py-2 px-4"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
