import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import {
  Plus,
  Users,
  BarChart3,
  Receipt,
  Utensils,
  Zap,
  Wifi,
  Home as HomeIcon,
  ShoppingBag,
  Sparkles,
  Droplet,
  ChevronRight,
  TrendingUp,
  X,
  User,
  Settings,
  LogOut,
  Bell,
  Building,
} from 'lucide-react';
import { ExpenseCategory } from '../../types';

export const HomeScreen: React.FC = () => {
  const {
    navigate,
    totalMonthlyExpenses,
    lastMonthExpenses,
    expenses,
    members,
    roomDetails,
    user,
  } = useApp();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Helper for category icons and styles
  const getCategoryVisuals = (category: ExpenseCategory) => {
    switch (category) {
      case 'Food':
        return {
          icon: Utensils,
          bg: 'bg-emerald-500 text-white',
          lightBg: 'bg-emerald-50 text-emerald-600',
        };
      case 'Electricity':
        return {
          icon: Zap,
          bg: 'bg-amber-500 text-white',
          lightBg: 'bg-amber-50 text-amber-600',
        };
      case 'Internet':
        return {
          icon: Wifi,
          bg: 'bg-indigo-500 text-white',
          lightBg: 'bg-indigo-50 text-indigo-600',
        };
      case 'Rent':
        return {
          icon: HomeIcon,
          bg: 'bg-blue-600 text-white',
          lightBg: 'bg-blue-50 text-blue-600',
        };
      case 'Groceries':
        return {
          icon: ShoppingBag,
          bg: 'bg-teal-500 text-white',
          lightBg: 'bg-teal-50 text-teal-600',
        };
      case 'Maid':
        return {
          icon: Sparkles,
          bg: 'bg-pink-500 text-white',
          lightBg: 'bg-pink-50 text-pink-600',
        };
      case 'Water':
        return {
          icon: Droplet,
          bg: 'bg-cyan-500 text-white',
          lightBg: 'bg-cyan-50 text-cyan-600',
        };
      default:
        return {
          icon: Receipt,
          bg: 'bg-slate-500 text-white',
          lightBg: 'bg-slate-50 text-slate-600',
        };
    }
  };

  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="flex flex-col h-full bg-slate-50 relative select-none">
      {/* Top Header matching Screen 4: Royal Blue with Hamburger & Bell */}
      <Header
        variant="blue"
        title="Room Partner"
        showMenu={true}
        onMenuClick={() => setIsDrawerOpen(true)}
        showNotificationBell={true}
      />

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Total Monthly Expenses Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Receipt className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Total Monthly Expenses</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                  {roomDetails.currency} {totalMonthlyExpenses.toLocaleString()}
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3" />
                  12%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Last month: {roomDetails.currency} {lastMonthExpenses.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* 2x2 Quick Action Grid matching Screen 4 */}
        <div className="grid grid-cols-2 gap-3">
          {/* 1. Add Expense */}
          <button
            onClick={() => navigate('add-expense', { resetDraft: true })}
            className="flex flex-col items-center justify-center p-3.5 bg-blue-50/80 hover:bg-blue-100/80 rounded-2xl border border-blue-100 transition active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 mb-2 group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-blue-900">Add Expense</span>
          </button>

          {/* 2. Split Bills */}
          <button
            onClick={() => navigate('split-expense')}
            className="flex flex-col items-center justify-center p-3.5 bg-emerald-50/80 hover:bg-emerald-100/80 rounded-2xl border border-emerald-100 transition active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 mb-2 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-xs font-bold text-emerald-900">Split Bills</span>
          </button>

          {/* 3. View Reports */}
          <button
            onClick={() => navigate('reports')}
            className="flex flex-col items-center justify-center p-3.5 bg-purple-50/80 hover:bg-purple-100/80 rounded-2xl border border-purple-100 transition active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/20 mb-2 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-xs font-bold text-purple-900">View Reports</span>
          </button>

          {/* 4. Members */}
          <button
            onClick={() => navigate('members')}
            className="flex flex-col items-center justify-center p-3.5 bg-amber-50/80 hover:bg-amber-100/80 rounded-2xl border border-amber-100 transition active:scale-[0.98] group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 mb-2 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-xs font-bold text-amber-900">Members</span>
          </button>
        </div>

        {/* Recent Expenses List matching Screen 4 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-800">Recent Expenses</h2>
            <button
              onClick={() => navigate('all-expenses')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentExpenses.map((exp) => {
              const visual = getCategoryVisuals(exp.category);
              const VisualIcon = visual.icon;
              const payer = members.find((m) => m.id === exp.paidBy);

              return (
                <div
                  key={exp.id}
                  onClick={() => navigate('expense-details', { expenseId: exp.id })}
                  className="flex items-center justify-between py-3 hover:bg-slate-50/60 rounded-xl px-1 cursor-pointer transition"
                >
                  {/* Left: Category Icon + Title + Date */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${visual.bg}`}
                    >
                      <VisualIcon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{exp.date}</p>
                    </div>
                  </div>

                  {/* Right: Amount + Member Avatars */}
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900 tabular-nums">
                        {roomDetails.currency} {exp.amount.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {exp.paidBy === user.id ? 'You paid' : `Paid by ${payer?.name || 'Roommate'}`}
                      </p>
                    </div>

                    {/* Member Avatars Stack */}
                    <div className="flex -space-x-1.5 overflow-hidden shrink-0">
                      {exp.splits
                        .filter((s) => s.selected)
                        .slice(0, 3)
                        .map((s) => {
                          const mem = members.find((m) => m.id === s.memberId);
                          return (
                            <img
                              key={s.memberId}
                              src={mem?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                              alt={mem?.name || 'Member'}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Slide-out Drawer Menu */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative w-72 max-w-[80%] bg-white h-full shadow-2xl flex flex-col justify-between p-5 z-10 animate-in slide-in-from-left duration-200">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {roomDetails.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {members.length} Active Members
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation items in drawer */}
              <div className="mt-5 space-y-1">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('home');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50/70"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('all-expenses');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Receipt className="w-4 h-4" />
                  <span>All Expenses</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('members');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Users className="w-4 h-4" />
                  <span>Room Members</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('reports');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics & Reports</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('notifications');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('profile');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    navigate('settings');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Bottom of drawer */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('login');
                }}
                className="w-full flex items-center gap-2 py-2 px-3 text-xs text-rose-600 font-semibold hover:bg-rose-50 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
