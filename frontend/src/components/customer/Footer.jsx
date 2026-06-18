import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold tracking-widest text-secondary">Serenia Parfums</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting timeless scents that evoke emotion and define elegance. Experience the art of luxury perfumery.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-secondary transition-colors">All Products</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-secondary transition-colors">Men's Collection</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Women's Collection</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Unisex Scents</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Gift Sets</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <MapPin size={16} className="mr-3 text-secondary" />
                123 Mataur Road, Sector 73, Mohali, India
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3 text-secondary" />
                +91 9634420786
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-3 text-secondary" />
                concierge@sereniaparfums.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Serenia Parfums. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
