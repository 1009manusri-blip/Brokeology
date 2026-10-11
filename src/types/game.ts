export type ExpenseCategory = 'Food' | 'Travel' | 'Lifestyle' | 'Essentials' | 'Other';

export interface Transaction {
  id: string;
  name: string;
  category: ExpenseCategory;
  amount: number;
  day: number;
  timestamp: string;
  note?: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  category: ExpenseCategory;
  price: number;
  description: string;
  imageType: 'coffee' | 'groceries' | 'movie' | 'shoes' | 'metro' | 'books';
}

export interface DayTask {
  id: string;
  text: string;
  completed: boolean;
  isOptional?: boolean;
}

export type ScreenId =
  | 'landing'
  | 'dashboard'
  | 'shop'
  | 'events'
  | 'tracker'
  | 'insights'
  | 'moneyverse'
  | 'mobile'
  | 'result';

export interface GameState {
  initialBudget: number;
  currentDay: number;
  totalDays: number;
  transactions: Transaction[];
  cart: ShopProduct[];
  tasksByDay: Record<number, DayTask[]>;
  eventModalOpen: boolean;
  currentEvent: {
    title: string;
    description: string;
    cost: number;
    resolved: boolean;
  } | null;
}
