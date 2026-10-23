import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import {
  Settings,
  Building,
  Users,
  Wallet,
  Calendar,
  Edit2,
  Check,
  Shield,
  Share2,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { user, roomDetails, members, updateRoomDetails, navigate } = useApp();
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [roomNameInput, setRoomNameInput] = useState(roomDetails.name);
  const [budgetInput, setBudgetInput] = useState(String(roomDetails.monthlyBudget));

  const handleSaveRoom = () => {
    updateRoomDetails({
      name: roomNameInput.trim() || 'The Boys Hostel',
      monthlyBudget: parseFloat(budgetInput) || 15000,
    });
    setIsEditingRoom(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 select-none">
      {/* Header matching Screen 10: Royal Blue with Profile title & Settings gear */}
      <Header
        title="Profile"
        variant="blue"
        rightAction={
          <button
            onClick={() => navigate('settings')}
            aria-label="Settings"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition active:scale-95"
          >
            <Settings className="w-5 h-5 stroke-[2]" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {/* User Avatar & Info Card matching Screen 10 */}
        <div className="flex flex-col items-center bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-center">
          <div className="relative mb-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50 shadow-md"
            />
            {user.isAdmin && (
              <span className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full shadow-xs">
                <Shield className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <h2 className="text-base font-bold text-slate-900">{user.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
          <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Synced with Firebase Firestore</span>
          </div>
        </div>

        {/* Room Info Details matching Screen 10 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800">Room Details</span>
            <button
              onClick={() => setIsEditingRoom(!isEditingRoom)}
              className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline"
            >
              {isEditingRoom ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* Row 1: Room Name */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Room Name</span>
            </div>
            {isEditingRoom ? (
              <input
                type="text"
                value={roomNameInput}
                onChange={(e) => setRoomNameInput(e.target.value)}
                className="w-36 px-2 py-1 text-xs font-semibold border rounded-lg text-right"
              />
            ) : (
              <span className="text-xs font-bold text-slate-900">{roomDetails.name}</span>
            )}
          </div>

          {/* Row 2: Total Members */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Total Members</span>
            </div>
            <span className="text-xs font-bold text-slate-900">{members.length}</span>
          </div>

          {/* Row 3: Monthly Budget */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Monthly Budget</span>
            </div>
            {isEditingRoom ? (
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="w-28 px-2 py-1 text-xs font-semibold border rounded-lg text-right"
              />
            ) : (
              <span className="text-xs font-bold text-slate-900 tabular-nums">
                {roomDetails.currency} {roomDetails.monthlyBudget.toLocaleString()}
              </span>
            )}
          </div>

          {/* Row 4: Join Date */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">Join Date</span>
            </div>
            <span className="text-xs font-bold text-slate-900">{roomDetails.joinDate}</span>
          </div>

          {isEditingRoom && (
            <div className="pt-2">
              <button
                onClick={handleSaveRoom}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition"
              >
                Save Room Details
              </button>
            </div>
          )}
        </div>

        {/* Quick invite or share room code */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold">Invite New Roommates</p>
            <p className="text-[11px] text-blue-100 mt-0.5">Share Room code: ROOM-7749</p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard?.writeText('Join our room on Room Partner! Code: ROOM-7749');
              alert('Room invite code copied to clipboard!');
            }}
            className="px-3 py-1.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow-xs hover:bg-blue-50 transition flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
