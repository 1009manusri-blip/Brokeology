import React, { useState } from 'react';
import { useGame, INITIAL_PRODUCTS } from '../context/GameContext';
import { ProductIllustration } from './Artwork/ProductIllustration';
import { AnimatedRupee } from './AnimatedRupee';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Plus,
  Trash2,
  CheckCircle,
  X,
  AlertTriangle,
} from 'lucide-react';

export const Shop: React.FC = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    confirmPurchase,
    cancelPurchase,
    remainingBudget,
  } = useGame();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showSimulatorModal, setShowSimulatorModal] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [lastPurchasedTotal, setLastPurchasedTotal] = useState<number>(0);

  const categories = ['All', 'Food', 'Travel', 'Lifestyle', 'Essentials'];

  const filteredProducts =
    activeCategory === 'All'
      ? INITIAL_PRODUCTS
      : INITIAL_PRODUCTS.filter((p) => p.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const projectedBalance = remainingBudget - cartTotal;
  const isOverBudget = projectedBalance < 0;

  const handleConfirm = () => {
    setLastPurchasedTotal(cartTotal);
    confirmPurchase();
    setShowSimulatorModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleCancel = () => {
    cancelPurchase();
    setShowSimulatorModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Row: Title & Cart Button Matching Screen 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Shop
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Choose what you need (and what you don&apos;t).
          </p>
        </div>

        {/* Cart Pill Indicator Matching Screen 3 */}
        <button
          onClick={() => setShowSimulatorModal(true)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
            cart.length > 0
              ? 'btn-glow-pink text-white shadow-xl'
              : 'glass-panel text-slate-200 border-white/10 hover:border-pink-400/40'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart ({cart.length})</span>
          {cart.length > 0 && (
            <span className="font-mono text-pink-100 ml-1">· ₹{cartTotal.toLocaleString()}</span>
          )}
        </button>
      </div>

      {/* Category Filter Pills Matching Screen 3 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/35 border border-pink-300/40'
                  : 'glass-pill text-slate-300 hover:text-white hover:bg-white/10 border-white/10'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Illustrated Product Cards Grid (Matching Screen 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const inCartCount = cart.filter((item) => item.id === product.id).length;
          return (
            <div
              key={product.id}
              className="glass-panel interactive-card p-4 rounded-3xl flex flex-col justify-between border border-white/10 shadow-xl group"
            >
              <div>
                {/* 3D Illustrated Product Graphic with subtle micro-hover zoom */}
                <div className="overflow-hidden rounded-2xl mb-3">
                  <div className="group-hover:scale-[1.025] transition-transform duration-300 ease-out">
                    <ProductIllustration type={product.imageType} className="w-full h-40" />
                  </div>
                </div>

                {/* Title & Price */}
                <div className="flex items-start justify-between gap-2 text-left mb-1">
                  <h3 className="font-display font-bold text-sm text-white group-hover:text-pink-300 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <div className="font-mono font-black text-sm text-pink-400 whitespace-nowrap">
                    ₹{product.price.toLocaleString()}
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 text-left line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Button: Glowing Pink + Add */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#18234c] hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white text-slate-100 border border-white/10 hover:border-pink-300/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-md hover:shadow-pink-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add</span>
                </button>

                {inCartCount > 0 && (
                  <span className="w-8 h-8 rounded-xl bg-pink-500/25 border border-pink-400/50 text-pink-300 text-xs font-black flex items-center justify-center font-mono shadow-inner animate-scale-in">
                    {inCartCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Success Toast with AnimatePresence */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-600/95 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border border-emerald-400/40"
          >
            <CheckCircle className="w-5 h-5 text-emerald-200 shrink-0" />
            <span className="text-xs font-bold">
              Purchase confirmed! ₹{lastPurchasedTotal.toLocaleString()} deducted.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spending Simulator Modal with Elegant Backdrop & Scale Entrance */}
      <AnimatePresence>
        {showSimulatorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dimmed backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={handleCancel}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel-glow w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-pink-500/40 text-left shadow-2xl relative z-10"
            >
              <button
                onClick={handleCancel}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors duration-150 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white">
                    Spending Simulator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Simulating does not deduct funds until confirmed.
                  </p>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs">
                  Your cart is empty. Add items from the shop to test financial choices!
                </div>
              ) : (
                <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1 my-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs transition-colors duration-150 hover:bg-white/10"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100">{item.name}</span>
                        <span className="text-[10px] text-slate-400 bg-white/10 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-pink-300 font-bold">₹{item.price.toLocaleString()}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors duration-150 cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Financial Projection Card */}
              <div className="bg-[#0b1024] p-4 rounded-2xl border border-white/10 my-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Current Balance:</span>
                  <span className="font-bold text-white">
                    <AnimatedRupee amount={remainingBudget} />
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cart Total:</span>
                  <span className="font-mono font-bold text-rose-400">
                    -₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold">
                  <span className="text-slate-200">Projected Balance:</span>
                  <span
                    className={`font-mono text-sm ${
                      isOverBudget ? 'text-red-400' : 'text-cyan-400'
                    }`}
                  >
                    ₹{projectedBalance.toLocaleString()}
                  </span>
                </div>
              </div>

              {isOverBudget && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>Exceeds remaining ₹10,000 budget!</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all duration-150 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  Cancel Simulation
                </button>

                <button
                  disabled={cart.length === 0}
                  onClick={handleConfirm}
                  className="flex-1 btn-glow-pink py-3 px-4 rounded-xl text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg"
                >
                  <span>Confirm Purchase (-₹{cartTotal.toLocaleString()})</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
