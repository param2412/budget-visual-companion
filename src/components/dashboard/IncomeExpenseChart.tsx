
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

const IncomeExpenseChart = () => {
  // Format currency for tooltips
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const income = payload.find((p: any) => p.dataKey === 'income')?.value || 0;
      const expense = payload.find((p: any) => p.dataKey === 'expense')?.value || 0;
      const balance = income - expense;
      
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border">
          <p className="font-bold mb-1">{label}</p>
          <p className="text-green-500">Income: {formatCurrency(income)}</p>
          <p className="text-red-500">Expense: {formatCurrency(expense)}</p>
          <p className={balance >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
            Balance: {formatCurrency(balance)}
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="income" 
              name="Income" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="expense" 
              name="Expense" 
              fill="#EF4444" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChart;
