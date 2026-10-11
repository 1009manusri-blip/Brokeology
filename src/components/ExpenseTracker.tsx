import React, { useState, useMemo, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { ExpenseCategory } from '../types/game';
import { AnimatedRupee } from './AnimatedRupee';
import { validateExpenseInput } from '../utils/finance';
import { motion, AnimatePresence } from 'motion/react';
import {
  Coffee,
  ShoppingBag,
  Bus,
  Film,
  Plus,
  Trash2,
  X,
  AlertCircle,
} from 'lucide-react';

export const ExpenseTracker: React.FC = () => {
  const {
    transactions,
    addExpense,
    deleteExpense,
    initialBudget,
    currentDay,
  } = useGame();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    amount: string;
    category: ExpenseCategory;
    note: string;
  }>({
    name: '',
    amount: '',
    category: 'Food',
    note: '',
  });

  const categories = useMemo(() => ['All', 'Food', 'Travel', 'Lifestyle', 'Essentials'], []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showAddModal) {
        setShowAddModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAddModal]);

  const filteredTransactions = useMemo(() => {
    return selectedCategory === 'All'
      ? transactions
      : transactions.filter((t) => t.category === selectedCategory);
  }, [transactions, selectedCategory]);

  const { totalSpentAll, percentageSpent } = useMemo(() => {
    const total = transactions.reduce((acc, t) => acc + t.amount, 0);
    const pct = Math.min(100, Math.round((total / initialBudget) * 100));
    return { totalSpentAll: total, percentageSpent: pct };
  }, [transactions, initialBudget]);

  const getCategoryIcon = (category: ExpenseCategory, name: string) => {
    if (name.toLowerCase().includes('coffee') || category === 'Food') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Coffee className="w-5 h-5" />
        </div>
      );
    }
    if (name.toLowerCase().includes('bus') || category === 'Travel') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Bus className="w-5 h-5" />
        </div>
      );
    }
    if (name.toLowerCase().includes('movie') || category === 'Lifestyle') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400">
          <Film className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
        <ShoppingBag className="w-5 h-5" />
      </div>
    );
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(formData.amount);
    const validation = validateExpenseInput(formData.name, parsedAmount, formData.category);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please provide valid expense details.');
      return;
    }

    addExpense({
      name: formData.name.trim(),
      amount: parsedAmount,
      category: formData.category,
      note: formData.note.trim() || undefined,
    });

    setFormData({
      name: '',
      amount: '',
      category: 'Food',
      note: '',
    });
    setErrorMessage(null);
    setShowAddModal(false);
  };

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentageSpent / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title & Category Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Expense Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Keep every rupee accountable. Real transactions from your journey.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          role="toolbar"
          aria-label="Filter expenses by category"
          className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-label={`Filter by ${cat}`}
              aria-pressed={selectedCategory === cat}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400 hover:-translate-y-0.5 active:translate-y-0 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 border border-pink-300/30'
                  : 'glass-pill text-slate-300 hover:text-white hover:bg-white/10 border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Transactions on Left, Donut on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Transaction Rows */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {filteredTransactions.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center text-slate-400 text-sm">
              No transactions recorded in this category yet.
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="glass-panel p-4 rounded-3xl flex items-center justify-between gap-4 border border-white/5 hover:border-pink-500/30 transition-all duration-200 group text-left hover:-translate-y-0.5 shadow-md"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {getCategoryIcon(tx.category, tx.name)}
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm text-white group-hover:text-pink-300 transition-colors duration-150 truncate">
                      {tx.name}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{tx.category}</span>
                      <span>·</span>
                      <span className="text-cyan-300 font-semibold">Day {tx.day}</span>
                      {tx.note && (
                        <>
                          <span>·</span>
                          <span className="truncate max-w-[160px] text-slate-500">
                            {tx.note}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="font-mono font-bold text-sm sm:text-base text-rose-400">
                      - ₹{tx.amount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Day {tx.day}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteExpense(tx.id)}
                    aria-label={`Delete expense ${tx.name} for ₹${tx.amount.toLocaleString()}`}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-rose-500/10 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
                    title={`Delete ${tx.name}`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Total Spent & Donut Chart Card */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl text-center flex flex-col items-center">
          <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider mb-1">
            Total Spent
          </div>
          <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mb-6">
            <AnimatedRupee amount={totalSpentAll} />
          </div>

          {/* SVG Donut Progress Chart with Smooth Stroke Transition */}
          <div
            role="progressbar"
            aria-valuenow={percentageSpent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Budget consumed: ${percentageSpent}% of ₹10,000`}
            className="relative w-40 h-40 flex items-center justify-center my-2"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140" aria-hidden="true">
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="#1e293b"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="70"
                cy="70"
                r={radius}
                stroke="url(#donutGradient)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
              <span className="font-display font-black text-2xl text-white">
                {percentageSpent}%
              </span>
              <span className="text-[10px] text-slate-300 font-mono">
                of ₹10,000
              </span>
            </div>
          </div>

          <div className="w-full mt-4 pt-4 border-t border-white/5 text-xs text-slate-400 flex justify-between">
            <span>Remaining Buffer:</span>
            <span className="font-bold text-cyan-300">
              <AnimatedRupee amount={initialBudget - totalSpentAll} />
            </span>
          </div>

          {/* Add Expense Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full mt-6 btn-glow-pink py-3.5 px-4 rounded-xl text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Add Custom Expense Modal with AnimatePresence */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowAddModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-expense-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-glow w-full max-w-md p-6 sm:p-8 rounded-3xl border border-pink-500/40 text-left shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowAddModal(false)}
                aria-label="Close add expense dialog"
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <h3 id="add-expense-modal-title" className="font-display font-extrabold text-lg text-white mb-1">
                Add New Expense
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Manually log a transaction for Day {currentDay}.
              </p>

              {errorMessage && (
                <div role="alert" className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label htmlFor="expense-name" className="block text-xs font-semibold text-slate-200 mb-1">
                    Expense Description
                  </label>
                  <input
                    id="expense-name"
                    type="text"
                    required
                    placeholder="e.g. Campus Lunch, Stationery"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="expense-amount" className="block text-xs font-semibold text-slate-200 mb-1">
                      Amount (₹)
                    </label>
                    <input
                      id="expense-amount"
                      type="number"
                      step="1"
                      min="1"
                      required
                      placeholder="e.g. 150"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs font-mono focus:border-pink-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="expense-category" className="block text-xs font-semibold text-slate-200 mb-1">
                      Category
                    </label>
                    <select
                      id="expense-category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as ExpenseCategory })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-none transition-colors"
                    >
                      <option value="Food">Food</option>
                      <option value="Travel">Travel</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Essentials">Essentials</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="expense-note" className="block text-xs font-semibold text-slate-200 mb-1">
                    Optional Note
                  </label>
                  <input
                    id="expense-note"
                    type="text"
                    placeholder="e.g. Shared split with roommates"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs focus:border-pink-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all duration-150 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-pink-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-glow-pink py-3 px-4 rounded-xl text-white font-display font-bold text-xs uppercase cursor-pointer shadow-lg focus-visible:outline-2 focus-visible:outline-pink-400"
                  >
                    Save Expense
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
