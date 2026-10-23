import React, { useState } from 'react';
import { HouseLogo } from '../common/HouseLogo';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export const SignUpScreen: React.FC = () => {
  const { navigate, goBack } = useApp();
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Simulate sign-up success
    navigate('home');
  };

  return (
    <div className="flex flex-col justify-between h-full bg-white px-6 py-6 overflow-y-auto">
      {/* Top Bar with back arrow */}
      <div className="flex items-center">
        <button
          onClick={goBack}
          className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-700 active:scale-95 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Header Info matching Screen 3 */}
      <div className="flex flex-col items-center pt-2">
        <HouseLogo size={60} variant="blue" className="mb-2" />
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Create Your Account
        </h1>
        <p className="text-xs text-slate-500 mt-1 text-center max-w-xs leading-relaxed">
          Join Room Partner and manage your monthly expenses easily.
        </p>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="w-full my-auto py-3 space-y-3.5">
        {/* Full Name */}
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-400">
            <User className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        {/* Email or Mobile Number */}
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-400">
            <Mail className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Email or Mobile Number"
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        {/* Password */}
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

        {/* Confirm Password */}
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-400">
            <Lock className="w-4 h-4" />
          </span>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition mt-2"
        >
          Sign Up
        </button>
      </form>

      {/* Footer */}
      <div className="text-center pt-2 pb-1">
        <p className="text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={() => navigate('login')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
