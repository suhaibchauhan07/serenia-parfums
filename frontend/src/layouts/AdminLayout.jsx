import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, PlusCircle, LogOut, Menu, Tag } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-serif font-bold tracking-widest text-secondary">
          ADMIN PANEL
        </div>
        <nav className="flex-grow mt-6">
          <Link to="/admin/dashboard" className="flex items-center px-6 py-4 hover:bg-gray-800 transition-colors">
            <LayoutDashboard className="mr-3" size={20} />
            Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center px-6 py-4 hover:bg-gray-800 transition-colors">
            <ShoppingBag className="mr-3" size={20} />
            Products
          </Link>
          <Link to="/admin/categories" className="flex items-center px-6 py-4 hover:bg-gray-800 transition-colors">
            <Tag className="mr-3" size={20} />
            Categories
          </Link>
          <Link to="/admin/add-product" className="flex items-center px-6 py-4 hover:bg-gray-800 transition-colors">
            <PlusCircle className="mr-3" size={20} />
            Add Product
          </Link>
        </nav>
        <button 
          onClick={handleLogout}
          className="flex items-center px-6 py-4 hover:bg-red-900 transition-colors mt-auto mb-6"
        >
          <LogOut className="mr-3" size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 md:px-10">
          <button className="md:hidden">
            <Menu size={24} />
          </button>
          <div className="font-medium text-gray-700">Welcome back, Admin</div>
          <div className="flex items-center">
            <img 
              src="https://ui-avatars.com/api/?name=Admin&background=c5a059&color=fff" 
              alt="Admin" 
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>
        <main className="flex-grow overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
