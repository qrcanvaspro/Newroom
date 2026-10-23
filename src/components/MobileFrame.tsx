import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';
import {
  Smartphone,
  Maximize2,
  RotateCcw,
  Wifi,
  Battery,
  Signal,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AddExpenseScreen } from './screens/AddExpenseScreen';
import { SplitExpenseScreen } from './screens/SplitExpenseScreen';
import { ExpenseDetailsScreen } from './screens/ExpenseDetailsScreen';
import { MembersScreen } from './screens/MembersScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { AddMemberScreen } from './screens/AddMemberScreen';
import { EditExpenseScreen } from './screens/EditExpenseScreen';
import { SuccessScreen } from './screens/SuccessScreen';
import { AllExpensesScreen } from './screens/AllExpensesScreen';
import { HouseLogo } from './common/HouseLogo';

export const MobileFrame: React.FC = () => {
  const { currentScreen, navigate, resetDemoData } = useApp();
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  const screenOptions: { id: ScreenType; label: string }[] = [
    { id: 'splash', label: '1. Splash Screen' },
    { id: 'login', label: '2. Login Page' },
    { id: 'signup', label: '3. Sign Up Page' },
    { id: 'home', label: '4. Home / Dashboard' },
    { id: 'add-expense', label: '5. Add Expense' },
    { id: 'split-expense', label: '6. Split Expense' },
    { id: 'expense-details', label: '7. Expense Details' },
    { id: 'members', label: '8. Group Members' },
    { id: 'reports', label: '9. Reports Page' },
    { id: 'profile', label: '10. Profile Page' },
    { id: 'settings', label: '11. Settings Page' },
    { id: 'notifications', label: '12. Notifications Page' },
    { id: 'add-member', label: '13. Add Member Page' },
    { id: 'edit-expense', label: '14. Edit Expense Page' },
    { id: 'success', label: '15. Success Page' },
    { id: 'all-expenses', label: 'All Expenses (Search/Filter)' },
  ];

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'signup':
        return <SignUpScreen />;
      case 'home':
        return <HomeScreen />;
      case 'add-expense':
        return <AddExpenseScreen />;
      case 'split-expense':
        return <SplitExpenseScreen />;
      case 'expense-details':
        return <ExpenseDetailsScreen />;
      case 'members':
        return <MembersScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'add-member':
        return <AddMemberScreen />;
      case 'edit-expense':
        return <EditExpenseScreen />;
      case 'success':
        return <SuccessScreen />;
      case 'all-expenses':
        return <AllExpensesScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Determine top status bar text color based on screen header color
  const isDarkStatusBar =
    currentScreen === 'splash' ||
    currentScreen === 'home' ||
    currentScreen === 'reports' ||
    currentScreen === 'profile' ||
    currentScreen === 'settings' ||
    currentScreen === 'notifications';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Application Control Toolbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <HouseLogo size={28} variant="white" />
          <div>
            <h1 className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>Room Partner</span>
              <span className="text-[10px] font-medium text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                Monthly Expenses
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Same Room | Same Goals | Shared Expenses
            </p>
          </div>
        </div>

        {/* Quick Screen Jump Selector (All 15 Screens) */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={currentScreen}
              onChange={(e) => navigate(e.target.value as ScreenType)}
              className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              {screenOptions.map((opt) => (
                <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Toggle Device Frame vs Full View */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-1.5 ${
              isPhoneFrame
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title={isPhoneFrame ? 'Switch to Full Screen View' : 'Switch to Phone Frame View'}
          >
            {isPhoneFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isPhoneFrame ? 'Phone View' : 'Full View'}</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={resetDemoData}
            title="Reset to Screenshot Demo Data"
            className="p-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Workspace Canvas */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        {isPhoneFrame ? (
          /* Phone Mockup Frame matching the uploaded image */
          <div className="relative w-full max-w-[390px] h-[844px] max-h-[92vh] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800/80 ring-offset-4 ring-offset-slate-900 flex flex-col">
            {/* Outer volume & power buttons indicators */}
            <div className="absolute -left-1 top-24 w-1 h-8 bg-slate-700 rounded-l-md" />
            <div className="absolute -left-1 top-36 w-1 h-12 bg-slate-700 rounded-l-md" />
            <div className="absolute -right-1 top-28 w-1 h-14 bg-slate-700 rounded-r-md" />

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col shadow-inner">
              {/* Phone Status Bar (9:41, Dynamic Island, Battery/Signal) */}
              <div
                className={`h-11 px-6 flex items-center justify-between text-xs font-semibold shrink-0 select-none z-30 transition-colors ${
                  isDarkStatusBar ? 'bg-blue-600 text-white' : 'bg-white text-slate-900'
                }`}
              >
                <span>9:41</span>

                {/* Dynamic Island pill */}
                <div className="w-24 h-5 bg-black rounded-full mx-auto" />

                <div className="flex items-center gap-1.5 text-xs">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* Active Screen View */}
              <div className="flex-1 overflow-hidden relative">
                {renderActiveScreen()}
              </div>

              {/* Bottom Home Indicator */}
              <div className="h-5 bg-white shrink-0 flex items-center justify-center select-none z-30">
                <div className="w-32 h-1 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Responsive Desktop/Tablet Layout */
          <div className="w-full max-w-4xl h-[86vh] bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
            <div className="flex-1 overflow-hidden relative">
              {renderActiveScreen()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
