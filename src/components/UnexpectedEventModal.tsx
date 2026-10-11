import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { DamagedPhoneIllustration } from './Artwork/DamagedPhoneIllustration';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

export const UnexpectedEventModal: React.FC = () => {
  const { eventModalOpen, setEventModalOpen, resolveUnexpectedExpense } = useGame();
  const [showAlternatives, setShowAlternatives] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && eventModalOpen) {
        setEventModalOpen(false);
        setShowAlternatives(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [eventModalOpen, setEventModalOpen]);

  const handlePayNow = () => {
    resolveUnexpectedExpense('pay', 1500, 'Official Phone Repair');
    setShowAlternatives(false);
  };

  const handleChooseAlternative = (cost: number, title: string) => {
    resolveUnexpectedExpense('alternative', cost, title);
    setShowAlternatives(false);
  };

  return (
    <AnimatePresence>
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dimmed Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => {
              setEventModalOpen(false);
              setShowAlternatives(false);
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-glow w-full max-w-xl p-6 sm:p-8 rounded-3xl border border-pink-500/40 text-center shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setEventModalOpen(false);
                setShowAlternatives(false);
              }}
              aria-label="Close unexpected event dialog"
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
              title="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <h2 id="event-modal-title" className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Unexpected Expense!
              </h2>
            </div>

            {/* Damaged Phone Illustration */}
            <div className="my-4">
              <DamagedPhoneIllustration />
            </div>

            {/* Description Text */}
            <p className="text-slate-200 text-sm sm:text-base font-medium">
              Your phone got damaged.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5 mb-6">
              You need to spend <span className="text-pink-400 font-bold font-mono">₹1,500</span> for a repair.
            </p>

            <AnimatePresence mode="wait">
              {!showAlternatives ? (
                /* Primary Actions */
                <motion.div
                  key="primary-actions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col sm:flex-row items-center gap-3"
                >
                  <button
                    onClick={handlePayNow}
                    className="w-full sm:flex-1 btn-glow-pink py-3.5 px-6 rounded-2xl text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-pink-400"
                  >
                    <span>Pay Now (-₹1,500)</span>
                  </button>

                  <button
                    onClick={() => setShowAlternatives(true)}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#141b3c] hover:bg-[#1b2450] border border-white/10 hover:border-cyan-400/30 text-slate-200 font-display font-semibold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
                  >
                    <span>Find an Alternative</span>
                  </button>
                </motion.div>
              ) : (
                /* Alternative Choices */
                <motion.div
                  key="alternative-choices"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="text-left bg-[#090d1f] p-4 rounded-2xl border border-white/10 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-2">
                    <span>Choose your survival alternative:</span>
                    <button
                      onClick={() => setShowAlternatives(false)}
                      className="text-pink-400 hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400 rounded"
                    >
                      Back
                    </button>
                  </div>

                  <button
                    onClick={() => handleChooseAlternative(0, "Borrowed Friend's Spare Phone")}
                    className="w-full p-3 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/5 hover:border-emerald-400/30 flex items-center justify-between text-xs transition-all duration-150 cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-pink-400"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        Borrow Friend&apos;s Spare Phone
                      </div>
                      <div className="text-[11px] text-slate-300">
                        A bit laggy, but costs ₹0 and saves your budget!
                      </div>
                    </div>
                    <span className="font-mono font-bold text-emerald-400 text-sm">₹0</span>
                  </button>

                  <button
                    onClick={() => handleChooseAlternative(150, 'DIY Screen Guard & Tape Fix')}
                    className="w-full p-3 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/5 hover:border-cyan-400/30 flex items-center justify-between text-xs transition-all duration-150 cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-pink-400"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        DIY Glass Guard & Tape Fix
                      </div>
                      <div className="text-[11px] text-slate-300">
                        Stops fingers getting cut. Saves ₹1,350!
                      </div>
                    </div>
                    <span className="font-mono font-bold text-cyan-400 text-sm">₹150</span>
                  </button>

                  <button
                    onClick={() => handleChooseAlternative(600, 'Local Market Glass Repair')}
                    className="w-full p-3 rounded-xl bg-white/5 hover:bg-amber-500/15 border border-white/5 hover:border-amber-400/30 flex items-center justify-between text-xs transition-all duration-150 cursor-pointer group hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-pink-400"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                        Local Market Third-Party Shop
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Non-original display, works fine. Saves ₹900.
                      </div>
                    </div>
                    <span className="font-mono font-bold text-amber-400 text-sm">₹600</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
