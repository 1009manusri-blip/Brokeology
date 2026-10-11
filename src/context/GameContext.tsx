import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { GameState, Transaction, ShopProduct, DayTask, ScreenId, ExpenseCategory } from '../types/game';
import { calculateFinancialMetrics, validateExpenseInput, FinancialMetrics } from '../utils/finance';
import { soundManager } from '../utils/audio';

const STORAGE_KEY = 'brokeology_game_state_v1';

export const INITIAL_PRODUCTS: ShopProduct[] = [
  {
    id: 'prod-coffee',
    name: 'Cafe Coffee',
    category: 'Food',
    price: 120,
    description: 'Hot specialty latte with artisanal foam at the college cafe.',
    imageType: 'coffee',
  },
  {
    id: 'prod-groceries',
    name: 'Groceries',
    category: 'Essentials',
    price: 250,
    description: 'Weekly fresh fruit, veggies, bread, and farm milk carton.',
    imageType: 'groceries',
  },
  {
    id: 'prod-movie',
    name: 'Movie Ticket',
    category: 'Lifestyle',
    price: 180,
    description: 'Friday blockbuster premiere ticket with friends.',
    imageType: 'movie',
  },
  {
    id: 'prod-shoes',
    name: 'Nike Shoes',
    category: 'Lifestyle',
    price: 2999,
    description: 'Trendy pastel sneaker pair on seasonal discount.',
    imageType: 'shoes',
  },
  {
    id: 'prod-metro',
    name: 'Metro Pass',
    category: 'Travel',
    price: 400,
    description: 'Unlimited 30-day city transit & university shuttle card.',
    imageType: 'metro',
  },
  {
    id: 'prod-books',
    name: 'Study Notes & Books',
    category: 'Essentials',
    price: 750,
    description: 'Core semester engineering & economics reference books.',
    imageType: 'books',
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    name: 'Movie Ticket',
    category: 'Lifestyle',
    amount: 180,
    day: 1,
    timestamp: '2026-10-01 19:30',
  },
  {
    id: 'tx-2',
    name: 'Hostel Setup & Utilities',
    category: 'Essentials',
    amount: 900,
    day: 1,
    timestamp: '2026-10-01 14:00',
  },
  {
    id: 'tx-3',
    name: 'Academic Textbooks & Kit',
    category: 'Essentials',
    amount: 1270,
    day: 1,
    timestamp: '2026-10-01 11:15',
  },
  {
    id: 'tx-4',
    name: 'Bus Ticket',
    category: 'Travel',
    amount: 40,
    day: 2,
    timestamp: '2026-10-02 08:45',
  },
  {
    id: 'tx-5',
    name: 'Groceries',
    category: 'Essentials',
    amount: 250,
    day: 3,
    timestamp: '2026-10-03 16:20',
  },
  {
    id: 'tx-6',
    name: 'Cafe Coffee',
    category: 'Food',
    amount: 120,
    day: 3,
    timestamp: '2026-10-03 12:10',
  },
];

const INITIAL_TASKS: Record<number, DayTask[]> = {
  1: [
    { id: 't-1-1', text: 'Move into dorm campus', completed: true },
    { id: 't-1-2', text: 'Set up emergency wallet buffer', completed: true },
    { id: 't-1-3', text: 'Avoid late-night takeout delivery', completed: true },
  ],
  2: [
    { id: 't-2-1', text: 'Take local bus instead of cab', completed: true },
    { id: 't-2-2', text: 'Review weekly allowance', completed: true },
  ],
  3: [
    { id: 't-3-1', text: 'Attend college', completed: true },
    { id: 't-3-2', text: 'Buy groceries (optional)', completed: false, isOptional: true },
    { id: 't-3-3', text: 'Avoid impulse shopping', completed: false },
    { id: 't-3-4', text: 'Save for emergency', completed: false },
  ],
  4: [
    { id: 't-4-1', text: 'Library study session', completed: false },
    { id: 't-4-2', text: 'Pack lunch from hostel', completed: false },
    { id: 't-4-3', text: 'Keep daily spend under ₹300', completed: false },
  ],
};

interface GameContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  currentDay: number;
  initialBudget: number;
  transactions: Transaction[];
  cart: ShopProduct[];
  tasks: DayTask[];
  isPhoneDeviceView: boolean;
  setIsPhoneDeviceView: (val: boolean) => void;
  eventModalOpen: boolean;
  setEventModalOpen: (val: boolean) => void;
  // Financial computations & predictive forecasting
  totalSpent: number;
  remainingBudget: number;
  spendingPercentage: number;
  metrics: FinancialMetrics;
  safeDailyAllowance: number;
  projectedDay30Balance: number;
  survivalHealthIndex: number;
  // Audio & Accessibility & Shortcuts
  isAudioMuted: boolean;
  toggleAudioMute: () => void;
  shortcutsModalOpen: boolean;
  setShortcutsModalOpen: (val: boolean) => void;
  announcement: string | null;
  announce: (msg: string) => void;
  // Actions
  addToCart: (product: ShopProduct) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  confirmPurchase: () => void;
  cancelPurchase: () => void;
  addExpense: (expense: { name: string; amount: number; category: ExpenseCategory; note?: string }) => void;
  deleteExpense: (id: string) => void;
  toggleTask: (taskId: string) => void;
  advanceDay: () => void;
  jumpToDay: (day: number) => void;
  resolveUnexpectedExpense: (choice: 'pay' | 'alternative', cost: number, title?: string) => void;
  resetGame: () => void;
  triggerEventModal: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [currentDay, setCurrentDay] = useState<number>(3);
  const [initialBudget] = useState<number>(10000);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [cart, setCart] = useState<ShopProduct[]>([]);
  const [tasksByDay, setTasksByDay] = useState<Record<number, DayTask[]>>(INITIAL_TASKS);
  const [isPhoneDeviceView, setIsPhoneDeviceView] = useState<boolean>(false);
  const [eventModalOpen, setEventModalOpen] = useState<boolean>(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => soundManager.getMuted());
  const [announcement, setAnnouncement] = useState<string | null>(null);

  const announce = (msg: string) => {
    setAnnouncement(msg);
    setTimeout(() => {
      setAnnouncement((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const toggleAudioMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsAudioMuted(nextMuted);
    announce(nextMuted ? 'Sound effects muted' : 'Sound effects unmuted');
  };

  // Load from LocalStorage with integrity validation
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentDay === 'number' && parsed.currentDay >= 1 && parsed.currentDay <= 30) {
          setCurrentDay(parsed.currentDay);
        }
        if (Array.isArray(parsed.transactions)) {
          setTransactions(parsed.transactions);
        }
        if (parsed.tasksByDay && typeof parsed.tasksByDay === 'object') {
          setTasksByDay(parsed.tasksByDay);
        }
      }
    } catch {
      // Graceful fallback to default initial state
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentDay,
          transactions,
          tasksByDay,
        })
      );
    } catch {
      // LocalStorage error fallback
    }
  }, [currentDay, transactions, tasksByDay]);

  // Centralized, memoized financial computations & predictive metrics
  const metrics = useMemo(
    () => calculateFinancialMetrics(transactions, initialBudget, currentDay),
    [transactions, initialBudget, currentDay]
  );
  const totalSpent = metrics.totalSpent;
  const remainingBudget = metrics.remainingBudget;
  const spendingPercentage = metrics.spendingPercentage;
  const safeDailyAllowance = metrics.safeDailyAllowance;
  const projectedDay30Balance = metrics.projectedDay30Balance;
  const survivalHealthIndex = metrics.survivalHealthIndex;

  // Current day tasks
  const tasks = tasksByDay[currentDay] || [
    { id: `t-${currentDay}-1`, text: 'Attend lectures', completed: false },
    { id: `t-${currentDay}-2`, text: 'Track today’s expenses', completed: false },
    { id: `t-${currentDay}-3`, text: 'Cook dinner or budget meal', completed: false },
  ];

  // Global Keyboard Navigation & Accessibility Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Do not trigger shortcuts when user is filling form fields
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setShortcutsModalOpen((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        toggleAudioMute();
      } else if (e.key === '1') {
        setCurrentScreen('landing');
      } else if (e.key === '2') {
        setCurrentScreen('dashboard');
      } else if (e.key === '3') {
        setCurrentScreen('shop');
      } else if (e.key === '4') {
        triggerEventModal();
      } else if (e.key === '5') {
        setCurrentScreen('tracker');
      } else if (e.key === '6') {
        setCurrentScreen('insights');
      } else if (e.key === '7') {
        setCurrentScreen('moneyverse');
      } else if (e.key === ' ') {
        if (currentScreen === 'dashboard' || currentScreen === 'landing') {
          e.preventDefault();
          advanceDay();
        }
      } else if (e.key === 'Escape') {
        setEventModalOpen(false);
        setShortcutsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentScreen, currentDay]);

  // Cart operations (Simulation only - does NOT affect balance until confirmed)
  const addToCart = (product: ShopProduct) => {
    setCart((prev) => [...prev, product]);
    soundManager.playTap();
    announce(`Added ${product.name} (₹${product.price}) to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === productId);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
    soundManager.playTap();
  };

  const clearCart = () => {
    setCart([]);
  };

  // Only confirming purchase changes balance
  const confirmPurchase = () => {
    if (cart.length === 0) return;
    const totalCost = cart.reduce((sum, item) => sum + item.price, 0);
    const newTxs: Transaction[] = cart.map((item, i) => ({
      id: `tx-${Date.now()}-${i}`,
      name: item.name,
      category: item.category,
      amount: item.price,
      day: currentDay,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
    }));

    setTransactions((prev) => [...prev, ...newTxs]);
    setCart([]);
    soundManager.playCoinSpend();
    announce(`Purchased ${cart.length} item(s) for ₹${totalCost}. Remaining balance: ₹${remainingBudget - totalCost}`);
  };

  const cancelPurchase = () => {
    setCart([]);
  };

  const addExpense = ({
    name,
    amount,
    category,
    note,
  }: {
    name: string;
    amount: number;
    category: ExpenseCategory;
    note?: string;
  }) => {
    const validation = validateExpenseInput(name, amount, category);
    if (!validation.valid) {
      console.warn('Expense validation warning:', validation.error);
      return;
    }
    const sanitizedAmount = Math.max(1, Math.round(Number(amount)));
    const newTx: Transaction = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: name.trim(),
      category,
      amount: sanitizedAmount,
      day: currentDay,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      note: note ? note.trim() : undefined,
    };
    setTransactions((prev) => [newTx, ...prev]);
    soundManager.playCoinSpend();
    announce(`Added expense "${name}" for ₹${sanitizedAmount}. New remaining: ₹${remainingBudget - sanitizedAmount}`);
  };

  const deleteExpense = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    soundManager.playTap();
  };

  const toggleTask = (taskId: string) => {
    setTasksByDay((prev) => {
      const currentList = prev[currentDay] || tasks;
      const updated = currentList.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      return { ...prev, [currentDay]: updated };
    });
    soundManager.playTap();
  };

  const advanceDay = () => {
    if (currentDay >= 30) {
      setCurrentScreen('result');
      soundManager.playVictory();
      announce('30-Day challenge completed! Viewing final survival results.');
      return;
    }
    const nextDay = currentDay + 1;
    setCurrentDay(nextDay);
    soundManager.playDayAdvance();
    announce(`Welcome to Day ${nextDay} of 30. Remaining balance: ₹${remainingBudget}. Safe daily allowance: ₹${safeDailyAllowance}.`);

    if (nextDay === 4 || nextDay === 15) {
      setEventModalOpen(true);
      soundManager.playAlert();
    }
  };

  const jumpToDay = (day: number) => {
    if (day >= 1 && day <= 30) {
      setCurrentDay(day);
      if (day === 30) {
        setCurrentScreen('result');
        soundManager.playVictory();
      } else {
        soundManager.playDayAdvance();
      }
      announce(`Jumped to Day ${day}`);
    }
  };

  const resolveUnexpectedExpense = (choice: 'pay' | 'alternative', cost: number, title = 'Phone Screen Repair') => {
    if (cost > 0) {
      addExpense({
        name: title,
        amount: cost,
        category: 'Lifestyle',
        note: choice === 'pay' ? 'Official repair center' : 'Budget DIY alternative fix',
      });
    }
    setEventModalOpen(false);
    announce(`Resolved unexpected emergency with ${choice === 'pay' ? 'full payment' : 'budget alternative'}. Cost: ₹${cost}`);
  };

  const triggerEventModal = () => {
    setEventModalOpen(true);
    soundManager.playAlert();
  };

  const resetGame = () => {
    setCurrentDay(1);
    setTransactions(INITIAL_TRANSACTIONS.filter((t) => t.day === 1));
    setCart([]);
    setTasksByDay(INITIAL_TASKS);
    setCurrentScreen('landing');
    localStorage.removeItem(STORAGE_KEY);
    soundManager.playTap();
    announce('Reset challenge back to Day 1 with initial ₹10,000 balance.');
  };

  const contextValue = useMemo<GameContextType>(
    () => ({
      currentScreen,
      setCurrentScreen,
      currentDay,
      initialBudget,
      transactions,
      cart,
      tasks,
      isPhoneDeviceView,
      setIsPhoneDeviceView,
      eventModalOpen,
      setEventModalOpen,
      shortcutsModalOpen,
      setShortcutsModalOpen,
      isAudioMuted,
      toggleAudioMute,
      announcement,
      announce,
      totalSpent,
      remainingBudget,
      spendingPercentage,
      metrics,
      safeDailyAllowance,
      projectedDay30Balance,
      survivalHealthIndex,
      addToCart,
      removeFromCart,
      clearCart,
      confirmPurchase,
      cancelPurchase,
      addExpense,
      deleteExpense,
      toggleTask,
      advanceDay,
      jumpToDay,
      resolveUnexpectedExpense,
      resetGame,
      triggerEventModal,
    }),
    [
      currentScreen,
      currentDay,
      initialBudget,
      transactions,
      cart,
      tasks,
      isPhoneDeviceView,
      eventModalOpen,
      shortcutsModalOpen,
      isAudioMuted,
      announcement,
      totalSpent,
      remainingBudget,
      spendingPercentage,
      metrics,
      safeDailyAllowance,
      projectedDay30Balance,
      survivalHealthIndex,
    ]
  );

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
