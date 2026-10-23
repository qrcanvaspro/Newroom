import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { Plus, TrendingUp, Calendar, Download, Filter } from 'lucide-react';

export const ReportsScreen: React.FC = () => {
  const {
    totalMonthlyExpenses,
    lastMonthExpenses,
    categoryBreakdown,
    monthlyExpenseTrend,
    roomDetails,
    memberBalances,
    navigate,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Monthly' | 'Category' | 'Member'>('Monthly');

  // Exact Donut Chart values matching Screen 9
  // Rent: 40%, Food: 24%, Electricity: 12%, Internet: 8%, Others: 16%
  const chartSlices = [
    { label: 'Rent', percent: 40, color: '#2563EB' },
    { label: 'Food', percent: 24, color: '#10B981' },
    { label: 'Electricity', percent: 12, color: '#F59E0B' },
    { label: 'Internet', percent: 8, color: '#8B5CF6' },
    { label: 'Others', percent: 16, color: '#06B6D4' },
  ];

  // SVG Donut calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  let accumulatedOffset = 0;

  return (
    <div className="flex flex-col h-full bg-slate-50 select-none">
      {/* Header matching Screen 9: Royal Blue with Reports and + icon */}
      <Header
        title="Reports"
        variant="blue"
        rightAction={
          <button
            onClick={() => navigate('add-expense')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition active:scale-95"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Segmented Filter Tabs matching Screen 9 */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          {(['Monthly', 'Category', 'Member'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 text-xs font-semibold rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Total Expenses Card matching Screen 9 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Expenses</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold tracking-tight text-slate-900 tabular-nums">
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

        {/* Main Content based on activeTab */}
        {activeTab === 'Monthly' && (
          <>
            {/* Donut Chart Card matching Screen 9 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Donut Chart SVG */}
                <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {chartSlices.map((slice) => {
                      const strokeDasharray = `${(slice.percent / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -accumulatedOffset;
                      accumulatedOffset += (slice.percent / 100) * circumference;

                      return (
                        <circle
                          key={slice.label}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="transparent"
                          stroke={slice.color}
                          strokeWidth="15"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500"
                        />
                      );
                    })}
                  </svg>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] text-slate-400 font-medium">Total</span>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      {roomDetails.currency} {totalMonthlyExpenses.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Donut Legend matching Screen 9 */}
                <div className="w-full sm:w-auto flex-1 space-y-1.5 pt-2 sm:pt-0">
                  {chartSlices.map((slice) => (
                    <div
                      key={slice.label}
                      className="flex items-center justify-between text-xs py-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: slice.color }}
                        />
                        <span className="text-slate-600 font-medium">{slice.label}</span>
                      </div>
                      <span className="font-bold text-slate-800 tabular-nums">
                        {slice.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Monthly Trend Bar Chart matching Screen 9 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 mb-4">Monthly Trend</h3>

              <div className="flex items-end gap-3 h-36 pt-4 pb-2 px-1">
                {/* Y-axis labels */}
                <div className="flex flex-col justify-between h-full text-[10px] text-slate-400 font-medium pb-5">
                  <span>15K</span>
                  <span>10K</span>
                  <span>5K</span>
                  <span>0</span>
                </div>

                {/* Bars */}
                <div className="flex-1 grid grid-cols-5 gap-2 h-full items-end pb-5 border-b border-slate-100">
                  {monthlyExpenseTrend.map((item, idx) => {
                    const maxHeight = 15000;
                    const heightPercent = Math.min(100, Math.round((item.amount / maxHeight) * 100));
                    const isCurrent = item.month === 'Aug';

                    return (
                      <div key={item.month} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div
                          className={`w-full max-w-[28px] rounded-t-lg transition-all duration-300 relative ${
                            isCurrent ? 'bg-blue-600' : 'bg-blue-300 group-hover:bg-blue-400'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-1.5 py-0.5 rounded pointer-events-none transition-opacity whitespace-nowrap z-10">
                            {roomDetails.currency} {item.amount.toLocaleString()}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-semibold ${
                            isCurrent ? 'text-blue-600' : 'text-slate-400'
                          }`}
                        >
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Category Tab */}
        {activeTab === 'Category' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 mb-2">Category Spending Breakdown</h3>
            <div className="space-y-3">
              {categoryBreakdown.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{cat.category}</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      {roomDetails.currency} {cat.amount.toLocaleString()} ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Member Tab */}
        {activeTab === 'Member' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 mb-2">Member Contributions & Balances</h3>
            <div className="divide-y divide-slate-100">
              {memberBalances.map((b) => (
                <div key={b.member.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={b.member.avatar}
                      alt={b.member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{b.member.name}</p>
                      <p className="text-[10px] text-slate-400">
                        Paid {roomDetails.currency}{Math.round(b.totalPaid).toLocaleString()} · Share {roomDetails.currency}{Math.round(b.totalShare).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        b.netBalance > 0
                          ? 'text-emerald-600'
                          : b.netBalance < 0
                          ? 'text-rose-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {b.netBalance > 0
                        ? `+${roomDetails.currency}${Math.round(b.netBalance).toLocaleString()}`
                        : b.netBalance < 0
                        ? `-${roomDetails.currency}${Math.round(Math.abs(b.netBalance)).toLocaleString()}`
                        : 'Settled'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
