import React from 'react';
import { ArrowLeft, Menu, Bell, Plus, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  title?: string;
  variant?: 'blue' | 'white';
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  showMenu?: boolean;
  onMenuClick?: () => void;
  showNotificationBell?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  variant = 'white',
  showBack = false,
  onBack,
  rightAction,
  showMenu = false,
  onMenuClick,
  showNotificationBell = false,
}) => {
  const { goBack, navigate, notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const isBlue = variant === 'blue';

  return (
    <header
      className={`relative z-20 flex items-center justify-between px-4 h-14 shrink-0 transition-colors ${
        isBlue
          ? 'bg-blue-600 text-white'
          : 'bg-white text-slate-800 border-b border-slate-100'
      }`}
    >
      {/* Left Slot */}
      <div className="flex items-center gap-3">
        {showMenu && (
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        )}

        {showBack && (
          <button
            onClick={onBack || goBack}
            aria-label="Go back"
            className={`w-10 h-10 flex items-center justify-center rounded-full transition active:scale-95 ${
              isBlue
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {title && (
          <h1
            className={`text-lg font-semibold tracking-tight truncate ${
              isBlue ? 'text-white' : 'text-slate-900'
            }`}
          >
            {title}
          </h1>
        )}
      </div>

      {/* Right Slot */}
      <div className="flex items-center gap-1">
        {showNotificationBell && (
          <button
            onClick={() => navigate('notifications')}
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:scale-95 transition"
          >
            <Bell className="w-5 h-5 text-white" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-blue-600" />
            )}
          </button>
        )}

        {rightAction}
      </div>
    </header>
  );
};
