import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { CrownSunsetIllustration } from './Artwork/CrownSunsetIllustration';
import { AnimatedRupee } from './AnimatedRupee';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  RotateCcw,
  FileText,
  X,
  CheckCircle2,
  Share2,
  Sparkles,
} from 'lucide-react';

export const FinalResult: React.FC = () => {
  const {
    remainingBudget,
    totalSpent,
    initialBudget,
    resetGame,
    setCurrentScreen,
    transactions,
  } = useGame();

  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showReportModal) {
        setShowReportModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showReportModal]);

  const savingsRate = Math.round((remainingBudget / initialBudget) * 100);

  const handlePlayAgain = () => {
    if (window.confirm('Start a new 30-day challenge from Day 1?')) {
      resetGame();
    }
  };

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center flex flex-col items-center">
      {/* Crown Artwork & Sunset Sky */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl mb-6"
      >
        <CrownSunsetIllustration />
      </motion.div>

      {/* Main Title & Subtitle */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight mb-3"
      >
        You Survived!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6"
      >
        You managed your money, faced challenges, and completed 30 days. You&apos;re now
        a smarter, stronger financial you!
      </motion.p>

      {/* Total Saved Amount Card with AnimatedRupee */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel-glow px-8 py-5 rounded-3xl border border-pink-500/30 max-w-xs w-full mb-8 shadow-2xl hover:border-pink-400/50 transition-colors duration-200"
      >
        <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
          Total Saved
        </div>
        <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
          <AnimatedRupee amount={remainingBudget} />
        </div>
        <div className="text-[11px] text-pink-300 font-medium mt-1">
          {savingsRate}% of initial ₹10,000 preserved
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm"
      >
        <button
          onClick={() => setShowReportModal(true)}
          className="w-full btn-glow-pink py-4 px-6 rounded-2xl text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          <FileText className="w-4 h-4" />
          <span>View Final Report</span>
        </button>

        <button
          onClick={handlePlayAgain}
          className="w-full py-4 px-6 rounded-2xl bg-[#141b3c] hover:bg-[#1c2550] border border-white/10 hover:border-pink-500/30 text-slate-200 font-display font-semibold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again</span>
        </button>
      </motion.div>

      {/* Return to Dashboard link */}
      <button
        onClick={() => setCurrentScreen('dashboard')}
        className="mt-6 text-xs text-slate-400 hover:text-white transition-colors duration-150 cursor-pointer"
      >
        ← Review Dashboard & Past Days
      </button>

      {/* Final Report Modal with AnimatePresence */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setShowReportModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="report-modal-title"
              initial={{ opacity: 0, scale: 0.94, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-glow w-full max-w-xl p-6 sm:p-8 rounded-3xl border border-pink-500/40 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowReportModal(false)}
                aria-label="Close report dialog"
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center" aria-hidden="true">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="report-modal-title" className="font-display font-bold text-xl text-white">
                    30-Day Financial Graduation Report
                  </h3>
                  <p className="text-xs text-slate-300">
                    Performance assessment & unlocked financial badges.
                  </p>
                </div>
              </div>

              {/* Metric Strip */}
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="bg-[#0b1024] p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-[10px] uppercase text-slate-400 font-medium">Initial</div>
                  <div className="font-mono font-bold text-sm text-slate-200 mt-0.5">₹10,000</div>
                </div>
                <div className="bg-[#0b1024] p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-[10px] uppercase text-slate-400 font-medium">Spent</div>
                  <div className="font-bold text-sm text-rose-400 mt-0.5">
                    <AnimatedRupee amount={totalSpent} />
                  </div>
                </div>
                <div className="bg-[#0b1024] p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-[10px] uppercase text-slate-400 font-medium">Saved</div>
                  <div className="font-bold text-sm text-emerald-400 mt-0.5">
                    <AnimatedRupee amount={remainingBudget} />
                  </div>
                </div>
              </div>

              {/* Badges Unlocked */}
              <div className="space-y-3 my-5">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Achievements Unlocked
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-emerald-500/30 flex items-center gap-3 hover:bg-emerald-500/10 transition-colors duration-150">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Emergency Survivor</div>
                      <div className="text-[10px] text-slate-400">Navigated surprise phone repair without going broke</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-pink-500/30 flex items-center gap-3 hover:bg-pink-500/10 transition-colors duration-150">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Smart Frugality</div>
                      <div className="text-[10px] text-slate-400">Maintained daily spend under budget limit</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transactions Count */}
              <div className="p-4 rounded-2xl bg-[#090d20] border border-white/5 text-xs text-slate-300 flex items-center justify-between">
                <span>Total Logged Transactions:</span>
                <span className="font-mono font-bold text-white">{transactions.length} entries</span>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#141b3c] hover:bg-[#1a234e] border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedShare ? 'Copied Score Link!' : 'Share Achievement'}</span>
                </button>

                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 btn-glow-pink py-3 px-4 rounded-xl text-white font-display font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
