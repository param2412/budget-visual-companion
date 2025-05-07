
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: TransactionType;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface MonthlyTotal {
  month: string;
  income: number;
  expense: number;
}

export interface CategoryTotal {
  category: string;
  amount: number;
  color: string;
}
