import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { Dashboard } from './components/Dashboard';
import { Shop } from './components/Shop';
import { ExpenseTracker } from './components/ExpenseTracker';
import { FinancialInsights } from './components/FinancialInsights';
import { Moneyverse } from './components/Moneyverse';
import { MobileView } from './components/MobileView';
import { FinalResult } from './components/FinalResult';
import { UnexpectedEventModal } from './components/UnexpectedEventModal';

import { motion, AnimatePresence } from 'motion/react';

const MainContent: React.FC = () => {
  const { currentScreen, isPhoneDeviceView } = useGame();

  const renderActiveScreen = () => {
    if (isPhoneDeviceView) {
      return <MobileView />;
    }

    switch (currentScreen) {
      case 'landing':
        return <LandingHero />;
      case 'dashboard':
        return <Dashboard />;
      case 'shop':
        return <Shop />;
      case 'tracker':
        return <ExpenseTracker />;
      case 'insights':
        return <FinancialInsights />;
      case 'moneyverse':
        return <Moneyverse />;
      case 'mobile':
        return <MobileView />;
      case 'result':
        return <FinalResult />;
      default:
        return <LandingHero />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080b18] text-slate-100 flex flex-col justify-between selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      {/* Ambient background glow points matching sunset/night theme */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/3 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <Header />

      {/* Main Screen Body with Smooth Page Transitions */}
      <main className="flex-1 w-full relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={isPhoneDeviceView ? 'phone-mode' : currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1"
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Screen 4: Unexpected Event Modal (Can trigger anywhere) */}
      <UnexpectedEventModal />

      {/* Clean Global Footer */}
      <footer className="w-full py-4 px-6 border-t border-white/5 bg-[#070914]/80 text-center text-xs text-slate-500 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-slate-400">Brokeology</span>
          <span>·</span>
          <span>&quot;Your money is a world. Every decision changes it.&quot;</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>₹10,000 / 30 Days Challenge</span>
          <span>·</span>
          <span className="text-pink-400">Financial Survival Simulation</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
}
