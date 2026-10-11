import { Transaction, ExpenseCategory } from '../types/game';

export interface FinancialMetrics {
  totalSpent: number;
  remainingBudget: number;
  spendingPercentage: number;
  safeDailyAllowance: number;
  daysRemaining: number;
  daysElapsed: number;
  averageDailySpent: number;
  projectedDay30Balance: number;
  survivalRunwayDays: number;
  survivalHealthIndex: number;
  bufferStatus: 'safe' | 'caution' | 'critical';
}

export interface CategorySummary {
  category: ExpenseCategory;
  total: number;
  percentage: number;
  count: number;
}

/**
 * Calculates all primary and predictive financial metrics for Brokeology.
 * Mathematical basis:
 * - Remaining Runway = Initial Budget - Sum(Transactions)
 * - Safe Daily Allowance = Remaining Runway / (Total Days - Current Day)
 * - Projected Final Balance = Remaining Runway - (Average Daily Burn * Days Remaining)
 */
export function calculateFinancialMetrics(
  transactions: Transaction[],
  initialBudget: number = 10000,
  currentDay: number = 3,
  totalDays: number = 30
): FinancialMetrics {
  const safeInitial = Math.max(1, initialBudget);
  const safeDay = Math.min(totalDays, Math.max(1, currentDay));
  const daysElapsed = safeDay;
  const daysRemaining = Math.max(1, totalDays - safeDay);

  // Total spent sum
  const totalSpent = transactions.reduce((sum, tx) => {
    const val = typeof tx.amount === 'number' && !isNaN(tx.amount) && tx.amount > 0 ? tx.amount : 0;
    return sum + val;
  }, 0);

  const remainingBudget = Math.max(0, safeInitial - totalSpent);
  const spendingPercentage = Math.min(100, Math.round((totalSpent / safeInitial) * 100));

  // Safe daily allowance (how much you CAN spend each day to reach Day 30)
  const safeDailyAllowance = Math.max(0, Math.round(remainingBudget / daysRemaining));

  // Historical daily spending rate
  const averageDailySpent = Math.max(1, Math.round(totalSpent / daysElapsed));

  // Predictive forecast based on historical spending pace
  const projectedDay30Balance = Math.round(remainingBudget - (averageDailySpent * daysRemaining));

  // Days of runway left at current spending rate
  const survivalRunwayDays = averageDailySpent > 0
    ? Math.min(totalDays, Math.round(remainingBudget / averageDailySpent))
    : daysRemaining;

  // Survival health score (0-100)
  let survivalHealthIndex = 100;
  if (remainingBudget <= 0) {
    survivalHealthIndex = 0;
  } else if (projectedDay30Balance < 0) {
    // Projected to go broke
    survivalHealthIndex = Math.max(15, Math.min(50, Math.round((survivalRunwayDays / totalDays) * 100)));
  } else {
    // On track to finish with positive balance
    const bufferRatio = remainingBudget / safeInitial;
    survivalHealthIndex = Math.min(100, Math.max(55, Math.round(bufferRatio * 100 + (30 - spendingPercentage) * 0.4)));
  }

  // Buffer categorization
  let bufferStatus: 'safe' | 'caution' | 'critical' = 'safe';
  if (spendingPercentage > 75 || remainingBudget < 1500) {
    bufferStatus = 'critical';
  } else if (spendingPercentage > 45 || remainingBudget < 4000) {
    bufferStatus = 'caution';
  }

  return {
    totalSpent,
    remainingBudget,
    spendingPercentage,
    safeDailyAllowance,
    daysRemaining,
    daysElapsed,
    averageDailySpent,
    projectedDay30Balance,
    survivalRunwayDays,
    survivalHealthIndex,
    bufferStatus,
  };
}

/**
 * Calculates before-and-after consequence simulation for a proposed expense.
 */
export function simulateConsequence(
  currentBalance: number,
  expenseAmount: number,
  currentDay: number,
  totalDays: number = 30
) {
  const daysRemaining = Math.max(1, totalDays - Math.min(totalDays, Math.max(1, currentDay)));
  const currentDailySafe = Math.max(0, Math.round(currentBalance / daysRemaining));

  const safeExpense = Math.max(0, expenseAmount);
  const projectedBalance = Math.max(0, currentBalance - safeExpense);
  const projectedDailySafe = Math.max(0, Math.round(projectedBalance / daysRemaining));
  const dailyReduction = currentDailySafe - projectedDailySafe;
  const balancePercentageImpact = currentBalance > 0 ? Math.round((safeExpense / currentBalance) * 100) : 100;

  let riskTier: 'negligible' | 'moderate' | 'severe' = 'negligible';
  if (balancePercentageImpact > 25 || projectedBalance < 1000) {
    riskTier = 'severe';
  } else if (balancePercentageImpact > 8 || projectedBalance < 3500) {
    riskTier = 'moderate';
  }

  return {
    currentDailySafe,
    projectedBalance,
    projectedDailySafe,
    dailyReduction,
    balancePercentageImpact,
    riskTier,
    canAfford: currentBalance >= safeExpense,
  };
}

/**
 * Computes category totals and percentages from transactions.
 */
export function calculateCategoryBreakdown(transactions: Transaction[]): CategorySummary[] {
  const categories: ExpenseCategory[] = ['Food', 'Essentials', 'Lifestyle', 'Travel', 'Other'];
  const totals: Record<ExpenseCategory, { total: number; count: number }> = {
    Food: { total: 0, count: 0 },
    Essentials: { total: 0, count: 0 },
    Lifestyle: { total: 0, count: 0 },
    Travel: { total: 0, count: 0 },
    Other: { total: 0, count: 0 },
  };

  let grandTotal = 0;
  transactions.forEach((tx) => {
    const cat = categories.includes(tx.category) ? tx.category : 'Other';
    const amount = typeof tx.amount === 'number' && tx.amount > 0 ? tx.amount : 0;
    totals[cat].total += amount;
    totals[cat].count += 1;
    grandTotal += amount;
  });

  return categories.map((cat) => ({
    category: cat,
    total: totals[cat].total,
    count: totals[cat].count,
    percentage: grandTotal > 0 ? Math.round((totals[cat].total / grandTotal) * 100) : 0,
  }));
}

/**
 * Validates expense input parameters to maintain financial integrity.
 */
export function validateExpenseInput(
  name: string,
  amount: number,
  category: string
): { valid: boolean; error?: string } {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Expense description cannot be empty.' };
  }
  if (name.trim().length > 80) {
    return { valid: false, error: 'Expense description is too long (max 80 characters).' };
  }
  if (typeof amount !== 'number' || isNaN(amount)) {
    return { valid: false, error: 'Amount must be a valid number.' };
  }
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than ₹0.' };
  }
  if (amount > 100000) {
    return { valid: false, error: 'Amount exceeds challenge maximum limit.' };
  }
  const validCategories: ExpenseCategory[] = ['Food', 'Essentials', 'Lifestyle', 'Travel', 'Other'];
  if (!validCategories.includes(category as ExpenseCategory)) {
    return { valid: false, error: 'Invalid expense category.' };
  }

  return { valid: true };
}
