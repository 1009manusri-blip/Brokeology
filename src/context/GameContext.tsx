import React, { createContext, useContext, useState, useEffect } from 'react';
import { GameState, Transaction, ShopProduct, DayTask, ScreenId, ExpenseCategory } from '../types/game';

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
  // Financial computations
  totalSpent: number;
  remainingBudget: number;
  spendingPercentage: number;
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

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentDay) setCurrentDay(parsed.currentDay);
        if (parsed.transactions) setTransactions(parsed.transactions);
        if (parsed.tasksByDay) setTasksByDay(parsed.tasksByDay);
      }
    } catch {
      // ignore
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
      // ignore
    }
  }, [currentDay, transactions, tasksByDay]);

  // Derived financial statistics
  const totalSpent = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  const remainingBudget = Math.max(0, initialBudget - totalSpent);
  const spendingPercentage = Math.min(100, Math.round((totalSpent / initialBudget) * 100));

  // Current day tasks
  const tasks = tasksByDay[currentDay] || [
    { id: `t-${currentDay}-1`, text: 'Attend lectures', completed: false },
    { id: `t-${currentDay}-2`, text: 'Track today’s expenses', completed: false },
    { id: `t-${currentDay}-3`, text: 'Cook dinner or budget meal', completed: false },
  ];

  // Cart operations (Simulation only - does NOT affect balance until confirmed)
  const addToCart = (product: ShopProduct) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === productId);
      if (idx === -1) return prev;
      const copy = [...prev];
      copy.splice(idx, 1);
      return copy;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Only confirming purchase changes balance
  const confirmPurchase = () => {
    if (cart.length === 0) return;
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
  };

  const cancelPurchase = () => {
    // Zero financial effect!
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
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      name,
      category,
      amount,
      day: currentDay,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      note,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const toggleTask = (taskId: string) => {
    setTasksByDay((prev) => {
      const currentList = prev[currentDay] || tasks;
      const updated = currentList.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      return { ...prev, [currentDay]: updated };
    });
  };

  const advanceDay = () => {
    if (currentDay >= 30) {
      setCurrentScreen('result');
      return;
    }
    const nextDay = currentDay + 1;
    setCurrentDay(nextDay);
    // Occasional trigger for unexpected events (like phone damage or surprise test)
    if (nextDay === 4 || nextDay === 15) {
      setEventModalOpen(true);
    }
  };

  const jumpToDay = (day: number) => {
    if (day >= 1 && day <= 30) {
      setCurrentDay(day);
      if (day === 30) {
        setCurrentScreen('result');
      }
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
  };

  const triggerEventModal = () => {
    setEventModalOpen(true);
  };

  const resetGame = () => {
    setCurrentDay(1);
    setTransactions(INITIAL_TRANSACTIONS.filter((t) => t.day === 1));
    setCart([]);
    setTasksByDay(INITIAL_TASKS);
    setCurrentScreen('landing');
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GameContext.Provider
      value={{
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
        totalSpent,
        remainingBudget,
        spendingPercentage,
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
      }}
    >
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
