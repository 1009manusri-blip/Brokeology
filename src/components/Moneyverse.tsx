import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ThreeMoneyverse } from './ThreeMoneyverse';
import { AnimatedRupee } from './AnimatedRupee';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Coffee,
  ShoppingBag,
  Building2,
  Home as HomeIcon,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

export const Moneyverse: React.FC = () => {
  const { setCurrentScreen, addExpense, remainingBudget } = useGame();
  const [selectedLocation, setSelectedLocation] = useState<
    'College' | 'Home' | 'Market' | 'Cafe' | 'Bank' | null
  >('Cafe');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const locationDetails = {
    College: {
      title: 'University Campus & Lecture Hall',
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      description: 'Your center for academic growth. Study sessions, group projects, and free campus resources.',
      actions: [
        {
          label: 'Study at Campus Library (Free)',
          cost: 0,
          desc: 'Save money by reading reference copies instead of buying new books.',
          effect: () => showToast('Library session completed! Saved ₹200 on printouts.'),
        },
        {
          label: 'Print Research Project Papers (-₹50)',
          cost: 50,
          desc: 'Essential submission papers for your semester coursework.',
          effect: () => {
            addExpense({ name: 'Project Printing', amount: 50, category: 'Essentials' });
            showToast('Project printed! Logged ₹50 under Essentials.');
          },
        },
      ],
    },
    Cafe: {
      title: 'College Corner Cafe',
      icon: <Coffee className="w-5 h-5 text-rose-400" />,
      description: 'The social hub where students gather. Tempting aromas, specialty brews, and snacks.',
      actions: [
        {
          label: 'Order Specialty Latte (-₹120)',
          cost: 120,
          desc: 'Warm comforting beverage to recharge between morning classes.',
          effect: () => {
            addExpense({ name: 'Specialty Latte', amount: 120, category: 'Food' });
            showToast('Purchased Latte for ₹120!');
          },
        },
        {
          label: 'Drink Free Filtered Water & Eat Packed Apple (₹0)',
          cost: 0,
          desc: 'Smart money-saving choice! Zero expense.',
          effect: () => showToast('Zero rupees spent! Budget champion decision.'),
        },
      ],
    },
    Market: {
      title: 'City Flea Market & Supermarket',
      icon: <ShoppingBag className="w-5 h-5 text-amber-400" />,
      description: 'Groceries, gadgets, and seasonal deals. Watch out for impulse buying temptation!',
      actions: [
        {
          label: 'Buy Weekly Veggie & Fruit Bundle (-₹250)',
          cost: 250,
          desc: 'Fresh ingredients for cooking budget-friendly healthy meals.',
          effect: () => {
            addExpense({ name: 'Market Fresh Produce', amount: 250, category: 'Food' });
            showToast('Groceries purchased for ₹250!');
          },
        },
        {
          label: 'Browse without buying (Window Shopping)',
          cost: 0,
          desc: 'Avoided impulse purchase! Your future self thanks you.',
          effect: () => showToast('Impulse resisted! ₹0 spent.'),
        },
      ],
    },
    Bank: {
      title: 'First Financial Trust Bank',
      icon: <Building2 className="w-5 h-5 text-emerald-400" />,
      description: 'Safeguard your remaining rupees and build an unbreakable emergency reserve.',
      actions: [
        {
          label: 'Lock ₹500 into Emergency Shield Reserve',
          cost: 0,
          desc: 'Earmarks buffer for unexpected mishaps and car/phone troubles.',
          effect: () => showToast('₹500 safely allocated to your Emergency Shield!'),
        },
        {
          label: 'Consult Student Financial Advisor (Free)',
          cost: 0,
          desc: 'Learn high-yield compound interest concepts and budgeting frameworks.',
          effect: () => showToast('Financial tip unlocked: Keep 3x monthly expenses as liquid emergency funds!'),
        },
      ],
    },
    Home: {
      title: 'Dormitory Room / Home',
      icon: <HomeIcon className="w-5 h-5 text-indigo-400" />,
      description: 'Your tranquil sanctuary. Rest, meal prep, and review today’s financial decisions.',
      actions: [
        {
          label: 'Meal Prep Batch Cooking for Tomorrow',
          cost: 0,
          desc: 'Prepare tomorrow lunch so you will not be tempted to buy expensive fast food.',
          effect: () => showToast('Tomorrow lunch prepped! Anticipated ₹180 saved.'),
        },
        {
          label: 'Plan Tomorrow’s Budget Cap (₹250 limit)',
          cost: 0,
          desc: 'Intentional day planning creates peace of mind and discipline.',
          effect: () => showToast('Daily cap locked at ₹250!'),
        },
      ],
    },
  };

  const currentLocationData = selectedLocation ? locationDetails[selectedLocation] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title & Exploration Prompt */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Moneyverse — 3D World Exploration
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Click on any building or badge in the 3D scene to make choices that impact your balance.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 transition-all duration-150 flex items-center gap-2 cursor-pointer w-fit hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journey</span>
        </button>
      </div>

      {/* Main Grid: Real 3D Canvas + Location Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 3D WebGL Island Scene */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
            <ThreeMoneyverse
              interactive={true}
              selectedLocation={selectedLocation}
              onSelectLocation={(loc) => setSelectedLocation(loc)}
              showSpeechBubble={false}
              className="w-full h-full"
            />
          </div>

          <div className="glass-panel p-3 rounded-2xl text-center border border-white/5 text-xs text-slate-300">
            Move pointer to rotate camera · Click buildings to inspect financial decisions
          </div>
        </div>

        {/* Location Decision Drawer */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl text-left flex flex-col justify-between min-h-[460px]">
          <AnimatePresence mode="wait">
            {currentLocationData ? (
              <motion.div
                key={selectedLocation}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Location Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {currentLocationData.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">
                      Location Focus
                    </span>
                    <h3 className="font-display font-bold text-base text-white">
                      {currentLocationData.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {currentLocationData.description}
                </p>

                {/* Location Action Choices */}
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Available Decisions
                  </span>

                  {currentLocationData.actions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={act.effect}
                      className="w-full p-3.5 rounded-2xl bg-[#131a38] hover:bg-[#1a244e] border border-white/10 hover:border-pink-500/40 text-left transition-all duration-150 group flex flex-col gap-1 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-100 group-hover:text-pink-300 transition-colors duration-150">
                          {act.label}
                        </span>
                        {act.cost > 0 ? (
                          <span className="font-mono font-bold text-rose-400">
                            -₹{act.cost}
                          </span>
                        ) : (
                          <span className="font-mono font-bold text-emerald-400">
                            Free
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {act.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Click a building on the 3D map to explore.
              </div>
            )}
          </AnimatePresence>

          {/* Quick Stats at Bottom */}
          <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>Remaining Funds:</span>
            <span className="font-bold text-cyan-300">
              <AnimatedRupee amount={remainingBudget} />
            </span>
          </div>
        </div>
      </div>

      {/* Floating Action Toast with AnimatePresence */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 bg-[#16224c]/95 border border-pink-500/40 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <CheckCircle className="w-5 h-5 text-pink-400 shrink-0" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
