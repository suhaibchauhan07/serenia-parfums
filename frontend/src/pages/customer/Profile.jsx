import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Calendar, Package, Heart, Settings, X, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { formatCurrency } from '../../utils/currency';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user.name, email: user.email });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setOrdersLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.put('/auth/me', editForm);
      updateUser(res.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordLoading(true);
    setPasswordError('');
    setPasswordSuccess('');
    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordSuccess('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(''), 3000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
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
                {isEditing ? (
                  <div className="space-y-4 w-full max-w-md">
                    <input 
                      type="text" 
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-secondary text-3xl font-serif font-bold"
                    />
                    <input 
                      type="email" 
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-secondary text-gray-600"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-serif font-bold">{user.name}</h1>
                    <p className="text-gray-400 flex items-center mt-1">
                      <Mail size={14} className="mr-2" /> {user.email}
                    </p>
                  </>
                )}
              </div>
              {isEditing ? (
                <div className="flex space-x-4">
                  <button 
                    onClick={() => { setIsEditing(false); setEditForm({ name: user.name, email: user.email }); }}
                    className="border border-gray-300 py-2 px-4 text-xs hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="luxury-button py-2 px-4 text-xs flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t border-b border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <> Save </>
                    )}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="luxury-button py-2 px-4 text-xs"
                >
                  EDIT PROFILE
                </button>
              )}
            </div>
            {success && (
              <div className="px-8 pb-6 text-green-600 flex items-center">
                <CheckCircle size={16} className="mr-2" />
                {success}
              </div>
            )}
            {error && (
              <div className="px-8 pb-6 text-red-600">
                {error}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-sm shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Account Details</h3>
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
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Links</h3>
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
                {ordersLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-50 rounded-sm">
                    <Package size={40} className="text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <Link to="/products" className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-100 rounded-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Order #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(order.created_at).toLocaleDateString()} • {order.payment_method.replace('_', ' ').toUpperCase()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{formatCurrency(order.total)}</p>
                            <p className="text-xs text-green-600 uppercase tracking-widest">{order.status}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {order.order_items?.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <img 
                                src={item.products?.image_url || 'https://via.placeholder.com/50x50'} 
                                alt={item.products?.name} 
                                className="w-12 h-12 object-cover rounded-sm"
                              />
                              <div className="flex-grow">
                                <p className="font-medium text-sm">{item.products?.name}</p>
                                <p className="text-xs text-gray-400">Qty: {item.quantity} • {formatCurrency(item.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white p-8 rounded-sm shadow-sm">
                <h3 className="text-xl font-serif font-bold mb-6">Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-accent rounded-sm">
                    <div>
                      <h4 className="font-bold text-sm">Password</h4>
                      <p className="text-xs text-gray-400">Last changed 2 days ago</p>
                    </div>
                    <button 
                      className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline" 
                      onClick={() => setShowPasswordModal(true)}
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-accent rounded-sm">
                    <div>
                      <h4 className="font-bold text-sm">Two-Factor Authentication</h4>
                      <p className="text-xs text-gray-400">Not enabled</p>
                    </div>
                    <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-sm max-w-md w-full p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif font-bold">Change Password</h3>
                <button 
                  onClick={() => { 
                    setShowPasswordModal(false); 
                    setPasswordError(''); 
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); 
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              {passwordSuccess }&& <div className="text-green-600 mb-4">{passwordSuccess}</div>
              {passwordError && <div className="text-red-600 mb-4">{passwordError}</div>}
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">New Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="luxury-button w-full py-3 text-xs mt-4"
                >
                  {passwordLoading ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
