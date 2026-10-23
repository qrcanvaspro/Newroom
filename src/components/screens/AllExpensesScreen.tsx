import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import {
  Search,
  Plus,
  Utensils,
  Zap,
  Wifi,
  Home,
  ShoppingBag,
  Sparkles,
  Droplet,
  Receipt,
  Filter,
} from 'lucide-react';
import { ExpenseCategory } from '../../types';

export const AllExpensesScreen: React.FC = () => {
  const { expenses, members, roomDetails, user, navigate, goBack } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Food', 'Electricity', 'Internet', 'Rent', 'Groceries', 'Maid', 'Others'];

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

  const filtered = expenses.filter((exp) => {
    const matchesSearch =
      exp.title.toLowerCase().includes(search.toLowerCase()) ||
      (exp.notes && exp.notes.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCat === 'All' || exp.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 select-none">
      <Header
        title="All Expenses"
        showBack={true}
        variant="white"
        onBack={goBack}
        rightAction={
          <button
            onClick={() => navigate('add-expense')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-blue-600 active:scale-95 transition"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search expenses, groceries, rent..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>

        {/* Category Pills Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-slate-100 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Receipt className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-medium">No expenses found</p>
            </div>
          ) : (
            filtered.map((exp) => {
              const visual = getCategoryVisuals(exp.category);
              const VisualIcon = visual.icon;
              const payer = members.find((m) => m.id === exp.paidBy);

              return (
                <div
                  key={exp.id}
                  onClick={() => navigate('expense-details', { expenseId: exp.id })}
                  className="flex items-center justify-between py-3 hover:bg-slate-50/70 rounded-xl px-1 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${visual.bg}`}
                    >
                      <VisualIcon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 leading-tight">
                        {exp.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">{exp.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 tabular-nums">
                      {roomDetails.currency} {exp.amount.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {exp.paidBy === user.id ? 'You paid' : `Paid by ${payer?.name || 'Roommate'}`}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
