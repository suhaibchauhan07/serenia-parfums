import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, Calendar, Package, Heart, Settings } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-sm shadow-sm overflow-hidden mb-8">
            <div className="bg-primary h-32 relative">
              <div className="absolute -bottom-12 left-8 border-4 border-white rounded-full overflow-hidden bg-white">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=c5a059&color=fff&size=128`} 
                  alt={user.name} 
                  className="w-24 h-24"
                />
              </div>
            </div>
            <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-serif font-bold">{user.name}</h1>
                <p className="text-gray-400 flex items-center mt-1">
                  <Mail size={14} className="mr-2" /> {user.email}
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="luxury-button py-2 px-4 text-xs">EDIT PROFILE</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Account Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Shield size={16} className="text-secondary mr-3" />
                    <span className="text-gray-600 capitalize">{user.role} Account</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="text-secondary mr-3" />
                    <span className="text-gray-600">Joined June 2026</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Links</h3>
                <nav className="space-y-2">
                  <a href="#" className="flex items-center p-2 text-sm text-gray-600 hover:bg-accent rounded-sm transition-colors">
                    <Package size={16} className="mr-3" /> My Orders
                  </a>
                  <a href="#" className="flex items-center p-2 text-sm text-gray-600 hover:bg-accent rounded-sm transition-colors">
                    <Heart size={16} className="mr-3" /> Wishlist
                  </a>
                  <a href="#" className="flex items-center p-2 text-sm text-gray-600 hover:bg-accent rounded-sm transition-colors">
                    <Settings size={16} className="mr-3" /> Settings
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-sm shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-6">Recent Orders</h3>
                <div className="text-center py-12 border-2 border-dashed border-gray-50 rounded-sm">
                  <Package size={40} className="text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">You haven't placed any orders yet.</p>
                  <button className="mt-4 text-secondary font-bold text-xs uppercase tracking-widest hover:underline">Start Shopping</button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-sm shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-6">Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-accent rounded-sm">
                    <div>
                      <h4 className="font-bold text-sm">Password</h4>
                      <p className="text-xs text-gray-400">Last changed 2 days ago</p>
                    </div>
                    <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">Change</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-accent rounded-sm">
                    <div>
                      <h4 className="font-bold text-sm">Two-Factor Authentication</h4>
                      <p className="text-xs text-gray-400">Not enabled</p>
                    </div>
                    <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">Enable</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
