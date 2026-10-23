import React from 'react';
import { Home, Receipt, Users, BarChart3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigate } = useApp();

  const tabs: { id: ScreenType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'all-expenses', label: 'Expenses', icon: Receipt },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const isActive = (tabId: ScreenType) => {
    if (tabId === 'home') return currentScreen === 'home';
    if (tabId === 'all-expenses') return currentScreen === 'all-expenses';
    if (tabId === 'members') return currentScreen === 'members' || currentScreen === 'add-member';
    if (tabId === 'reports') return currentScreen === 'reports';
    return false;
  };

  return (
    <nav
      aria-label="Bottom Navigation"
      className="shrink-0 bg-white border-t border-slate-100 px-3 py-2 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.id);
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] py-1 transition-all ${
                active ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-transform ${
                  active ? 'scale-110' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[11px] leading-tight tracking-tight mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
