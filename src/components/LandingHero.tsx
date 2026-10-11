import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ThreeMoneyverse } from './ThreeMoneyverse';
import { CinematicHeroScene } from './Artwork/CinematicHeroScene';
import { ProductIllustration } from './Artwork/ProductIllustration';
import { DamagedPhoneIllustration } from './Artwork/DamagedPhoneIllustration';
import { AnimatedRupee } from './AnimatedRupee';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Compass,
  ShoppingBag,
  Receipt,
  PieChart,
  ShieldCheck,
  AlertTriangle,
  Check,
  RotateCcw,
  Coffee,
  Film,
  Zap,
  TrendingDown,
  TrendingUp,
  ChevronDown,
  GraduationCap,
  Building2,
  Home,
  CheckCircle2,
  Globe2,
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  const {
    setCurrentScreen,
    remainingBudget,
    totalSpent,
    spendingPercentage,
    currentDay,
    addExpense,
    triggerEventModal,
    transactions,
  } = useGame();

  // Selected landmark for Section 2 (Explorable Moneyverse)
  const [activeLandmark, setActiveLandmark] = useState<'College' | 'Cafe' | 'Bank' | 'Home' | 'Market'>('College');

  // Interactive Consequence Simulator (Section 3)
  const [selectedConsequenceIndex, setSelectedConsequenceIndex] = useState<number>(0);
  const [simulatedPurchaseState, setSimulatedPurchaseState] = useState<'preview' | 'applied' | 'cancelled'>('preview');

  // Crisis stage option (Section 4)
  const [selectedCrisisChoice, setSelectedCrisisChoice] = useState<'official' | 'frugal' | 'borrow'>('frugal');

  // 3 Test Dilemmas for Section 3 Consequence Engine
  const testDilemmas = [
    {
      id: 'latte',
      name: 'Artisanal Cafe Latte',
      price: 120,
      category: 'Food' as const,
      imageType: 'coffee' as const,
      tag: 'Daily Indulgence',
      desc: 'Hot specialty double-shot latte at the campus quad cafe.',
      impact: 'Consumes ₹120. Over 30 days, daily coffee equals ₹3,600 (36% of your entire budget).',
      safeRating: 'Low risk if occasional, critical if daily habit',
    },
    {
      id: 'movie',
      name: 'Friday Blockbuster Night',
      price: 450,
      category: 'Lifestyle' as const,
      imageType: 'movie' as const,
      tag: 'Weekend Social',
      desc: 'IMAX premiere ticket with drinks and shared caramel popcorn.',
      impact: 'Takes 4.5% of your starter capital in a single evening.',
      safeRating: 'Moderate social expense — requires skipping 2 takeout meals',
    },
    {
      id: 'sneakers',
      name: 'Pastel Streetwear Sneakers',
      price: 2999,
      category: 'Lifestyle' as const,
      imageType: 'shoes' as const,
      tag: 'Impulse Temptation',
      desc: 'Limited seasonal sneaker pair on student clearance sale.',
      impact: 'Wipes out 30% of your entire monthly fund instantly.',
      safeRating: 'Severe risk — destroys your emergency buffer until Day 30',
    },
  ];

  const activeDilemma = testDilemmas[selectedConsequenceIndex];
  const projectedBalance = Math.max(0, remainingBudget - activeDilemma.price);
  const daysRemaining = Math.max(1, 30 - currentDay);
  const currentDailyBudget = Math.round(remainingBudget / daysRemaining);
  const projectedDailyBudget = Math.round(projectedBalance / daysRemaining);

  // Apply dilemma directly to GameContext
  const handleApplyExpense = () => {
    addExpense({
      name: activeDilemma.name,
      amount: activeDilemma.price,
      category: activeDilemma.category,
      note: 'Simulated decision from Consequence Engine',
    });
    setSimulatedPurchaseState('applied');
    setTimeout(() => {
      setSimulatedPurchaseState('preview');
    }, 3500);
  };

  const handleCancelExpense = () => {
    setSimulatedPurchaseState('cancelled');
    setTimeout(() => {
      setSimulatedPurchaseState('preview');
    }, 2500);
  };

  // Landmark Dossier data for Section 2
  const landmarkDetails = {
    College: {
      title: 'University Campus & Lecture Halls',
      icon: <GraduationCap className="w-5 h-5 text-amber-400" />,
      tag: 'Academic Core',
      theme: 'text-amber-400',
      borderGlow: 'border-amber-400/40',
      dilemma: 'New Reference Books (₹1,270) vs Shared Library Notes (₹0)',
      analysis:
        'College expenses sneak up on you with project printing, textbook kits, and exam materials. Students who borrow or purchase second-hand notes save upwards of ₹3,000 every semester.',
      keyTakeaway: 'Always check if study materials exist in the library archive before swiping your card.',
    },
    Cafe: {
      title: 'Quadside Cafe & Social Lounge',
      icon: <Coffee className="w-5 h-5 text-pink-400" />,
      tag: 'Discretionary Food',
      theme: 'text-pink-400',
      borderGlow: 'border-pink-400/40',
      dilemma: 'Daily Latte Rush (₹120) vs Hostel Electric Kettle Tea (₹15)',
      analysis:
        'A seemingly harmless ₹120 daily coffee compounds to ₹3,600 over 30 days — more than one-third of your total ₹10,000 monthly allowance.',
      keyTakeaway: 'Reserve the barista cafe for study groups or weekend treats; brew daily tea in your dorm.',
    },
    Bank: {
      title: 'City Financial Vault & Reserve',
      icon: <Building2 className="w-5 h-5 text-indigo-400" />,
      tag: 'Emergency Fortress',
      theme: 'text-indigo-400',
      borderGlow: 'border-indigo-400/40',
      dilemma: 'Locking ₹2,000 Emergency Shield vs Living with ₹0 Buffer',
      analysis:
        'Without an emergency reserve, the first cracked phone or medical prescription forces you into high-stress debt. A 20% untouchable buffer guarantees survival.',
      keyTakeaway: 'The moment Day 1 starts, mentally wall off ₹2,000 as invisible money for true emergencies.',
    },
    Home: {
      title: 'Student Dormitory & Residence',
      icon: <Home className="w-5 h-5 text-cyan-400" />,
      tag: 'Fixed Overhead',
      theme: 'text-cyan-400',
      borderGlow: 'border-cyan-400/40',
      dilemma: 'Paying Dorm Rent & Wi-Fi on Day 1 (₹900) vs Delaying Bill',
      analysis:
        'Hostel utility charges and shared Wi-Fi can accumulate late fee penalties if ignored. Paying fixed commitments first reveals your true discretionary runway.',
      keyTakeaway: 'Clear essential fixed costs immediately on Day 1 to avoid deceptive balance illusions.',
    },
    Market: {
      title: 'Old Town Bazaar & Groceries',
      icon: <ShoppingBag className="w-5 h-5 text-purple-400" />,
      tag: 'Frugal Essentials',
      theme: 'text-purple-400',
      borderGlow: 'border-purple-400/40',
      dilemma: 'Weekly Wholesale Groceries (₹250) vs Daily Midnight Takeout (₹700)',
      analysis:
        'A single grocery run with staple fruits, oats, bread, and milk covers breakfast and snacks for an entire week for less than the cost of one late-night delivery.',
      keyTakeaway: 'Batch-shop staples on Sunday afternoons when local vendors discount fresh produce.',
    },
  };

  const activeDossier = landmarkDetails[activeLandmark];

  // Category breakdown calculations for Section 5 (Financial Story)
  const categoryTotals: Record<string, number> = {
    Food: 0,
    Essentials: 0,
    Lifestyle: 0,
    Travel: 0,
  };
  transactions.forEach((tx) => {
    if (categoryTotals[tx.category] !== undefined) {
      categoryTotals[tx.category] += tx.amount;
    }
  });

  return (
    <div className="w-full flex flex-col relative text-slate-100 selection:bg-pink-500 selection:text-white">
      {/* =========================================================================
          SECTION 1: UNFORGETTABLE CINEMATIC HERO
          ========================================================================= */}
      <section className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
        {/* Restored Original Cinematic Sunset Sky, Clouds, Sun Bloom & Horizon */}
        <CinematicHeroScene blendWith3D={true} />

        {/* 2-Column Desktop Grid Container */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 relative">
          {/* LEFT COLUMN: Clear Typography, Hierarchy & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left"
          >
            {/* Small Introductory Eyebrow */}
            <span className="text-[11px] sm:text-xs uppercase tracking-widest text-pink-300 font-bold mb-3.5 flex items-center gap-2 drop-shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>YOUR 30-DAY MONEY ADVENTURE</span>
            </span>

            {/* Oversized BROKEOLOGY Heading */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none mb-4 text-glow-pink drop-shadow-2xl">
              Broke<span className="text-pink-400">ology</span>
            </h1>

            {/* Central Concept Tagline */}
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-100 mb-4 leading-tight drop-shadow-lg">
              Your money is a world.<br />
              <span className="text-pink-400">Every decision changes it.</span>
            </h2>

            {/* Concise Description */}
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 max-w-md drop-shadow">
              Manage ₹10,000 over 30 intense days. Face unexpected repairs, social FOMO, and daily trade-offs
              while your decisions physically shape your floating Moneyverse.
            </p>

            {/* Call-to-Actions */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
              {/* Primary Pink CTA */}
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="btn-glow-pink px-8 py-4 rounded-full text-white font-display font-bold text-sm flex items-center gap-2.5 cursor-pointer shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Secondary Scroll Anchor */}
              <a
                href="#moneyverse-world"
                className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-pink-300 transition-colors duration-150 cursor-pointer underline underline-offset-4 decoration-pink-500/50 hover:decoration-pink-400 flex items-center gap-1.5"
              >
                <span>Explore the Storyline</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Feature Badges Below Main CTA */}
            <div className="pt-6 border-t border-white/15 w-full flex items-center gap-2.5 sm:gap-3 text-xs text-slate-300">
              <span className="font-medium text-slate-200">Interactive 3D Realm</span>
              <span className="text-pink-400/60 font-bold">·</span>
              <span className="font-medium text-slate-200">Consequence Engine</span>
              <span className="text-pink-400/60 font-bold">·</span>
              <span className="font-medium text-slate-200">Crisis Resilience</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 3D Miniature Floating World with Translucent Glass Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex justify-center w-full"
          >
            {/* Floating Glass Badge (Top-Right) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
              <div className="glass-panel-glow px-4 sm:px-5 py-2.5 rounded-2xl border border-pink-400/50 shadow-2xl backdrop-blur-xl text-center">
                <div className="text-lg sm:text-xl font-extrabold font-display text-white tracking-tight flex items-center justify-center gap-1">
                  <span className="text-pink-400 font-bold">₹</span>10,000
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-300 font-bold mt-0.5">
                  30 Days Challenge
                </div>
              </div>
            </div>

            {/* Interactive 3D WebGL Moneyverse Scene */}
            <div className="w-full aspect-[4/3] max-h-[540px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#181138]/50 via-[#100c28]/35 to-[#240e34]/60 backdrop-blur-md border border-pink-400/35 shadow-2xl shadow-pink-500/20 relative group">
              <ThreeMoneyverse
                interactive={true}
                onSelectLocation={(loc) => {
                  setActiveLandmark(loc);
                  const el = document.getElementById('moneyverse-world');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                showSpeechBubble={false}
                className="w-full h-full"
              />

              {/* Caption beneath 3D canvas */}
              <div className="absolute bottom-3 left-4 text-[11px] text-slate-200 font-mono pointer-events-none bg-[#090e24]/75 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                <span>Interactive 3D Canvas · Click buildings to inspect</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "YOUR MONEY, YOUR WORLD" (EXPLORABLE MONEYVERSE DIORAMA)
          ========================================================================= */}
      <section
        id="moneyverse-world"
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10 bg-gradient-to-b from-[#080b19] via-[#0d122c] to-[#080c1d]"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-bold mb-2 inline-flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-pink-400" />
              <span>THE LIVING ISLAND</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4 text-glow-pink">
              Your Money, Your World
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every building on this floating diorama represents an anchor of student survival. Select a zone to
              shift the camera, uncover hidden financial dilemmas, and learn victory strategies.
            </p>
          </div>

          {/* Interactive World Grid: 3D Canvas + Live Zone Dossier */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Focused 3D World with Location Tabs */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-pink-400/30 shadow-2xl relative">
                <ThreeMoneyverse
                  interactive={true}
                  selectedLocation={activeLandmark}
                  onSelectLocation={(loc) => setActiveLandmark(loc)}
                  className="w-full h-full"
                />

                {/* Floating active landmark badge */}
                <div className="absolute top-4 left-4 bg-[#090d22]/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                  <span>Viewing: {activeLandmark}</span>
                </div>
              </div>

              {/* Location Selectors */}
              <div className="grid grid-cols-5 gap-2 w-full">
                {(['College', 'Cafe', 'Bank', 'Home', 'Market'] as const).map((loc) => {
                  const isActive = activeLandmark === loc;
                  return (
                    <button
                      key={loc}
                      onClick={() => setActiveLandmark(loc)}
                      className={`py-2 px-1 sm:px-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
                        isActive
                          ? 'btn-glow-pink text-white shadow-lg scale-102'
                          : 'glass-panel text-slate-300 hover:text-white hover:border-pink-400/40'
                      }`}
                    >
                      <span>{loc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Zone Dossier & Financial Dilemma */}
            <div className="lg:col-span-5 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLandmark}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`glass-panel-glow p-6 sm:p-8 rounded-3xl border ${activeDossier.borderGlow} shadow-2xl text-left relative overflow-hidden`}
                >
                  {/* Eyebrow badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10 flex items-center gap-1.5">
                      {activeDossier.icon}
                      <span>{activeDossier.tag}</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Zone 0{['College', 'Cafe', 'Bank', 'Home', 'Market'].indexOf(activeLandmark) + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-display font-extrabold text-white mb-3">
                    {activeDossier.title}
                  </h3>

                  {/* Dilemma Callout Box */}
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 mb-5">
                    <div className="text-[11px] uppercase tracking-wider text-pink-400 font-bold mb-1">
                      Critical Financial Dilemma
                    </div>
                    <div className="text-sm font-semibold text-slate-100">
                      {activeDossier.dilemma}
                    </div>
                  </div>

                  {/* Analysis Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {activeDossier.analysis}
                  </p>

                  {/* Strategic Key Takeaway */}
                  <div className="pt-4 border-t border-white/10 flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white">Rule of Thumb: </span>
                      {activeDossier.keyTakeaway}
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => setCurrentScreen('dashboard')}
                      className="btn-glow-pink px-5 py-2.5 rounded-full text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Simulate in Journey</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href="#consequence-engine"
                      className="text-xs font-semibold text-slate-400 hover:text-pink-300 transition-colors"
                    >
                      Test in Consequence Engine ↓
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "EVERY CHOICE CHANGES YOUR WORLD" (CONSEQUENCE ENGINE)
          ========================================================================= */}
      <section
        id="consequence-engine"
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10 bg-[#060815]"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-bold mb-2 inline-flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-pink-400" />
              <span>THE LIVING CONSEQUENCE ENGINE</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4 text-glow-pink">
              Every Choice Changes Your World
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In Brokeology, purchases are not abstract numbers. They deplete your emergency runway and change
              your survival rating. Test an expense below and watch the ripple effects live.
            </p>
          </div>

          {/* Interactive Consequence Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 3 Realistic Dilemma Selection Cards */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 text-left">
                Select a Purchase Temptation:
              </span>
              {testDilemmas.map((dilemma, idx) => {
                const isSelected = selectedConsequenceIndex === idx;
                return (
                  <button
                    key={dilemma.id}
                    onClick={() => {
                      setSelectedConsequenceIndex(idx);
                      setSimulatedPurchaseState('preview');
                    }}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 border ${
                      isSelected
                        ? 'glass-panel-glow border-pink-400/60 shadow-xl scale-101'
                        : 'glass-panel border-white/5 hover:border-white/20 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                        {dilemma.imageType === 'coffee' && <Coffee className="w-6 h-6 text-pink-400" />}
                        {dilemma.imageType === 'movie' && <Film className="w-6 h-6 text-purple-400" />}
                        {dilemma.imageType === 'shoes' && <ShoppingBag className="w-6 h-6 text-cyan-400" />}
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider font-extrabold text-pink-400">
                          {dilemma.tag}
                        </div>
                        <div className="text-sm font-bold text-white leading-tight">
                          {dilemma.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {dilemma.desc.slice(0, 45)}...
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-extrabold font-display text-white">
                        ₹{dilemma.price}
                      </div>
                      <div className="text-[10px] text-slate-400">One-time</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Live Before-and-After Consequence Display Card */}
            <div className="lg:col-span-7">
              <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border border-pink-500/35 shadow-2xl text-left relative">
                {/* Header of Simulator */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-pink-400 font-extrabold">
                      Real-Time Consequence Preview
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                      Evaluating: {activeDilemma.name} (₹{activeDilemma.price})
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-black bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    Day {currentDay} of 30
                  </span>
                </div>

                {/* Comparison Gauge Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Current Baseline Card */}
                  <div className="bg-[#0e142e] p-4 rounded-2xl border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                      CURRENT BASELINE
                    </span>
                    <div className="text-2xl font-extrabold font-display text-emerald-400 flex items-center gap-1">
                      <span>₹</span>
                      <AnimatedRupee amount={remainingBudget} />
                    </div>
                    <div className="text-xs text-slate-300 mt-2 flex flex-col gap-1">
                      <div>Daily Safe Burn: <span className="font-bold text-white">₹{currentDailyBudget}/day</span></div>
                      <div>Days Remaining: <span className="font-bold text-white">{daysRemaining} days</span></div>
                      <div>Status: <span className="text-emerald-400 font-bold">Safe Buffer Intact</span></div>
                    </div>
                  </div>

                  {/* Projected Consequence Card */}
                  <div className="bg-[#191330] p-4 rounded-2xl border border-pink-400/30">
                    <span className="text-[10px] uppercase tracking-wider text-pink-400 font-bold block mb-1">
                      PROJECTED AFTER EXPENSE
                    </span>
                    <div className="text-2xl font-extrabold font-display text-pink-400 flex items-center gap-1">
                      <span>₹</span>
                      <AnimatedRupee amount={projectedBalance} />
                      <span className="text-xs text-rose-400 font-normal ml-1">(-₹{activeDilemma.price})</span>
                    </div>
                    <div className="text-xs text-slate-300 mt-2 flex flex-col gap-1">
                      <div>Projected Burn: <span className="font-bold text-pink-300">₹{projectedDailyBudget}/day</span></div>
                      <div>Net Impact: <span className="font-bold text-rose-400">-{Math.round((activeDilemma.price / remainingBudget) * 100)}% of balance</span></div>
                      <div>Status: <span className="text-amber-400 font-bold">{activeDilemma.safeRating.slice(0, 24)}...</span></div>
                    </div>
                  </div>
                </div>

                {/* Analysis Note */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                  <span className="font-bold text-pink-400">Financial Impact: </span>
                  {activeDilemma.impact}
                </div>

                {/* Interactive Action Controls */}
                <div className="flex flex-wrap items-center gap-4">
                  {simulatedPurchaseState === 'applied' ? (
                    <div className="px-6 py-3.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Applied to Active Challenge! Balance updated in Game Context.</span>
                    </div>
                  ) : simulatedPurchaseState === 'cancelled' ? (
                    <div className="px-6 py-3.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 font-bold text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-slate-400" />
                      <span>Decision Cancelled. Balance preserved at ₹{remainingBudget}.</span>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleApplyExpense}
                        className="btn-glow-pink px-6 py-3.5 rounded-full text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>Confirm & Apply Expense (₹{activeDilemma.price})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={handleCancelExpense}
                        className="px-5 py-3.5 rounded-full glass-panel text-slate-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Walk Away (Preserve ₹{remainingBudget})
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: "LIFE DOESN'T FOLLOW YOUR BUDGET" (UNEXPECTED CRISIS STAGE)
          ========================================================================= */}
      <section
        id="crisis-stage"
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10 bg-gradient-to-b from-[#080816] via-[#150a1f] to-[#0a0715]"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-rose-400 font-bold mb-2 inline-flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>THE CRISIS SIMULATOR</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4 text-glow-pink">
              Life Doesn&apos;t Follow Your Budget
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In the real world, emergencies strike without warning. When your phone screen breaks on Day 14,
              how do you solve it without forfeiting the 30-Day challenge?
            </p>
          </div>

          {/* Asymmetric Cinematic Crisis Layout */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Dramatic Artwork with cracked phone */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-sm aspect-square rounded-3xl bg-radial from-rose-500/15 via-[#1a0c28]/40 to-transparent p-6 flex flex-col items-center justify-center relative">
                <DamagedPhoneIllustration />

                {/* Floating crisis alert chip */}
                <div className="absolute bottom-4 bg-[#1e0a18]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-rose-500/40 text-center shadow-xl">
                  <div className="text-[10px] uppercase tracking-wider text-rose-400 font-extrabold">
                    Unplanned Crisis
                  </div>
                  <div className="text-xs font-bold text-white">
                    Shattered OLED Screen (-₹1,500 dilemma)
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Three Strategic Decisions */}
            <div className="lg:col-span-7 flex flex-col gap-4 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Choose Your Resolution Strategy:
              </span>

              {/* Option 1: Official Brand Replacement */}
              <div
                onClick={() => setSelectedCrisisChoice('official')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedCrisisChoice === 'official'
                    ? 'glass-panel-glow border-rose-500/70 shadow-xl scale-101'
                    : 'glass-panel border-white/5 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-extrabold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-400" />
                    <span>Authorized Service Center Replacement</span>
                  </span>
                  <span className="font-extrabold font-display text-rose-400 text-base">₹1,500</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Original OEM display with official warranty. Consumes 15% of your starter budget and cuts
                  your emergency buffer in half, but provides total peace of mind.
                </p>
              </div>

              {/* Option 2: Frugal Third-Party Fix */}
              <div
                onClick={() => setSelectedCrisisChoice('frugal')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedCrisisChoice === 'frugal'
                    ? 'glass-panel-glow border-amber-400/70 shadow-xl scale-101'
                    : 'glass-panel border-white/5 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Local Market Glass Patch & Tempered Shield</span>
                  </span>
                  <span className="font-extrabold font-display text-amber-400 text-base">₹450</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Smart student compromise. Fixes touchscreen responsiveness and saves ₹1,050 for food and transit,
                  with slight discoloration at the display edge.
                </p>
              </div>

              {/* Option 3: Borrow Friend's Spare Backup */}
              <div
                onClick={() => setSelectedCrisisChoice('borrow')}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  selectedCrisisChoice === 'borrow'
                    ? 'glass-panel-glow border-cyan-400/70 shadow-xl scale-101'
                    : 'glass-panel border-white/5 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-extrabold text-white flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-cyan-400" />
                    <span>Borrow Friend&apos;s Spare Handset for 2 Weeks</span>
                  </span>
                  <span className="font-extrabold font-display text-cyan-400 text-base">₹0</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Radical financial resilience. Inconvenient, slightly laggy, but preserves 100% of your capital
                  until you finish the 30-day survival gauntlet.
                </p>
              </div>

              {/* Launch In-Game Event Modal Button */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={triggerEventModal}
                  className="btn-glow-pink px-6 py-3 rounded-full text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Trigger In-Game Random Event</span>
                </button>
                <span className="text-xs text-slate-400 font-mono">
                  Tests unpredictable dynamic events in active game
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: "SEE YOUR FINANCIAL STORY" (NARRATIVE LEDGER)
          ========================================================================= */}
      <section
        id="financial-story"
        className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/10 bg-[#070a1a]"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-pink-400 font-bold mb-2 inline-flex items-center gap-2">
              <PieChart className="w-3.5 h-3.5 text-pink-400" />
              <span>LIVING NARRATIVE</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4 text-glow-pink">
              See Your Financial Story
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Every expense you record tells the story of your priorities. Here is your actual live simulation data
              translated into survival metrics.
            </p>
          </div>

          {/* 4 Oversized Big Numbers */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            <div className="glass-panel p-5 rounded-3xl border border-white/10 text-left">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                STARTING CAPITAL
              </span>
              <div className="text-3xl font-extrabold font-display text-white">₹10,000</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">Baseline Day 1</div>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-white/10 text-left">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                CURRENT SPENT
              </span>
              <div className="text-3xl font-extrabold font-display text-rose-400 flex items-center gap-1">
                <span>₹</span>
                <AnimatedRupee amount={totalSpent} />
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">{spendingPercentage}% of total</div>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-white/10 text-left">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                REMAINING RUNWAY
              </span>
              <div className="text-3xl font-extrabold font-display text-emerald-400 flex items-center gap-1">
                <span>₹</span>
                <AnimatedRupee amount={remainingBudget} />
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">{100 - spendingPercentage}% liquid buffer</div>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-white/10 text-left">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                DAILY ALLOWANCE
              </span>
              <div className="text-3xl font-extrabold font-display text-pink-400 flex items-center gap-1">
                <span>₹</span>
                <AnimatedRupee amount={currentDailyBudget} />
              </div>
              <div className="text-xs text-slate-400 mt-1 font-mono">For next {daysRemaining} days</div>
            </div>
          </div>

          {/* Breakdown & Dynamic AI Wisdom Card */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Category breakdown visual bars */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-left flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-sm font-bold text-white">Itemized Category Distribution</span>
                <span className="text-xs text-slate-400 font-mono">Actual Transactions ({transactions.length})</span>
              </div>

              {Object.entries(categoryTotals).map(([cat, amount]) => {
                const pct = remainingBudget + totalSpent > 0 ? Math.round((amount / (remainingBudget + totalSpent)) * 100) : 0;
                return (
                  <div key={cat} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-200">{cat}</span>
                      <span className="text-white font-mono">
                        ₹{amount} <span className="text-slate-400 font-normal">({pct}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          cat === 'Food'
                            ? 'bg-gradient-to-r from-pink-500 to-rose-400'
                            : cat === 'Essentials'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-400'
                            : cat === 'Lifestyle'
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-400'
                            : 'bg-gradient-to-r from-amber-500 to-orange-400'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(5, pct))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic AI Wisdom Card */}
            <div className="lg:col-span-5 glass-panel-glow p-6 sm:p-8 rounded-3xl border border-pink-500/35 text-left flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold block mb-2">
                  FINANCIAL WISDOM ADVICE
                </span>
                <h4 className="text-xl font-display font-extrabold text-white mb-3">
                  {spendingPercentage < 30
                    ? 'Safe Frugal Pace'
                    : spendingPercentage < 65
                    ? 'Moderate Discipline Needed'
                    : 'Critical Burn Rate Alert'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {spendingPercentage < 30
                    ? `You have spent ₹${totalSpent} out of ₹10,000. Your daily safe limit is ₹${currentDailyBudget}. Maintain this rhythm by packing lunch and avoiding impulsive weekend sales.`
                    : spendingPercentage < 65
                    ? `You have utilized ${spendingPercentage}% of your total challenge fund. You have ₹${remainingBudget} remaining for ${daysRemaining} days. Limit cafe visits to twice a week to maintain your safety shield.`
                    : `Caution: Over ${spendingPercentage}% of your capital has been consumed. Delay all lifestyle expenses immediately to prevent running broke before Day 30.`}
                </p>
              </div>

              <button
                onClick={() => setCurrentScreen('tracker')}
                className="w-full py-3 rounded-2xl glass-panel text-xs font-bold text-slate-200 hover:text-white hover:border-pink-400/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>View Full Expense Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: "YOUR 30-DAY JOURNEY AWAITS" (MODE GATEWAY & FINAL CTA)
          ========================================================================= */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 relative border-t border-white/10 bg-gradient-to-b from-[#070a1a] via-[#100b24] to-[#080c1e]">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>READY TO PLAY?</span>
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight mb-4 text-glow-pink">
            The Moneyverse Awaits You
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-12">
            Choose your mode and step into the 30-day financial survival game. Can you protect your ₹10,000 fund
            and reach Day 30 with your savings crown intact?
          </p>

          {/* 4 Interactive Game Gateways */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {/* 1. Journey / Dashboard */}
            <div
              onClick={() => setCurrentScreen('dashboard')}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-pink-400/50 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center mb-4 text-pink-400 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Day Journey</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Active Day 3 timeline, daily checklist, and island command center.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-pink-400">
                <span>Enter Journey →</span>
              </div>
            </div>

            {/* 2. Shop */}
            <div
              onClick={() => setCurrentScreen('shop')}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-pink-400/50 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Campus Shop</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Simulated storefront with 6 illustrated products, cart drawer & checkout.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <span>Browse Shop →</span>
              </div>
            </div>

            {/* 3. Expense Tracker */}
            <div
              onClick={() => setCurrentScreen('tracker')}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-pink-400/50 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                  <Receipt className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Expense Tracker</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-time ledger, category filters, interactive donut chart & custom entries.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-purple-400">
                <span>Open Ledger →</span>
              </div>
            </div>

            {/* 4. 3D World Exploration */}
            <div
              onClick={() => setCurrentScreen('moneyverse')}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-pink-400/50 transition-all duration-200 cursor-pointer text-left flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-400 group-hover:scale-110 transition-transform">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">3D Moneyverse</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Full-screen Three.js exploration with interactive camera panning and hotspots.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <span>Explore World →</span>
              </div>
            </div>
          </div>

          {/* Master CTA Button */}
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="btn-glow-pink px-10 py-5 rounded-full text-white font-display font-extrabold text-base flex items-center gap-3 cursor-pointer shadow-2xl hover:-translate-y-1 active:translate-y-0"
          >
            <span>Launch Day {currentDay} Survival Gauntlet</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </section>
    </div>
  );
};
