import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ScreenId } from '../types/game';
import { AnimatedRupee } from './AnimatedRupee';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  ShoppingBag,
  AlertTriangle,
  PieChart,
  Menu,
  X,
  Receipt,
  Globe2,
  Smartphone,
  RotateCcw,
  Volume2,
  VolumeX,
  Keyboard,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    cart,
    triggerEventModal,
    isPhoneDeviceView,
    setIsPhoneDeviceView,
    resetGame,
    currentDay,
    remainingBudget,
    isAudioMuted,
    toggleAudioMute,
    setShortcutsModalOpen,
  } = useGame();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false);

  // Exact 5 primary items as requested
  const primaryNavItems: { id: ScreenId; label: string; icon: React.ReactNode; isModalTrigger?: boolean }[] = [
    { id: 'landing', label: 'Home', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'dashboard', label: 'Journey', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'events', label: 'Events', icon: <AlertTriangle className="w-3.5 h-3.5" />, isModalTrigger: true },
    { id: 'insights', label: 'Insights', icon: <PieChart className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (item: (typeof primaryNavItems)[number]) => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
    if (item.isModalTrigger) {
      triggerEventModal();
    } else {
      if (item.id === 'landing' && currentScreen === 'landing') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setCurrentScreen(item.id);
    }
  };

  const handleResetConfirm = () => {
    if (window.confirm('Reset challenge back to Day 1 with starting ₹10,000 balance?')) {
      resetGame();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080c1e]/85 backdrop-blur-2xl border-b border-white/10 px-3 sm:px-6 lg:px-8 py-2.5 transition-colors shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Small, Refined Brokeology Logo */}
        <button
          onClick={() => {
            if (currentScreen === 'landing') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setCurrentScreen('landing');
          }}
          aria-label="Brokeology home, navigate to home screen"
          className="flex items-center gap-2 sm:gap-2.5 text-left group focus-visible:outline-2 focus-visible:outline-pink-400 focus-visible:outline-offset-2 rounded-xl cursor-pointer shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform duration-200">
            <div className="w-full h-full bg-[#0d122b] rounded-[10px] flex items-center justify-center">
              <span className="text-pink-400 font-black text-sm">₹</span>
            </div>
          </div>
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-pink-300 transition-colors duration-200 flex items-center">
            Broke<span className="text-pink-400">ology</span>
          </span>
        </button>

        {/* Right: Exactly 5 Primary Navigation Links with Gliding Animated Active State */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-[#101633]/90 px-2 py-1 rounded-2xl border border-white/10 shadow-lg relative"
        >
          {primaryNavItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-pink-400 focus-visible:outline-offset-1 ${
                  isActive ? 'text-white font-bold' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="primaryNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-md shadow-pink-500/30 border border-pink-300/30 -z-10"
                    transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                  />
                )}
                <span>{item.label}</span>
                {item.id === 'shop' && cart.length > 0 && (
                  <span className="bg-pink-400 text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            );
          })}

          {/* Secondary Sub-menu Dropdown for Tracker & 3D World */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              aria-haspopup="true"
              aria-expanded={moreMenuOpen}
              aria-label="More navigation links"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400 focus-visible:outline-offset-1 ${
                currentScreen === 'tracker' || currentScreen === 'moneyverse' || currentScreen === 'result'
                  ? 'text-pink-400 font-bold bg-white/5'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>More ▾</span>
            </button>

            {moreMenuOpen && (
              <div
                role="menu"
                aria-label="Secondary navigation"
                className="absolute right-0 top-full mt-2 w-40 glass-panel-glow p-1.5 rounded-2xl border border-pink-500/30 shadow-2xl z-50 text-left flex flex-col gap-1"
              >
                <button
                  role="menuitem"
                  onClick={() => {
                    setCurrentScreen('tracker');
                    setMoreMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-pink-400 ${
                    currentScreen === 'tracker' ? 'bg-pink-500/20 text-pink-300' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Receipt className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Expense Tracker</span>
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    setCurrentScreen('moneyverse');
                    setMoreMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-pink-400 ${
                    currentScreen === 'moneyverse' ? 'bg-pink-500/20 text-pink-300' : 'text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>3D Moneyverse</span>
                </button>
                <button
                  role="menuitem"
                  onClick={() => {
                    setCurrentScreen('result');
                    setMoreMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 flex items-center gap-2 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-pink-400"
                >
                  <span>Challenge Result</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Compact Status & Tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Remaining Balance Pill */}
          <div
            role="status"
            aria-label={`Current status: Day ${currentDay} of 30, remaining balance ₹${remainingBudget.toLocaleString()}`}
            className="hidden sm:flex items-center gap-2 bg-[#121936] px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold"
          >
            <span className="text-slate-300">Day {currentDay}/30</span>
            <span className="text-slate-500" aria-hidden="true">·</span>
            <span className="font-bold text-pink-400">
              <AnimatedRupee amount={remainingBudget} />
            </span>
          </div>

          {/* Sound Synthesizer Audio Toggle */}
          <button
            onClick={toggleAudioMute}
            title={isAudioMuted ? 'Unmute Sound Effects (Press M)' : 'Mute Sound Effects (Press M)'}
            aria-label={isAudioMuted ? 'Unmute audio effects' : 'Mute audio effects'}
            className={`p-1.5 rounded-xl transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400 ${
              isAudioMuted
                ? 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                : 'text-pink-400 hover:text-pink-300 hover:bg-pink-500/15'
            }`}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Keyboard Shortcuts Dialog Launcher */}
          <button
            onClick={() => setShortcutsModalOpen(true)}
            title="Keyboard Shortcuts & Accessibility (Press ?)"
            aria-label="View keyboard shortcuts guide"
            className="hidden sm:inline-flex p-1.5 text-slate-400 hover:text-pink-300 hover:bg-white/5 rounded-xl transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>

          {/* Reset Challenge Confirmation */}
          <button
            onClick={handleResetConfirm}
            title="Reset 30-Day Challenge"
            aria-label="Reset challenge back to Day 1 with starting ₹10,000 balance"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/15 rounded-xl transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* User Avatar Button */}
          <button
            onClick={() => setCurrentScreen('dashboard')}
            aria-label="Go to financial journey dashboard"
            className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-indigo-500 cursor-pointer hover:ring-2 hover:ring-pink-400 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-pink-400"
            title="Go to Journey"
          >
            <div className="w-full h-full rounded-full bg-[#161e3f] flex items-center justify-center overflow-hidden">
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
          </button>
        </div>
      </div>

      {/* Mobile Collapse Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5 text-left overflow-hidden"
          >
            {primaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  currentScreen === item.id
                    ? 'btn-glow-pink text-white font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'shop' && cart.length > 0 && (
                  <span className="bg-pink-400 text-slate-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            ))}

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => {
                  setCurrentScreen('tracker');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-medium text-slate-300 hover:text-white text-center cursor-pointer"
              >
                Tracker
              </button>
              <button
                onClick={() => {
                  setCurrentScreen('moneyverse');
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl bg-white/5 text-xs font-medium text-slate-300 hover:text-white text-center cursor-pointer"
              >
                3D World
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
