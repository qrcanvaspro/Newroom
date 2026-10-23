import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { User, Mail, UserPlus, Phone } from 'lucide-react';

export const AddMemberScreen: React.FC = () => {
  const { addMember, navigate, goBack } = useApp();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter member name');
      return;
    }
    if (!contact.trim()) {
      alert('Please enter email or mobile number');
      return;
    }

    addMember(name.trim(), contact.trim());
    navigate('members');
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header matching Screen 13: White with back arrow & Add Member title */}
      <Header title="Add Member" variant="white" showBack={true} onBack={goBack} />

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Member Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Name</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter member name"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          {/* Email / Mobile Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Email / Mobile Number</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter email or mobile number"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-800 leading-relaxed">
            <p className="font-semibold mb-0.5">Room Invitation</p>
            An invite notification and settlement link will automatically be prepared for this roommate.
          </div>
        </div>

        {/* Add Member Button matching Screen 13 */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </form>
    </div>
  );
};
