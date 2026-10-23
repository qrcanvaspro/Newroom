import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { Plus, ChevronRight, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownLeft, X, Mail, Phone } from 'lucide-react';
import { Member } from '../../types';

export const MembersScreen: React.FC = () => {
  const { members, roomDetails, memberBalances, navigate, goBack } = useApp();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header matching Screen 8: Back arrow, "Room Members", "+" icon */}
      <Header
        title="Room Members"
        showBack={true}
        variant="white"
        onBack={goBack}
        rightAction={
          <button
            onClick={() => navigate('add-member')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-blue-600 active:scale-95 transition"
            aria-label="Add Member"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        }
      />

      {/* Main Members List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Quick Room Summary Pill */}
        <div className="flex items-center justify-between p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100">
          <div>
            <p className="text-xs font-bold text-blue-900">{roomDetails.name}</p>
            <p className="text-[11px] text-blue-600 mt-0.5">{members.length} Active Roommates</p>
          </div>
          <button
            onClick={() => navigate('add-member')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-600 text-white shadow-xs hover:bg-blue-700 active:scale-95 transition flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Member Rows matching Screen 8 */}
        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
          {members.map((member) => {
            const balanceInfo = memberBalances.find((b) => b.member.id === member.id);
            const net = balanceInfo?.netBalance || 0;

            return (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="flex items-center justify-between p-3.5 hover:bg-slate-50 cursor-pointer transition"
              >
                {/* Left: Avatar & Info */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    {member.isAdmin && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                        ★
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900">{member.name}</h3>
                      {member.isAdmin && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                          Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{member.email}</p>
                  </div>
                </div>

                {/* Right: Badge or Chevron */}
                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <p
                      className={`text-xs font-bold tabular-nums ${
                        net > 0 ? 'text-emerald-600' : net < 0 ? 'text-rose-600' : 'text-slate-400'
                      }`}
                    >
                      {net > 0
                        ? `+${roomDetails.currency}${Math.round(net).toLocaleString()}`
                        : net < 0
                        ? `-${roomDetails.currency}${Math.round(Math.abs(net)).toLocaleString()}`
                        : 'Settled'}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Member Balance Breakdown Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedMember.name}</h3>
                  <p className="text-[11px] text-slate-400">{selectedMember.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Balances details */}
            {(() => {
              const b = memberBalances.find((item) => item.member.id === selectedMember.id);
              const net = b?.netBalance || 0;
              return (
                <div className="py-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-medium">Total Paid</p>
                      <p className="text-sm font-bold text-slate-900 mt-1 tabular-nums">
                        {roomDetails.currency} {Math.round(b?.totalPaid || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[11px] text-slate-500 font-medium">Their Share</p>
                      <p className="text-sm font-bold text-slate-900 mt-1 tabular-nums">
                        {roomDetails.currency} {Math.round(b?.totalShare || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-center border ${
                      net > 0
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                        : net < 0
                        ? 'bg-rose-50 border-rose-100 text-rose-800'
                        : 'bg-slate-50 border-slate-100 text-slate-800'
                    }`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider">
                      {net > 0 ? 'Gets Back' : net < 0 ? 'Owes to Room' : 'All Settled'}
                    </p>
                    <p className="text-xl font-extrabold mt-0.5 tabular-nums">
                      {roomDetails.currency} {Math.round(Math.abs(net)).toLocaleString()}
                    </p>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => {
                        alert(`Settlement reminder sent to ${selectedMember.name}!`);
                        setSelectedMember(null);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition"
                    >
                      Send Reminder
                    </button>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
