import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { IsometricWorldIllustration } from './Artwork/IsometricWorldIllustration';
import { AnimatedRupee } from './AnimatedRupee';
import {
  Compass,
  ShoppingBag,
  Receipt,
  PieChart,
  ArrowRight,
  Menu,
} from 'lucide-react';

export const MobileView: React.FC = () => {
  const {
    currentDay,
    remainingBudget,
    spendingPercentage,
    tasks,
    toggleTask,
    advanceDay,
    setCurrentScreen,
  } = useGame();

  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'shop' | 'tracker' | 'insights'>('home');

  return (
    <div className="py-6 flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-black text-white">
          Mobile App Experience (Screen 8)
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Interactive mockup showing the dedicated smartphone UI & bottom navigation.
        </p>
      </div>

      {/* Realistic Smartphone Chassis Frame Matching Screen 8 */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[740px] max-h-[85vh] bg-[#0c1022] rounded-[40px] sm:rounded-[48px] border-[6px] sm:border-[8px] border-[#252f52] shadow-2xl shadow-pink-500/10 overflow-hidden flex flex-col justify-between mx-auto">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-[#182348] mr-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
        </div>

        {/* Mobile Header Bar */}
        <div className="pt-8 px-4 sm:px-5 pb-3 bg-[#0a0e22]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pink-500 flex items-center justify-center text-white font-bold text-xs" aria-hidden="true">
              ₹
            </div>
            <span className="font-display font-black text-sm text-white">
              Broke<span className="text-pink-400">ology</span>
            </span>
          </div>

          <button
            onClick={() => setCurrentScreen('dashboard')}
            aria-label="Open mobile navigation menu"
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-150 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-pink-400"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Mobile Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-none text-left">
          {/* Day Title */}
          <div>
            <h3 className="font-display font-black text-xl text-white">
              Day {currentDay}
            </h3>
            <p className="text-[11px] text-slate-400">
              Your financial world responds to every choice.
            </p>
          </div>

          {/* Remaining Budget Card Matching Screen 8 */}
          <div className="bg-[#121936] p-4 rounded-2xl border border-white/10 shadow-lg">
            <div className="text-[11px] text-slate-400 font-medium mb-0.5">
              Remaining Budget
            </div>
            <div className="text-2xl font-display font-black text-white tracking-tight mb-2">
              <AnimatedRupee amount={remainingBudget} />
            </div>

            {/* Progress Bar with Cyan Fill */}
            <div className="w-full">
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(5, 100 - spendingPercentage)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
                <span>{100 - spendingPercentage}% left</span>
                <span>₹10,000 max</span>
              </div>
            </div>
          </div>

          {/* Miniature Isometric Scene */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-md">
            <IsometricWorldIllustration showSpeechBubble={false} />
          </div>

          {/* Today's Tasks Matching Screen 8 */}
          <div className="bg-[#121936] p-4 rounded-2xl border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-xs text-white">
                Today&apos;s Tasks
              </h4>
              <span className="text-[10px] text-slate-400 font-mono font-bold">
                {tasks.filter((t) => t.completed).length}/{tasks.length}
              </span>
            </div>

            <div className="space-y-1.5">
              {tasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/5 cursor-pointer text-xs transition-colors duration-150"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mt-0.5 w-3.5 h-3.5 rounded text-pink-500 accent-pink-500 cursor-pointer"
                  />
                  <span
                    className={`text-[11px] leading-tight ${
                      task.completed ? 'text-slate-500 line-through' : 'text-slate-200'
                    }`}
                  >
                    {task.text}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={advanceDay}
              className="w-full mt-2 btn-glow-pink py-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar Matching Screen 8 */}
        <nav
          aria-label="Mobile Bottom Navigation"
          className="pt-2 pb-5 px-4 bg-[#0a0e22]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-around z-20"
        >
          <button
            onClick={() => {
              setActiveBottomTab('home');
              setCurrentScreen('dashboard');
            }}
            aria-label="Home Dashboard"
            aria-current={activeBottomTab === 'home' ? 'page' : undefined}
            className={`min-w-[48px] min-h-[48px] flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors duration-150 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-pink-400 ${
              activeBottomTab === 'home' ? 'text-pink-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('shop');
              setCurrentScreen('shop');
            }}
            aria-label="Campus Shop"
            aria-current={activeBottomTab === 'shop' ? 'page' : undefined}
            className={`min-w-[48px] min-h-[48px] flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors duration-150 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-pink-400 ${
              activeBottomTab === 'shop' ? 'text-pink-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Shop</span>
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('tracker');
              setCurrentScreen('tracker');
            }}
            aria-label="Expense Tracker"
            aria-current={activeBottomTab === 'tracker' ? 'page' : undefined}
            className={`min-w-[48px] min-h-[48px] flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors duration-150 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-pink-400 ${
              activeBottomTab === 'tracker' ? 'text-pink-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" aria-hidden="true" />
            <span>Tracker</span>
          </button>

          <button
            onClick={() => {
              setActiveBottomTab('insights');
              setCurrentScreen('insights');
            }}
            aria-label="Financial Insights"
            aria-current={activeBottomTab === 'insights' ? 'page' : undefined}
            className={`min-w-[48px] min-h-[48px] flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors duration-150 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-pink-400 ${
              activeBottomTab === 'insights' ? 'text-pink-400 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <PieChart className="w-4 h-4" aria-hidden="true" />
            <span>Insights</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
