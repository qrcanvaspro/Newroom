import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import {
  Utensils,
  Zap,
  Wifi,
  Home,
  ShoppingBag,
  Sparkles,
  Droplet,
  Receipt,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  Share2,
} from 'lucide-react';
import { ExpenseCategory } from '../../types';

export const ExpenseDetailsScreen: React.FC = () => {
  const {
    selectedExpenseId,
    expenses,
    members,
    user,
    roomDetails,
    deleteExpense,
    navigate,
    goBack,
  } = useApp();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const expense =
    expenses.find((e) => e.id === selectedExpenseId) ||
    expenses[0] || {
      id: 'exp-1',
      title: 'Food',
      amount: 3200,
      date: '5 Aug 2025',
      category: 'Food' as ExpenseCategory,
      paidBy: 'm1',
      splitType: 'Equal' as const,
      splits: [
        { memberId: 'm1', amount: 1067, selected: true },
        { memberId: 'm2', amount: 1067, selected: true },
        { memberId: 'm3', amount: 1066, selected: true },
      ],
      notes: 'Dinner and groceries',
      createdAt: '2025-08-05T10:24:00Z',
    };

  const payer = members.find((m) => m.id === expense.paidBy);
  const selectedSplits = expense.splits.filter((s) => s.selected);
  const isPayerCurrentUser = expense.paidBy === user.id;

  const getCategoryVisuals = (cat: ExpenseCategory) => {
    switch (cat) {
      case 'Food':
        return { icon: Utensils, bg: 'bg-emerald-500 text-white' };
      case 'Electricity':
        return { icon: Zap, bg: 'bg-amber-500 text-white' };
      case 'Internet':
        return { icon: Wifi, bg: 'bg-indigo-500 text-white' };
      case 'Rent':
        return { icon: Home, bg: 'bg-blue-600 text-white' };
      case 'Groceries':
        return { icon: ShoppingBag, bg: 'bg-teal-500 text-white' };
      case 'Maid':
        return { icon: Sparkles, bg: 'bg-pink-500 text-white' };
      case 'Water':
        return { icon: Droplet, bg: 'bg-cyan-500 text-white' };
      default:
        return { icon: Receipt, bg: 'bg-slate-500 text-white' };
    }
  };

  const visual = getCategoryVisuals(expense.category);
  const CategoryIcon = visual.icon;

  const handleDelete = () => {
    deleteExpense(expense.id);
    navigate('home');
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      <Header
        title="Expense Details"
        showBack={true}
        variant="white"
        onBack={goBack}
        rightAction={
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Expense: ${expense.title}`,
                  text: `${expense.title} - ${roomDetails.currency}${expense.amount} on ${expense.date}`,
                });
              } else {
                alert('Expense link copied to clipboard!');
              }
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition"
          >
            <Share2 className="w-4 h-4" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Top Big Icon & Amount Header matching Screen 7 */}
          <div className="flex flex-col items-center text-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3 ${visual.bg}`}
            >
              <CategoryIcon className="w-8 h-8 stroke-[2]" />
            </div>
            <h2 className="text-base font-bold text-slate-800">{expense.title}</h2>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5 tabular-nums">
              {roomDetails.currency} {expense.amount.toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 mt-1">{expense.date}</p>
          </div>

          {/* Split Summary Card matching Screen 7 */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                {selectedSplits.slice(0, 3).map((s) => {
                  const m = members.find((mem) => mem.id === s.memberId);
                  return (
                    <img
                      key={s.memberId}
                      src={m?.avatar}
                      alt={m?.name || 'Member'}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                    />
                  );
                })}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                Split equally ({selectedSplits.length} people)
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 tabular-nums">
                {roomDetails.currency}{' '}
                {selectedSplits.length > 0
                  ? Math.round(selectedSplits[0].amount).toLocaleString()
                  : 0}{' '}
                each
              </span>
            </div>
          </div>

          {/* Paid By Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Paid by
            </h3>
            <div className="flex items-center justify-between p-3 bg-slate-50/70 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={payer?.avatar || user.avatar}
                  alt={payer?.name || 'Payer'}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <span className="text-xs font-bold text-slate-800">
                  {payer?.name || user.name}
                </span>
              </div>
              {isPayerCurrentUser && (
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                  You paid
                </span>
              )}
            </div>
          </div>

          {/* Notes Section */}
          {expense.notes && (
            <div className="space-y-1.5">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Notes
              </h3>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                {expense.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons matching Screen 7 */}
        <div className="space-y-2.5 pt-6">
          <button
            type="button"
            onClick={() => navigate('edit-expense', { expenseId: expense.id })}
            className="w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold text-xs hover:bg-blue-50 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-3 rounded-xl border border-rose-400 text-rose-600 font-semibold text-xs hover:bg-rose-50 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Delete Expense?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Are you sure you want to delete "{expense.title}"? This will update all member balances.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-2.5 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="py-2.5 text-xs font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
