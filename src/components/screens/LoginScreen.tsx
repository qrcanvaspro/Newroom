import React, { useState } from 'react';
import { HouseLogo } from '../common/HouseLogo';
import { useApp } from '../../context/AppContext';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { navigate, user, loginWithGoogle } = useApp();
  const [email, setEmail] = useState('rohit2710@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and transition to home
    navigate('home');
  };

  return (
    <div className="flex flex-col justify-between h-full bg-white px-6 py-8 overflow-y-auto">
      {/* Top Branding matching Screen 2 */}
      <div className="flex flex-col items-center pt-4">
        <HouseLogo size={68} variant="blue" className="mb-2" />
        <h1 className="text-2xl font-extrabold tracking-tight text-blue-600">
          Room <span className="text-amber-500">Partner</span>
        </h1>
        <p className="text-sm font-semibold text-blue-500 mb-1">
          Monthly Expenses
        </p>
        <p className="text-xs text-slate-500 mt-2 text-center max-w-xs">
          Login to manage your room expenses
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full my-auto py-4 space-y-4">
        {/* Email or Mobile Number */}
        <div className="space-y-1.5">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400">
              <User className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Mobile Number"
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 accent-blue-600"
            />
            <span>Remember Me</span>
          </label>
          <button
            type="button"
            onClick={() => alert('Password reset link sent to registered email!')}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition mt-2"
        >
          Login
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
            OR
          </span>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          disabled={isLoadingGoogle}
          onClick={async () => {
            setIsLoadingGoogle(true);
            try {
              await loginWithGoogle();
            } finally {
              setIsLoadingGoogle(false);
            }
          }}
          className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.98] transition disabled:opacity-70"
        >
          {isLoadingGoogle ? (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>{isLoadingGoogle ? 'Signing in with Google...' : 'Continue with Google'}</span>
        </button>
      </form>

      {/* Footer Sign Up Link */}
      <div className="text-center pt-2 pb-1">
        <p className="text-xs text-slate-500">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('signup')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};
