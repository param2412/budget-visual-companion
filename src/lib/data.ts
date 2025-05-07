
import { Transaction, Category, MonthlyTotal, CategoryTotal } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Housing', color: '#3182CE' },
  { id: '2', name: 'Food', color: '#38A169' },
  { id: '3', name: 'Transportation', color: '#D69E2E' },
  { id: '4', name: 'Entertainment', color: '#805AD5' },
  { id: '5', name: 'Healthcare', color: '#E53E3E' },
  { id: '6', name: 'Shopping', color: '#DD6B20' },
  { id: '7', name: 'Utilities', color: '#319795' },
  { id: '8', name: 'Salary', color: '#4C51BF' },
  { id: '9', name: 'Investment', color: '#1A365D' },
  { id: '10', name: 'Others', color: '#718096' },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    amount: 1200,
    description: 'Monthly rent',
    category: 'Housing',
    date: '2025-04-01',
    type: 'expense',
  },
  {
    id: '2',
    amount: 85,
    description: 'Grocery shopping',
    category: 'Food',
    date: '2025-04-05',
    type: 'expense',
  },
  {
    id: '3',
    amount: 3500,
    description: 'Monthly salary',
    category: 'Salary',
    date: '2025-04-03',
    type: 'income',
  },
  {
    id: '4',
    amount: 120,
    description: 'Electricity bill',
    category: 'Utilities',
    date: '2025-04-12',
    type: 'expense',
  },
  {
    id: '5',
    amount: 45,
    description: 'Movie tickets',
    category: 'Entertainment',
    date: '2025-04-18',
    type: 'expense',
  },
  {
    id: '6',
    amount: 200,
    description: 'Dividend payment',
    category: 'Investment',
    date: '2025-04-20',
    type: 'income',
  },
  {
    id: '7',
    amount: 60,
    description: 'Gas',
    category: 'Transportation',
    date: '2025-04-10',
    type: 'expense',
  },
  {
    id: '8',
    amount: 150,
    description: 'New shoes',
    category: 'Shopping',
    date: '2025-04-15',
    type: 'expense',
  },
  {
    id: '9',
    amount: 95,
    description: 'Doctor visit',
    category: 'Healthcare',
    date: '2025-04-08',
    type: 'expense',
  },
  {
    id: '10',
    amount: 30,
    description: 'Internet subscription',
    category: 'Utilities',
    date: '2025-04-05',
    type: 'expense',
  },
];

export const monthlyData: MonthlyTotal[] = [
  { month: 'Jan', income: 3700, expense: 2200 },
  { month: 'Feb', income: 3700, expense: 2400 },
  { month: 'Mar', income: 3850, expense: 2100 },
  { month: 'Apr', income: 3700, expense: 1800 },
  { month: 'May', income: 3700, expense: 2500 },
  { month: 'Jun', income: 4200, expense: 2300 },
];

export const getCategoryTotals = (): CategoryTotal[] => {
  const expensesByCategory: Record<string, number> = {};
  
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      if (!expensesByCategory[transaction.category]) {
        expensesByCategory[transaction.category] = 0;
      }
      expensesByCategory[transaction.category] += transaction.amount;
    }
  });
  
  return Object.keys(expensesByCategory).map(category => {
    const categoryObj = categories.find(c => c.name === category);
    return {
      category,
      amount: expensesByCategory[category],
      color: categoryObj?.color || '#718096'
    };
  });
};

export const calculateTotalIncome = (): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const calculateTotalExpense = (): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};

export const calculateBalance = (): number => {
  return calculateTotalIncome() - calculateTotalExpense();
};
