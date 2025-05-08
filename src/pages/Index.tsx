
import AppLayout from "@/components/layouts/AppLayout";
import BalanceCard from "@/components/dashboard/BalanceCard";
import IncomeExpenseChart from "@/components/dashboard/IncomeExpenseChart";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import TransactionList from "@/components/dashboard/TransactionList";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { Transaction } from "@/lib/types";
import { transactions } from "@/lib/data";
import { toast } from "@/components/ui/sonner";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddTransaction = (newTransaction: Transaction) => {
    // In a real app, this would update a database
    console.log("Adding transaction:", newTransaction);
    transactions.push(newTransaction);
    
    // Force re-render of components
    setRefreshKey(prev => prev + 1);
    toast.success("Transaction added successfully");
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            {user && (
              <p className="text-muted-foreground">
                Welcome back, {user.name}!
              </p>
            )}
          </div>
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </div>
        
        <BalanceCard key={`balance-${refreshKey}`} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {!loading && (
            <>
              <IncomeExpenseChart key={`income-expense-${refreshKey}`} />
              <ExpenseChart key={`expense-${refreshKey}`} />
            </>
          )}
        </div>
        
        <TransactionList key={`transactions-${refreshKey}`} />
      </div>
    </AppLayout>
  );
};

export default Index;
