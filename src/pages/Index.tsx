
import { Suspense } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import BalanceCard from "@/components/dashboard/BalanceCard";
import IncomeExpenseChart from "@/components/dashboard/IncomeExpenseChart";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import TransactionList from "@/components/dashboard/TransactionList";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { Transaction } from "@/lib/types";
import { transactions } from "@/lib/data";

const Index = () => {
  const handleAddTransaction = (newTransaction: Transaction) => {
    // In a real app, this would update a database
    console.log("Adding transaction:", newTransaction);
    transactions.push(newTransaction);
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </div>
        
        <BalanceCard />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeExpenseChart />
          <ExpenseChart />
        </div>
        
        <TransactionList />
      </div>
    </AppLayout>
  );
};

export default Index;
