import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'riffa_admin' && password === 'riffa2025') {
      onLogin(true);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-[#e8ddd0]"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2d2535] rounded-full mb-4">
            <Lock className="text-[#c9a96e] w-8 h-8" />
          </div>
          <h1 className="text-2xl font-cormorant font-bold text-[#2d2535]">RIFFA Admin</h1>
          <p className="text-sm text-gray-500 mt-2">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e8ddd0] rounded-lg focus:outline-none focus:border-[#c9a96e] transition-colors"
                placeholder="riffa_admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#faf8f5] border border-[#e8ddd0] rounded-lg focus:outline-none focus:border-[#c9a96e] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#2d2535] text-[#faf8f5] rounded-lg font-semibold hover:bg-[#3d3545] transition-colors shadow-lg shadow-[#2d2535]/20"
          >
            Login to Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.hash = ''}
            className="text-sm text-gray-500 hover:text-[#2d2535] transition-colors"
          >
            Back to Store
          </button>
        </div>
      </motion.div>
    </div>
  );
}
