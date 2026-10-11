import React, { Suspense, lazy } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';

// Code-split secondary views to keep initial bundle size lean and fast
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const Shop = lazy(() => import('./components/Shop').then(m => ({ default: m.Shop })));
const ExpenseTracker = lazy(() => import('./components/ExpenseTracker').then(m => ({ default: m.ExpenseTracker })));
const FinancialInsights = lazy(() => import('./components/FinancialInsights').then(m => ({ default: m.FinancialInsights })));
const Moneyverse = lazy(() => import('./components/Moneyverse').then(m => ({ default: m.Moneyverse })));
const MobileView = lazy(() => import('./components/MobileView').then(m => ({ default: m.MobileView })));
const FinalResult = lazy(() => import('./components/FinalResult').then(m => ({ default: m.FinalResult })));
const UnexpectedEventModal = lazy(() => import('./components/UnexpectedEventModal').then(m => ({ default: m.UnexpectedEventModal })));
const KeyboardShortcutsModal = lazy(() => import('./components/KeyboardShortcutsModal').then(m => ({ default: m.KeyboardShortcutsModal })));

import { motion, AnimatePresence } from 'motion/react';

const ScreenLoadingFallback: React.FC = () => (
  <div className="w-full min-h-[60vh] flex items-center justify-center py-20">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center animate-pulse shadow-lg shadow-pink-500/20">
        <span className="text-pink-400 font-bold text-lg font-mono">₹</span>
      </div>
      <span className="text-xs font-mono text-slate-400 tracking-wider">LOADING EXPERIENCE...</span>
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const {
    currentScreen,
    isPhoneDeviceView,
    shortcutsModalOpen,
    setShortcutsModalOpen,
    announcement,
  } = useGame();

  const renderActiveScreen = () => {
    if (isPhoneDeviceView) {
      return (
        <Suspense fallback={<ScreenLoadingFallback />}>
          <MobileView />
        </Suspense>
      );
    }

    switch (currentScreen) {
      case 'landing':
        return <LandingHero />;
      case 'dashboard':
        return (
          <Suspense fallback={<ScreenLoadingFallback />}>
            <Dashboard />
          </Suspense>
        );
      case 'shop':
        return (
          <Suspense fallback={<ScreenLoadingFallback />}>
            <Shop />
          </Suspense>
        );
      case 'tracker':
        return (
          <Suspense fallback={<ScreenLoadingFallback />}>
            <ExpenseTracker />
          </Suspense>
        );
      case 'insights':
        return (
          <Suspense fallback={<ScreenLoadingFallback />}>
            <FinancialInsights />
          </Suspense>
        );
      case 'moneyverse':
        return (
          <Suspense fallback={<ScreenLoadingFallback />}>
            <Moneyverse />
          </Suspense>
        );
      case 'mobile':
        return (
          <Suspense fallback={<ScreenLoadingFallback />}>
            <MobileView />
          </Suspense>
        );
      case 'result':
        return (
          <Suspense fallback={<ScreenLoadingFallback />}>
            <FinalResult />
          </Suspense>
        );
      default:
        return <LandingHero />;
    }
  };

  return (
    <div className="min-h-screen bg-[#080b18] text-slate-100 flex flex-col justify-between selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      {/* Accessible Skip Link for keyboard & screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-pink-600 focus:text-white focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-bold"
      >
        Skip to main content
      </a>

      {/* Ambient background glow points matching sunset/night theme */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/3 right-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <Header />

      {/* Main Screen Body with Smooth Page Transitions */}
      <main id="main-content" role="main" tabIndex={-1} className="flex-1 w-full relative z-10 flex flex-col focus:outline-none">
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

      {/* Screen Reader Live Region for WCAG 2.1 AA Accessibility */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* Screen 4: Unexpected Event Modal (Can trigger anywhere) */}
      <Suspense fallback={null}>
        <UnexpectedEventModal />
      </Suspense>

      {/* Keyboard Shortcuts & Accessibility Modal */}
      <Suspense fallback={null}>
        {shortcutsModalOpen && (
          <KeyboardShortcutsModal
            isOpen={shortcutsModalOpen}
            onClose={() => setShortcutsModalOpen(false)}
          />
        )}
      </Suspense>

      {/* Clean Global Footer */}
      <footer className="w-full py-4 px-6 border-t border-white/5 bg-[#070914]/80 text-center text-xs text-slate-500 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-slate-400">Brokeology</span>
          <span>·</span>
          <span>&quot;Your money is a world. Every decision changes it.&quot;</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>₹10,000 / 30 Days Challenge</span>
          <span>·</span>
          <button
            onClick={() => setShortcutsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-pink-300 font-semibold cursor-pointer border border-white/10 hover:border-pink-400/30 transition-colors"
            title="Press ? key for Keyboard Shortcuts"
          >
            <span>Shortcuts</span>
            <kbd className="px-1 py-0.2 rounded bg-black/40 text-[10px] font-mono">?</kbd>
          </button>
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
