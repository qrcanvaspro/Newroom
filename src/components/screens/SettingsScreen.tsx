import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import {
  Bell,
  Coins,
  Globe,
  Lock,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  RotateCcw,
  Check,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { roomDetails, updateRoomDetails, resetDemoData, navigate, goBack, logoutUser, user } = useApp();
  const [currencyModal, setCurrencyModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  const currencies = [
    { label: 'INR (₹)', symbol: '₹', code: 'INR' },
    { label: 'USD ($)', symbol: '$', code: 'USD' },
    { label: 'EUR (€)', symbol: '€', code: 'EUR' },
    { label: 'GBP (£)', symbol: '£', code: 'GBP' },
  ];

  const languages = ['English', 'Hindi (हिंदी)', 'Spanish (Español)', 'French (Français)'];

  return (
    <div className="flex flex-col h-full bg-slate-50 select-none">
      {/* Header matching Screen 11: Royal Blue with back arrow & Settings title */}
      <Header title="Settings" variant="blue" showBack={true} onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl divide-y divide-slate-100 shadow-sm border border-slate-100 overflow-hidden">
          {/* Notifications */}
          <div
            onClick={() => navigate('notifications')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Notifications</p>
                <p className="text-[11px] text-slate-400">Expense reminders, alerts</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Currency */}
          <div
            onClick={() => setCurrencyModal(true)}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Currency</p>
                <p className="text-[11px] text-slate-400">{roomDetails.currencyCode} ({roomDetails.currency})</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Language */}
          <div
            onClick={() => setLanguageModal(true)}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Language</p>
                <p className="text-[11px] text-slate-400">{roomDetails.language}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Change Password */}
          <div
            onClick={() => alert('Password update form sent to your email!')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Change Password</p>
                <p className="text-[11px] text-slate-400">Security and credentials</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Help & Support */}
          <div
            onClick={() => alert('Support team available at support@roompartner.app')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Help & Support</p>
                <p className="text-[11px] text-slate-400">FAQs, roommate splitting rules</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* About App */}
          <div
            onClick={() => setAboutModal(true)}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">About App</p>
                <p className="text-[11px] text-slate-400">Version 1.0.0</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Logout */}
          <div
            onClick={async () => {
              await logoutUser();
            }}
            className="flex items-center justify-between p-3.5 hover:bg-rose-50/50 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-rose-600">Logout</p>
                <p className="text-[11px] text-slate-400">Sign out of {user.email || 'this device'}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-400" />
          </div>
        </div>

        {/* Reset Demo Data option for testing */}
        <div className="pt-2 text-center">
          <button
            onClick={() => {
              if (confirm('Reset to initial screenshot demo data?')) {
                resetDemoData();
              }
            }}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1.5 mx-auto font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* Currency Modal */}
      {currencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xs w-full p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Select Currency</h3>
            <div className="space-y-2">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    updateRoomDetails({ currency: c.symbol, currencyCode: c.code });
                    setCurrencyModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition ${
                    roomDetails.currencyCode === c.code
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{c.label}</span>
                  {roomDetails.currencyCode === c.code && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrencyModal(false)}
              className="w-full mt-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {languageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xs w-full p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Select Language</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    updateRoomDetails({ language: lang.split(' ')[0] });
                    setLanguageModal(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition ${
                    roomDetails.language === lang.split(' ')[0]
                      ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{lang}</span>
                  {roomDetails.language === lang.split(' ')[0] && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => setLanguageModal(false)}
              className="w-full mt-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {aboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xs w-full p-5 shadow-2xl text-center">
            <h3 className="text-base font-bold text-blue-600">Room Partner</h3>
            <p className="text-xs font-semibold text-slate-500">Monthly Expenses</p>
            <p className="text-xs text-slate-600 my-4 leading-relaxed">
              "Same Room | Same Goals | Shared Expenses"<br />
              Version 1.0.0
            </p>
            <button
              onClick={() => setAboutModal(false)}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
