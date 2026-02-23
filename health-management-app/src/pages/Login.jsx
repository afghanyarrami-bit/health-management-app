import React, { useState } from 'react';
import { Heart, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { login } from '../data/admindata';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for better UX
    setTimeout(() => {
      const result = login(username, password);
      
      if (result.success) {
        onLoginSuccess(result.role);
      } else {
        setError(result.error);
        setPassword('');
      }
      
      setIsLoading(false);
    }, 500);
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else if (role === 'doctor') {
      setUsername('doctor');
      setPassword('doctor123');
    } else if (role === 'nurse') {
      setUsername('nurse');
      setPassword('nurse123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0c0a09' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)',
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-orange-500 p-4 border-4 border-white">
              <Heart size={48} fill="white" stroke="white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            HEALTH<span className="text-orange-500">TRACK</span>
          </h1>
          <p className="text-stone-400 uppercase tracking-wider text-sm">
            Medical Dashboard System
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-stone-900 border-4 border-stone-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            ADMIN LOGIN
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-stone-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-stone-800 border-2 border-stone-700 text-white pl-10 pr-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Enter username"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-stone-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-800 border-2 border-stone-700 text-white pl-10 pr-12 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Enter password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900 border-2 border-red-700 p-3 flex items-center gap-2">
                <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 font-bold hover:bg-orange-600 transition-colors disabled:bg-stone-700 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'LOGGING IN...' : 'LOGIN'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t-2 border-stone-700">
            <p className="text-xs text-stone-400 text-center mb-3">
              Demo Accounts (Click to auto-fill)
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="bg-stone-800 text-stone-300 py-2 px-3 text-xs font-bold hover:bg-stone-700 hover:text-white transition-colors border border-stone-700"
                disabled={isLoading}
              >
                Admin
              </button>
              <button
                onClick={() => handleDemoLogin('doctor')}
                className="bg-stone-800 text-stone-300 py-2 px-3 text-xs font-bold hover:bg-stone-700 hover:text-white transition-colors border border-stone-700"
                disabled={isLoading}
              >
                Doctor
              </button>
              <button
                onClick={() => handleDemoLogin('nurse')}
                className="bg-stone-800 text-stone-300 py-2 px-3 text-xs font-bold hover:bg-stone-700 hover:text-white transition-colors border border-stone-700"
                disabled={isLoading}
              >
                Nurse
              </button>
            </div>
            <p className="text-xs text-stone-500 text-center mt-3">
              Click any role above, then press LOGIN
            </p>
          </div>

          {/* Credentials Info */}
          <div className="mt-6 bg-stone-800 border-2 border-stone-700 p-4">
            <p className="text-xs text-stone-400 font-bold mb-2">Default Credentials:</p>
            <div className="space-y-1 text-xs text-stone-500">
              <p>• Admin: admin / admin123</p>
              <p>• Doctor: doctor / doctor123</p>
              <p>• Nurse: nurse / nurse123</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-stone-500">
            © 2026 HealthTrack. All rights reserved.
          </p>
          <p className="text-xs text-stone-600 mt-1">
            Medical Dashboard v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
