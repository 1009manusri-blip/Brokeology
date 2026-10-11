import React from 'react';
import { useGame } from '../context/GameContext';
import { ThreeMoneyverse } from './ThreeMoneyverse';
import { AnimatedRupee } from './AnimatedRupee';
import { motion } from 'motion/react';
import {
  Check,
  ArrowRight,
  ShoppingBag,
  AlertCircle,
  Receipt,
  Globe2,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    currentDay,
    remainingBudget,
    spendingPercentage,
    tasks,
    toggleTask,
    advanceDay,
    jumpToDay,
    setCurrentScreen,
    triggerEventModal,
  } = useGame();

  const daysList = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 3-Column Layout: Visual Hierarchy 1. Day/Balance -> 2. Central 3D World -> 3. Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Challenge Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-2 glass-panel p-4 rounded-3xl flex flex-col items-center border border-white/10 shadow-2xl"
        >
          {/* Avatar Profile */}
          <div className="relative w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-indigo-500 mb-3 shadow-md shadow-pink-500/25">
            <div className="w-full h-full rounded-full bg-[#141b38] flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="20" r="20" fill="#1e1b4b" />
                <circle cx="20" cy="18" r="9" fill="#fed7aa" />
                <path d="M 12 18 C 12 10 28 10 28 18" fill="#3b1d11" />
                <circle cx="24" cy="12" r="5" fill="#2d140a" />
                <path d="M 10 18 C 10 9 30 9 30 18" stroke="#38bdf8" strokeWidth="2" fill="none" />
                <rect x="9" y="16" width="3" height="6" rx="1.5" fill="#0284c7" />
                <rect x="28" y="16" width="3" height="6" rx="1.5" fill="#0284c7" />
                <path d="M 11 32 C 14 26 26 26 29 32 Z" fill="#f43f5e" />
              </svg>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0c1022]" />
          </div>

          <h3 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-3">
            Timeline
          </h3>

          {/* Day list pills */}
          <div className="w-full flex flex-col gap-1.5" role="navigation" aria-label="Day Timeline Navigation">
            {daysList.map((day) => {
              const isPast = day < currentDay;
              const isCurrent = day === currentDay;

              if (isCurrent) {
                return (
                  <button
                    key={day}
                    onClick={() => jumpToDay(day)}
                    aria-current="step"
                    aria-label={`Current day: Day ${day}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-md shadow-pink-500/35 border border-pink-300/40 flex items-center justify-between transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span>Day {day}</span>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
                  </button>
                );
              }

              return (
                <button
                  key={day}
                  onClick={() => jumpToDay(day)}
                  aria-label={`Jump to Day ${day}${isPast ? ' (completed)' : ''}`}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400 ${
                    isPast
                      ? 'text-cyan-300 hover:bg-white/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Day {day}</span>
                  {isPast && <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[3]" aria-hidden="true" />}
                </button>
              );
            })}

            <div className="text-center text-slate-500 text-xs py-1" aria-hidden="true">···</div>

            <button
              onClick={() => jumpToDay(30)}
              aria-label="Skip to final Day 30"
              className="text-[11px] text-pink-400 hover:text-pink-300 hover:underline py-1 font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400 rounded"
            >
              Skip to Day 30 →
            </button>
          </div>
        </motion.div>

        {/* Center Column: Central 3D Interactive World Scene */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col gap-4 text-left"
        >
          {/* Header Bar */}
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                Day {currentDay}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Keep going! You&apos;re doing great so far.
              </p>
            </div>

            {/* Quick shortcuts */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentScreen('tracker')}
                aria-label="Open expense tracker"
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
              >
                <Receipt className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span>Tracker</span>
              </button>
              <button
                onClick={() => setCurrentScreen('moneyverse')}
                aria-label="Open full 3D Moneyverse map"
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
              >
                <Globe2 className="w-3.5 h-3.5 text-pink-400" aria-hidden="true" />
                <span>Full Map</span>
              </button>
            </div>
          </div>

          {/* Central 3D Scene with Speech Bubble & Click Interaction */}
          <div className="relative aspect-[16/11] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
            <ThreeMoneyverse
              interactive={true}
              onSelectLocation={(loc) => {
                if (loc === 'Cafe' || loc === 'Market') setCurrentScreen('shop');
              }}
              showSpeechBubble={true}
              className="w-full h-full"
            />

            {/* In-world Action Bar */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 pointer-events-auto">
              <button
                onClick={() => setCurrentScreen('shop')}
                className="px-4 py-2 rounded-xl glass-pill hover:bg-pink-500/20 text-xs font-bold text-slate-100 flex items-center gap-2 border border-white/20 hover:border-pink-400/50 transition-all duration-150 cursor-pointer shadow-lg hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
                <span>Visit College Cafe & Shop</span>
              </button>

              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline bg-[#090e24]/75 px-2.5 py-1 rounded-lg border border-white/5">
                Interactive 3D Canvas
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Remaining Budget & Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 flex flex-col gap-4 text-left"
        >
          {/* Prominent Remaining Budget Card */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl">
            <div className="text-xs text-slate-300 font-semibold mb-1">
              Remaining Budget
            </div>
            <div className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mb-3">
              <AnimatedRupee amount={remainingBudget} />
            </div>

            {/* Neon Cyan Progress Bar */}
            <div
              role="progressbar"
              aria-valuenow={Math.max(0, 100 - spendingPercentage)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Remaining budget: ${100 - spendingPercentage}% of ₹10,000`}
              className="w-full"
            >
              <div className="w-full h-2.5 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(4, 100 - spendingPercentage)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-300 mt-2 font-mono">
                <span className="text-cyan-300 font-bold">{100 - spendingPercentage}% left</span>
                <span>₹10,000 max</span>
              </div>
            </div>
          </div>

          {/* Today's Tasks Checklist */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-2xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-sm text-white">
                  Today&apos;s Tasks
                </h3>
                <span className="text-[11px] text-slate-300 font-mono font-bold">
                  {tasks.filter((t) => t.completed).length}/{tasks.length}
                </span>
              </div>

              <fieldset className="flex flex-col gap-2">
                <legend className="sr-only">Tasks for Day {currentDay}</legend>
                {tasks.map((task) => (
                  <label
                    key={task.id}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors duration-150 group"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={task.text}
                      className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-900 text-pink-500 focus:ring-pink-400 accent-pink-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
                    />
                    <span
                      className={`text-xs leading-snug select-none transition-colors duration-150 ${
                        task.completed
                          ? 'text-slate-400 line-through'
                          : 'text-slate-200 group-hover:text-white'
                      }`}
                    >
                      {task.text}
                    </span>
                  </label>
                ))}
              </fieldset>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-white/5 space-y-2.5">
              <button
                onClick={triggerEventModal}
                aria-label="Simulate random unexpected financial event"
                className="w-full py-2 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-amber-400"
              >
                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Simulate Unexpected Event</span>
              </button>

              <button
                onClick={advanceDay}
                aria-label={`Advance to Day ${currentDay + 1}`}
                className="w-full btn-glow-pink py-3.5 px-4 rounded-xl text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-pink-400"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
