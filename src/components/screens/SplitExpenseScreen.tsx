import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Check, Utensils, Zap, Wifi, Home, ShoppingBag, Sparkles, Droplet, Receipt } from 'lucide-react';
import { SplitType, ExpenseCategory } from '../../types';

export const SplitExpenseScreen: React.FC = () => {
  const {
    draftExpense,
    members,
    roomDetails,
    addExpense,
    navigate,
    goBack,
    setSelectedExpenseId,
  } = useApp();

  const totalAmount = Number(draftExpense.amount) || 3200;
  const [splitType, setSplitType] = useState<SplitType>(draftExpense.splitType || 'Equal');

  // Member selection and individual amounts
  const [memberSplits, setMemberSplits] = useState(() => {
    // Check if initial splits were pre-calculated
    const initialSelected = members.map((m, idx) => ({
      memberId: m.id,
      selected: idx < 3, // In screenshot, 3 members are selected (Rohit, Amit, Sahil)
      amount: 0,
      percentage: 0,
    }));
    return initialSelected;
  });

  // Calculate shares based on split type
  useEffect(() => {
    const selectedCount = memberSplits.filter((s) => s.selected).length;

    if (splitType === 'Equal') {
      const share = selectedCount > 0 ? Math.round((totalAmount / selectedCount) * 100) / 100 : 0;
      setMemberSplits((prev) =>
        prev.map((s) => ({
          ...s,
          amount: s.selected ? share : 0,
          percentage: s.selected && selectedCount > 0 ? Math.round(100 / selectedCount) : 0,
        }))
      );
    } else if (splitType === 'Percentage') {
      const defaultPct = selectedCount > 0 ? Math.floor(100 / selectedCount) : 0;
      setMemberSplits((prev) =>
        prev.map((s) => ({
          ...s,
          percentage: s.selected ? defaultPct : 0,
          amount: s.selected ? Math.round((totalAmount * defaultPct) / 100) : 0,
        }))
      );
    }
  }, [splitType, totalAmount]);

  const toggleMember = (memberId: string) => {
    const nextSplits = memberSplits.map((s) =>
      s.memberId === memberId ? { ...s, selected: !s.selected } : s
    );
    const selectedCount = nextSplits.filter((s) => s.selected).length;
    const share = selectedCount > 0 ? Math.round((totalAmount / selectedCount) * 100) / 100 : 0;

    setMemberSplits(
      nextSplits.map((s) => ({
        ...s,
        amount: s.selected ? share : 0,
      }))
    );
  };

  const handleCustomAmountChange = (memberId: string, value: string) => {
    const val = parseFloat(value) || 0;
    setMemberSplits((prev) =>
      prev.map((s) => (s.memberId === memberId ? { ...s, amount: val } : s))
    );
  };

  const handlePercentageChange = (memberId: string, value: string) => {
    const pct = parseFloat(value) || 0;
    setMemberSplits((prev) =>
      prev.map((s) =>
        s.memberId === memberId
          ? { ...s, percentage: pct, amount: Math.round((totalAmount * pct) / 100) }
          : s
      )
    );
  };

  const handleSave = () => {
    const selectedMembers = memberSplits.filter((s) => s.selected);
    if (selectedMembers.length === 0) {
      alert('Please select at least one member to split with');
      return;
    }

    const newExpId = addExpense({
      title: draftExpense.title || 'Food',
      amount: totalAmount,
      date: draftExpense.date || '5 Aug 2025',
      category: draftExpense.category || 'Food',
      paidBy: draftExpense.paidBy || 'm1',
      splitType,
      splits: memberSplits.map((s) => ({
        memberId: s.memberId,
        amount: s.amount,
        percentage: s.percentage,
        selected: s.selected,
      })),
      notes: draftExpense.notes || 'Dinner and groceries',
    });

    setSelectedExpenseId(newExpId);
    navigate('success');
  };

  const getCategoryIcon = (cat: ExpenseCategory) => {
    switch (cat) {
      case 'Electricity':
        return Zap;
      case 'Internet':
        return Wifi;
      case 'Rent':
        return Home;
      case 'Groceries':
        return ShoppingBag;
      case 'Maid':
        return Sparkles;
      case 'Water':
        return Droplet;
      default:
        return Utensils;
    }
  };

  const CategoryIcon = getCategoryIcon(draftExpense.category || 'Food');

  return (
    <div className="flex flex-col h-full bg-white select-none">
      <Header title="Split Expense" showBack={true} variant="white" onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Summary Card matching Screen 6 */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CategoryIcon className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 leading-tight">
                {draftExpense.title || 'Food'}
              </h2>
              <p className="text-base font-bold text-slate-900 mt-0.5 tabular-nums">
                {roomDetails.currency} {totalAmount.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">{draftExpense.date || '5 Aug 2025'}</p>
            </div>
          </div>

          {/* Split Type Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Split Type</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['Equal', 'Custom', 'Percentage'] as SplitType[]).map((type) => {
                const isActive = splitType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSplitType(type)}
                    className={`py-2 text-xs font-semibold rounded-lg transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Members Section */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-semibold text-slate-700">Select Members</label>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-xs">
              {members.map((member) => {
                const splitState = memberSplits.find((s) => s.memberId === member.id);
                const isSelected = !!splitState?.selected;

                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 hover:bg-slate-50/70 transition"
                  >
                    {/* Left: Checkbox & Member Avatar & Name */}
                    <div
                      className="flex items-center gap-3 cursor-pointer flex-1"
                      onClick={() => toggleMember(member.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'border-2 border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />

                      <span className="text-xs font-semibold text-slate-800">
                        {member.name}
                      </span>
                    </div>

                    {/* Right: Calculated or Custom Amount */}
                    <div className="text-right">
                      {splitType === 'Equal' && (
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          {isSelected
                            ? `${roomDetails.currency} ${(splitState?.amount || 0).toLocaleString()}`
                            : `${roomDetails.currency} 0`}
                        </span>
                      )}

                      {splitType === 'Custom' && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-400">{roomDetails.currency}</span>
                          <input
                            type="number"
                            disabled={!isSelected}
                            value={splitState?.amount || ''}
                            onChange={(e) => handleCustomAmountChange(member.id, e.target.value)}
                            className="w-20 px-2 py-1 text-right text-xs font-semibold border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
                          />
                        </div>
                      )}

                      {splitType === 'Percentage' && (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            disabled={!isSelected}
                            value={splitState?.percentage || ''}
                            onChange={(e) => handlePercentageChange(member.id, e.target.value)}
                            className="w-14 px-2 py-1 text-right text-xs font-semibold border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
                          />
                          <span className="text-xs text-slate-500 font-medium">%</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Save Button matching Screen 6 */}
        <div className="pt-6">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-[0.98] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
