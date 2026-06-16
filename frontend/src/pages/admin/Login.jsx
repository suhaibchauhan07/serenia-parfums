import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Access denied: Unauthorized role');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-sm shadow-2xl overflow-hidden">
        <div className="bg-secondary p-8 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white text-secondary mb-4 shadow-lg">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold uppercase tracking-widest">Admin Portal</h2>
        </div>
        
        <div className="p-10">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-sm text-sm mb-6 border-l-4 border-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Admin Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 pl-10 focus:outline-none focus:border-secondary transition-colors"
                  placeholder="admin@elixirparfum.com"
                />
                <Mail size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 pl-10 focus:outline-none focus:border-secondary transition-colors"
                  placeholder="••••••••"
                />
                <Lock size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white flex items-center justify-center py-4 hover:bg-secondary transition-colors duration-300 font-bold tracking-[0.2em] disabled:bg-gray-400"
            >
              {loading ? 'AUTHENTICATING...' : (
                <>AUTHORIZE <ArrowRight className="ml-2" size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-[10px] text-gray-400 uppercase tracking-widest hover:text-primary transition-colors"
            >
              Return to Main Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
