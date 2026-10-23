import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import {
  FileText,
  Calendar,
  Layers,
  Users,
  ChevronDown,
  ArrowRight,
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

export const AddExpenseScreen: React.FC = () => {
  const { navigate, goBack, draftExpense, updateDraftExpense, members, roomDetails } = useApp();

  const [title, setTitle] = useState(draftExpense.title || '');
  const [amount, setAmount] = useState<string>(
    draftExpense.amount ? String(draftExpense.amount) : ''
  );
  const [date, setDate] = useState(
    draftExpense.date ||
      new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  );
  const [category, setCategory] = useState<ExpenseCategory>(draftExpense.category || 'Food');
  const [splitWith, setSplitWith] = useState('All Members');
  const [notes, setNotes] = useState(draftExpense.notes || '');

  const categories: { label: ExpenseCategory; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Food', icon: Utensils },
    { label: 'Electricity', icon: Zap },
    { label: 'Internet', icon: Wifi },
    { label: 'Rent', icon: Home },
    { label: 'Groceries', icon: ShoppingBag },
    { label: 'Maid', icon: Sparkles },
    { label: 'Water', icon: Droplet },
    { label: 'Others', icon: Receipt },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim()) {
      alert('Please enter an expense title');
      return;
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Calculate equal split shares by default for all selected members
    const activeMembers = members;
    const sharePerPerson = Math.round((numAmount / activeMembers.length) * 100) / 100;
    const splits = activeMembers.map((m) => ({
      memberId: m.id,
      amount: sharePerPerson,
      selected: true,
    }));

    updateDraftExpense({
      title: title.trim(),
      amount: numAmount,
      date,
      category,
      splitType: 'Equal',
      splits,
      notes,
    });

    // Go to Screen 6: Split Expense
    navigate('split-expense');
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Header matching Screen 5: White with back arrow and Add Expense title */}
      <Header title="Add Expense" showBack={true} variant="white" onBack={goBack} />

      {/* Form Content */}
      <form onSubmit={handleNext} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col justify-between">
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
                placeholder="e.g. Food, Electricity, Rent"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition tabular-nums"
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
                placeholder="Select date"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Category Dropdown / Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition"
              >
                {categories.map((c) => (
                  <option key={c.label} value={c.label}>
                    {c.label}
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
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition"
              >
                <option value="All Members">All Members ({members.length})</option>
                <option value="Custom">Custom Selection</option>
              </select>
              <span className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
                <Users className="w-4 h-4" />
              </span>
              <span className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Notes (Optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Dinner and groceries"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
