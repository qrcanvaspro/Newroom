import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import {
  Utensils,
  Zap,
  Users,
  BarChart3,
  ChevronRight,
  CheckCheck,
  BellOff,
} from 'lucide-react';
import { AppNotification } from '../../types';

export const NotificationsScreen: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    navigate,
    goBack,
  } = useApp();

  const getNotificationIcon = (notif: AppNotification) => {
    switch (notif.type) {
      case 'expense_added':
        return {
          icon: Utensils,
          bg: 'bg-emerald-500 text-white',
        };
      case 'expense_split':
        return {
          icon: Zap,
          bg: 'bg-blue-600 text-white',
        };
      case 'member_added':
        return {
          icon: Users,
          bg: 'bg-emerald-600 text-white',
        };
      case 'report_ready':
        return {
          icon: BarChart3,
          bg: 'bg-purple-600 text-white',
        };
      default:
        return {
          icon: Utensils,
          bg: 'bg-blue-500 text-white',
        };
    }
  };

  const handleNotificationClick = (notif: AppNotification) => {
    markNotificationAsRead(notif.id);
    if (notif.relatedExpenseId) {
      navigate('expense-details', { expenseId: notif.relatedExpenseId });
    } else if (notif.type === 'report_ready') {
      navigate('reports');
    } else if (notif.type === 'member_added') {
      navigate('members');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 select-none">
      {/* Header matching Screen 12: Royal Blue with back arrow & Notifications */}
      <Header
        title="Notifications"
        variant="blue"
        showBack={true}
        onBack={goBack}
        rightAction={
          notifications.length > 0 ? (
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-blue-100 hover:text-white px-2 py-1 rounded transition flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Read all</span>
            </button>
          ) : undefined
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <BellOff className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-semibold">No notifications</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl divide-y divide-slate-100 shadow-sm border border-slate-100 overflow-hidden">
            {notifications.map((notif) => {
              const visual = getNotificationIcon(notif);
              const Icon = visual.icon;

              return (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition ${
                    !notif.read ? 'bg-blue-50/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${visual.bg}`}
                    >
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {notif.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{notif.subtitle}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{notif.timestamp}</p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
