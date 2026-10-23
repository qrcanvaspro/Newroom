import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import {
  FileText,
  Calendar,
  Layers,
  Users,
  ChevronDown,
  Check,
  Utensils,
  Zap,
  Wifi,
  Home,
  ShoppingBag,
  Sparkles,
  Droplet,
  Receipt,
} from 'lucide-react';
import { ExpenseCategory } from '../../types';

export const EditExpenseScreen: React.FC = () => {
  const {
    selectedExpenseId,
    expenses,
    updateExpense,
    members,
    roomDetails,
    navigate,
    goBack,
  } = useApp();

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
      splits: [],
      notes: 'Dinner and groceries',
      createdAt: '2025-08-05T10:24:00Z',
    };

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(String(expense.amount));
  const [date, setDate] = useState(expense.date);
  const [category, setCategory] = useState<ExpenseCategory>(expense.category);
  const [splitWith, setSplitWith] = useState('3 Members (Equal)');

  const categories: ExpenseCategory[] = [
    'Food',
    'Electricity',
    'Internet',
    'Rent',
    'Groceries',
    'Maid',
    'Water',
    'Others',
  ];

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter valid title and amount');
      return;
    }

    // Recalculate splits if amount changed
    const activeSplits = expense.splits.map((s) => ({
      ...s,
      amount: s.selected
        ? Math.round((numAmount / expense.splits.filter((x) => x.selected).length) * 100) / 100
        : 0,
    }));

    updateExpense(expense.id, {
      title: title.trim(),
      amount: numAmount,
      date,
      category,
      splits: activeSplits.length > 0 ? activeSplits : expense.splits,
    });

    navigate('expense-details', { expenseId: expense.id });
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header matching Screen 14: White with back arrow & Edit Expense title */}
      <Header title="Edit Expense" variant="white" showBack={true} onBack={goBack} />

      <form onSubmit={handleUpdate} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Expense Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Expense Title</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <FileText className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Expense Title"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Amount</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-base font-bold text-slate-700">
                {roomDetails.currency}
              </span>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition tabular-nums"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Date</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Calendar className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
                <Layers className="w-4 h-4" />
              </span>
              <span className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Split With */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Split With</label>
            <div className="relative">
              <select
                value={splitWith}
                onChange={(e) => setSplitWith(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition"
              >
                <option value="3 Members (Equal)">3 Members (Equal)</option>
                <option value="All Members (Equal)">All Members (Equal)</option>
                <option value="Custom">Custom</option>
              </select>
              <span className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
                <Users className="w-4 h-4" />
              </span>
              <span className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Update Button matching Screen 14 */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <span>Update</span>
          </button>
        </div>
      </form>
    </div>
  );
};
