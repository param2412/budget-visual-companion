
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateTotalIncome, calculateTotalExpense, calculateBalance } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";

const BalanceCard = () => {
  const totalIncome = calculateTotalIncome();
  const totalExpense = calculateTotalExpense();
  const balance = calculateBalance();
  const { currency } = useCurrency();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-income"
          >
            <path d="M12 5v14M19 12l-7-7-7 7" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-income">{formatCurrency(totalIncome, currency)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-expense"
          >
            <path d="M12 19V5M5 12l7 7 7-7" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense">{formatCurrency(totalExpense, currency)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-primary"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
            {formatCurrency(balance, currency)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceCard;
