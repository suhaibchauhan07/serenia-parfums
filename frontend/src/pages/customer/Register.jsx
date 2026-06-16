import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-sm shadow-xl overflow-hidden">
        <div className="p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold mb-2">Create Account</h2>
            <p className="text-gray-500 text-sm">Join the Elixir Parfum community</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-sm text-sm mb-6 border-l-4 border-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-gray-200 py-3 pl-10 focus:outline-none focus:border-secondary transition-colors"
                  placeholder="Alex Johnson"
                />
                <User size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

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

            <div className="text-[10px] text-gray-400 leading-relaxed">
              By creating an account, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full luxury-button flex items-center justify-center py-4 disabled:bg-gray-400"
            >
              {loading ? 'CREATING ACCOUNT...' : (
                <>CREATE ACCOUNT <ArrowRight className="ml-2" size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-secondary font-bold hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
