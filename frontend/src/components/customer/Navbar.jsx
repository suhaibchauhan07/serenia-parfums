import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [categories, setCategories] = useState([
    { id: 'temp1', name: "Men's Perfumes" },
    { id: 'temp2', name: "Women's Perfumes" },
    { id: 'temp3', name: "Unisex Perfumes" },
    { id: 'temp4', name: "Oud Collection" },
    { id: 'temp5', name: "Luxury Collection" }
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const res = await api.get('/categories');
        console.log('Categories API response:', res.data);
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
    setDropdownOpen(false);
  };

  const isActive = (path, checkCategory = false) => {
    if (checkCategory) {
      return categoryId !== null || location.pathname === path;
    }
    return location.pathname === path;
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
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                className={`text-sm font-medium transition-colors uppercase tracking-widest flex items-center ${isActive('/products', true) ? 'text-secondary' : 'hover:text-secondary'}`}
              >
                Categories
                {dropdownOpen ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
              </button>
              
              {dropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-sm shadow-lg border border-gray-100 py-2 z-50"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => { navigate('/products'); setDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors"
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${categoryId === category.id ? 'text-secondary font-bold bg-gray-50' : 'text-gray-700 hover:bg-gray-50 hover:text-secondary'}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              to="/products" 
              className={`text-sm font-medium transition-colors uppercase tracking-widest ${isActive('/products') && !categoryId ? 'text-secondary' : 'hover:text-secondary'}`}
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
            <button className="text-gray-600 hover:text-primary transition-colors" onClick={() => navigate('/products')}>
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
