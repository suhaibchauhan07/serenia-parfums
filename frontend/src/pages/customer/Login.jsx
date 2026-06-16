import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
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
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-sm shadow-xl overflow-hidden">
        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign in to your Elixir Parfum account</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-sm text-sm mb-6 border-l-4 border-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 pl-10 focus:outline-none focus:border-secondary transition-colors"
                  placeholder="alex@example.com"
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

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-gray-500">
                <input type="checkbox" className="mr-2 accent-secondary" />
                Remember me
              </label>
              <a href="#" className="text-secondary font-bold hover:underline">Forgot Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full luxury-button flex items-center justify-center py-4 disabled:bg-gray-400"
            >
              {loading ? 'SIGNING IN...' : (
                <>SIGN IN <ArrowRight className="ml-2" size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-secondary font-bold hover:underline">Create Account</Link>
          </div>
        </div>
        
        <div className="bg-primary p-4 text-center">
          <Link to="/admin/login" className="text-[10px] text-gray-500 uppercase tracking-[0.2em] hover:text-secondary transition-colors">
            Staff Access Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
