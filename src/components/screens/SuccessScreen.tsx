import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SuccessScreen: React.FC = () => {
  const { selectedExpenseId, expenses, roomDetails, navigate } = useApp();

  const expense =
    expenses.find((e) => e.id === selectedExpenseId) ||
    expenses[0] || {
      title: 'Food',
      amount: 3200,
      splits: [{ selected: true }, { selected: true }, { selected: true }],
    };

  const splitMemberCount = expense.splits?.filter((s) => s.selected).length || 3;

  useEffect(() => {
    // Fire festive confetti matching Screen 15 celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.45 },
        colors: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'],
      });
    } catch {
      // Fallback safe
    }
  }, []);

  return (
    <div className="flex flex-col justify-between h-full bg-white px-6 py-12 select-none text-center">
      <div className="my-auto flex flex-col items-center">
        {/* Checkmark with Festive Sunburst Rays matching Screen 15 */}
        <div className="relative flex items-center justify-center w-36 h-36 mb-6">
          {/* Confetti / Radiating burst rays */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Top Ray */}
            <div className="absolute -top-3 w-1.5 h-4 bg-amber-400 rounded-full" />
            {/* Top Right Ray */}
            <div className="absolute top-2 right-4 w-1.5 h-4 bg-blue-500 rounded-full rotate-45" />
            {/* Right Ray */}
            <div className="absolute right-0 w-4 h-1.5 bg-emerald-400 rounded-full" />
            {/* Bottom Right Ray */}
            <div className="absolute bottom-2 right-4 w-1.5 h-4 bg-pink-500 rounded-full -rotate-45" />
            {/* Bottom Ray */}
            <div className="absolute -bottom-3 w-1.5 h-4 bg-teal-400 rounded-full" />
            {/* Bottom Left Ray */}
            <div className="absolute bottom-2 left-4 w-1.5 h-4 bg-indigo-500 rounded-full rotate-45" />
            {/* Left Ray */}
            <div className="absolute left-0 w-4 h-1.5 bg-amber-400 rounded-full" />
            {/* Top Left Ray */}
            <div className="absolute top-2 left-4 w-1.5 h-4 bg-emerald-500 rounded-full -rotate-45" />
          </div>

          {/* Green Check Circle */}
          <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 transform hover:scale-105 transition-transform duration-300">
            <Check className="w-12 h-12 stroke-[3]" />
          </div>
        </div>

        {/* Headings matching Screen 15 */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Expense Added!
        </h1>
        <p className="text-base font-bold text-slate-700 mt-2">
          {expense.title} - {roomDetails.currency} {expense.amount.toLocaleString()}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Split with {splitMemberCount} members
        </p>
      </div>

      {/* Action Buttons matching Screen 15 */}
      <div className="space-y-3 pb-4 w-full max-w-xs mx-auto">
        <button
          onClick={() => navigate('expense-details', { expenseId: expense.id })}
          className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('home')}
          className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
