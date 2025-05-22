import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define context type
interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
}

// Create context with default values
const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'INR',
  setCurrency: () => {},
});

// Provider props type
interface CurrencyProviderProps {
  children: ReactNode;
}

// Provider component
export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  // Initialize with INR or get from localStorage if available
  const [currency, setCurrency] = useState<string>(() => {
    const savedCurrency = localStorage.getItem('expenseTracker_currency');
    return savedCurrency || 'INR';
  });

  // Save currency to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('expenseTracker_currency', currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook for using currency context
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
