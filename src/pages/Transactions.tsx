import { useState } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { Transaction } from "@/lib/types";
import { transactions } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

const Transactions = () => {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(transactions);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleAddTransaction = (newTransaction: Transaction) => {
    // In a real app, this would update a database
    console.log("Adding transaction:", newTransaction);
    const updatedTransactions = [...allTransactions, newTransaction];
    setAllTransactions(updatedTransactions);
    transactions.push(newTransaction);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const { currency } = useCurrency();

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      type: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const uniqueCategories = [...new Set(allTransactions.map((tx) => tx.category))];

  const filteredTransactions = allTransactions.filter((tx) => {
    // Search filter
    const searchMatch = !filters.search ||
      tx.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      tx.category.toLowerCase().includes(filters.search.toLowerCase());

    // Category filter
    const categoryMatch = !filters.category || tx.category === filters.category;

    // Type filter
    const typeMatch = !filters.type || tx.type === filters.type;

    // Date range filter
    const dateMatch =
      (!filters.dateFrom || tx.date >= filters.dateFrom) &&
      (!filters.dateTo || tx.date <= filters.dateTo);

    return searchMatch && categoryMatch && typeMatch && dateMatch;
  });

  // Sort transactions by date (most recent first)
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter Transactions</CardTitle>
            <CardDescription>
              Narrow down your transactions by using the filters below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="flex space-x-2">
                <Input
                  placeholder="Search..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.type}
                onValueChange={(value) => handleFilterChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>

              <div>
                <Input
                  type="date"
                  placeholder="From"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  placeholder="To"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetFilters}
                  title="Clear filters"
                >
                  <FilterX className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
            <CardDescription>
              {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sortedTransactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-block px-2 py-1 text-xs font-medium rounded-full",
                            transaction.type === "income"
                              ? "bg-income-light text-income"
                              : "bg-expense-light text-expense"
                          )}
                        >
                          {transaction.type === "income" ? "Income" : "Expense"}
                        </span>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right",
                          transaction.type === "income"
                            ? "text-income"
                            : "text-expense"
                        )}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {formatCurrency(transaction.amount, currency)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex justify-center p-6">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Transactions;
