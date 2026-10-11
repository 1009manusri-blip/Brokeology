import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X, Sparkles, Volume2, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const shortcuts = [
    { key: '1', desc: 'Go to Home / Landing' },
    { key: '2', desc: 'Go to Journey Dashboard' },
    { key: '3', desc: 'Go to Campus Shop' },
    { key: '4', desc: 'Trigger Unexpected Event' },
    { key: '5', desc: 'Go to Expense Tracker' },
    { key: '6', desc: 'Go to Financial Insights' },
    { key: '7', desc: 'Go to 3D Moneyverse Map' },
    { key: 'Space', desc: 'Advance to Next Day' },
    { key: 'M', desc: 'Toggle Audio Sound Effects' },
    { key: '?', desc: 'Toggle this Shortcuts Guide' },
    { key: 'Esc', desc: 'Close any active modal or dialog' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-glow w-full max-w-lg p-6 sm:p-7 rounded-3xl border border-pink-500/40 text-left shadow-2xl relative z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close keyboard shortcuts dialog"
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-pink-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h2 id="shortcuts-dialog-title" className="font-display font-extrabold text-xl text-white tracking-tight">
                  Keyboard Shortcuts
                </h2>
                <p className="text-xs text-slate-400">
                  Speed through your financial journey with intuitive single-key controls
                </p>
              </div>
            </div>

            {/* Shortcuts List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
              {shortcuts.map((sc) => (
                <div
                  key={sc.key}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-pink-400/20 transition-colors"
                >
                  <span className="text-xs text-slate-300 font-medium">{sc.desc}</span>
                  <kbd className="px-2 py-1 rounded-lg bg-[#0e142e] border border-white/20 text-[11px] font-mono font-bold text-pink-300 shadow-inner">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>

            {/* Accessibility Note */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>WCAG 2.1 AA Compliant Navigation</span>
              </span>
              <button
                onClick={onClose}
                className="text-pink-400 font-semibold hover:underline cursor-pointer"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
