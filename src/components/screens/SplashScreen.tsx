import React from 'react';
import { HouseLogo } from '../common/HouseLogo';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="relative flex flex-col justify-between h-full bg-gradient-to-b from-blue-600 via-blue-600 to-blue-700 text-white px-6 py-12 select-none overflow-hidden">
      {/* Subtle background ambient waves */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top spacer */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => navigate('home')}
          className="text-xs font-medium text-blue-100/80 hover:text-white px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm transition"
        >
          Skip to Home →
        </button>
      </div>

      {/* Center Branding matching Screen 1 */}
      <div className="flex flex-col items-center justify-center my-auto text-center">
        <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20 mb-6 transform hover:scale-105 transition-transform duration-300">
          <HouseLogo size={96} variant="white" />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-white">
          Room <span className="text-amber-300">Partner</span>
        </h1>
        <p className="text-lg font-semibold text-blue-200 mb-6">
          Monthly Expenses
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-medium text-blue-100/90 tracking-wide px-4 py-1.5 rounded-full bg-blue-700/40 border border-blue-400/20">
          <span>Same Room</span>
          <span className="text-blue-300">|</span>
          <span>Same Goals</span>
          <span className="text-blue-300">|</span>
          <span>Shared Expenses</span>
        </div>
      </div>

      {/* Bottom Area: Pagination Dots & Action Buttons */}
      <div className="flex flex-col items-center gap-6 pb-2">
        {/* Pagination Indicator as shown in screenshot */}
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-8 h-1.5 bg-white rounded-full transition-all" />
          <div className="w-2 h-1.5 bg-white/40 rounded-full" />
          <div className="w-2 h-1.5 bg-white/40 rounded-full" />
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={() => navigate('login')}
            className="w-full py-3.5 px-6 rounded-2xl bg-white text-blue-700 font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-blue-50 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('home')}
            className="w-full py-2.5 text-xs text-blue-200 hover:text-white font-medium transition"
          >
            Explore Dashboard Directly
          </button>
        </div>
      </div>
    </div>
  );
};
