import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ExpenseCategory } from '../types/game';
import { AnimatedRupee } from './AnimatedRupee';
import { Lightbulb } from 'lucide-react';

export const FinancialInsights: React.FC = () => {
  const { transactions } = useGame();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Spending' | 'Trends' | 'Tips'>('Overview');

  const totalSpent = transactions.reduce((acc, t) => acc + t.amount, 0);

  const categoriesList: ExpenseCategory[] = ['Food', 'Travel', 'Lifestyle', 'Essentials', 'Other'];
  const categoryColors: Record<ExpenseCategory, string> = {
    Food: '#38bdf8',
    Travel: '#818cf8',
    Lifestyle: '#f43f5e',
    Essentials: '#fb923c',
    Other: '#94a3b8',
  };

  const spendByCategory: Record<ExpenseCategory, number> = {
    Food: 0,
    Travel: 0,
    Lifestyle: 0,
    Essentials: 0,
    Other: 0,
  };

  transactions.forEach((tx) => {
    spendByCategory[tx.category] = (spendByCategory[tx.category] || 0) + tx.amount;
  });

  const categoryBreakdown = categoriesList.map((cat) => {
    const amount = spendByCategory[cat] || 0;
    const percentage = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
    return {
      category: cat,
      amount,
      percentage,
      color: categoryColors[cat],
    };
  });

  const days = [1, 2, 3, 4, 5, 6, 7];
  const spendByDay: Record<number, number> = {};
  days.forEach((d) => (spendByDay[d] = 0));
  transactions.forEach((tx) => {
    if (tx.day <= 7) {
      spendByDay[tx.day] = (spendByDay[tx.day] || 0) + tx.amount;
    }
  });

  const topCategory = [...categoryBreakdown].sort((a, b) => b.amount - a.amount)[0];

  let cumulativeAngle = 0;
  const radius = 62;
  const strokeWidth = 18;
  const center = 85;

  const donutSlices = categoryBreakdown.map((item) => {
    const angle = (item.percentage / 100) * 360;
    const strokeDash = `${(item.percentage / 100) * (2 * Math.PI * radius)} ${
      2 * Math.PI * radius
    }`;
    const offset = -(cumulativeAngle / 360) * (2 * Math.PI * radius);
    cumulativeAngle += angle;
    return {
      ...item,
      strokeDash,
      offset,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Financial Insights & Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Behavioral analysis of your 30-day survival budget.
          </p>
        </div>

        {/* Overview Tabs */}
        <div className="flex items-center gap-1 bg-[#121936] p-1.5 rounded-2xl border border-white/5 shadow-md">
          {(['Overview', 'Spending', 'Trends', 'Tips'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
                activeTab === tab
                  ? 'btn-glow-pink text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split: Donut Chart on Left, Weekly Trend on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Left Card: Spending Breakdown Donut & Legend */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-white text-left mb-6">
              Category Breakdown
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Donut Chart */}
              <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 170 170">
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#1e293b"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  {donutSlices.map((slice, i) => (
                    <circle
                      key={i}
                      cx={center}
                      cy={center}
                      r={radius}
                      stroke={slice.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={slice.strokeDash}
                      strokeDashoffset={slice.offset}
                      fill="none"
                      className="transition-all duration-700 ease-out"
                    />
                  ))}
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="font-display font-black text-lg text-white">
                    <AnimatedRupee amount={totalSpent} />
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Total Spent
                  </span>
                </div>
              </div>

              {/* Legend with colored dots */}
              <div className="w-full flex flex-col gap-2.5 text-xs text-left">
                {categoryBreakdown.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-all duration-150"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-slate-300 font-medium">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-400">₹{item.amount.toLocaleString()}</span>
                      <span className="font-bold text-white w-8 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 text-[11px] text-slate-400 text-left">
            Total survival budget: <span className="font-mono text-cyan-300 font-bold">₹10,000</span>
          </div>
        </div>

        {/* Right Card: Weekly Spending Trend Bar Chart */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-base text-white text-left">
                Weekly Spending Trend
              </h3>
              <span className="text-xs text-slate-400 font-mono font-semibold">Days 1 – 7</span>
            </div>

            <div className="relative h-52 w-full flex items-end justify-between pt-6 pb-6 px-4">
              <div className="absolute inset-x-0 top-6 border-b border-white/5 text-[10px] text-slate-500 font-mono -translate-y-2">
                ₹3,000
              </div>
              <div className="absolute inset-x-0 top-1/2 border-b border-white/5 text-[10px] text-slate-500 font-mono -translate-y-2">
                ₹1,500
              </div>
              <div className="absolute inset-x-0 bottom-6 border-b border-white/10 text-[10px] text-slate-500 font-mono">
                ₹0
              </div>

              {days.map((day) => {
                const dayAmount = spendByDay[day] || 0;
                const barHeight = Math.min(100, Math.max(12, (dayAmount / 3000) * 100));

                return (
                  <div key={day} className="flex flex-col items-center gap-2 z-10 group flex-1">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-[10px] font-mono text-cyan-300 whitespace-nowrap -translate-y-1">
                      ₹{dayAmount}
                    </div>

                    <div className="w-7 sm:w-10 bg-slate-800/80 rounded-t-xl h-36 flex items-end p-0.5 overflow-hidden">
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500 to-cyan-400 group-hover:from-pink-500 group-hover:to-rose-400 transition-all duration-500 ease-out"
                        style={{ height: `${barHeight}%` }}
                      />
                    </div>

                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors duration-150">
                      Day {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
            <span>Peak Day: <strong className="text-white">Day 1 (Dorm & Setup)</strong></span>
            <span>Avg Daily: <strong className="text-cyan-300 font-mono">₹{Math.round(totalSpent / 7)}</strong></span>
          </div>
        </div>
      </div>

      {/* Bottom Smart Financial Tip Card */}
      <div className="glass-panel p-5 rounded-3xl border border-amber-400/20 bg-[#161a34] flex items-start gap-4 text-left shadow-xl hover:border-amber-400/40 transition-colors duration-200">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-display font-bold text-sm text-white mb-1">
            Smart Tip
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {topCategory && topCategory.amount > 0 ? (
              <>
                You&apos;re spending <span className="text-pink-400 font-bold">{topCategory.percentage}%</span> on{' '}
                <span className="text-white font-semibold">{topCategory.category}</span>. Try cooking more at
                home and using transit passes to save up for bigger emergency buffers!
              </>
            ) : (
              <>
                Maintain a daily spending velocity under ₹333 to survive all 30 days comfortably with emergency reserves intact!
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
