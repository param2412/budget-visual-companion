
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { monthlyData } from "@/lib/data";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";

const IncomeExpenseChart = () => {
  const [chartData, setChartData] = useState(monthlyData);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force re-render on component mount
    setKey(prev => prev + 1);
  }, []);

  // Get currency from context
  const { currency } = useCurrency();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const income = payload.find((p: any) => p.dataKey === 'income')?.value || 0;
      const expense = payload.find((p: any) => p.dataKey === 'expense')?.value || 0;
      const balance = income - expense;

      return (
        <div className="bg-white p-3 shadow-lg rounded-md border">
          <p className="font-bold mb-1">{label}</p>
          <p className="text-green-500">Income: {formatCurrency(income, currency)}</p>
          <p className="text-red-500">Expense: {formatCurrency(expense, currency)}</p>
          <p className={balance >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
            Balance: {formatCurrency(balance, currency)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Income vs. Expenses</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)]">
        <ResponsiveContainer width="100%" height="100%" key={`chart-${key}`}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => {
              // Simple formatter for Y-axis that just shows the currency symbol and value
              const symbol = currency === 'USD' ? '$' :
                            currency === 'EUR' ? '€' :
                            currency === 'GBP' ? '£' :
                            currency === 'JPY' ? '¥' :
                            currency === 'CAD' ? 'C$' :
                            currency === 'INR' ? '₹' : '$';
              return `${symbol}${value}`;
            }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="income"
              name="Income"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              isAnimationActive={true}
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#EF4444"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              isAnimationActive={true}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChart;
