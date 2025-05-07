
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { monthlyData, categories, transactions } from "@/lib/data";

const Reports = () => {
  // Generate monthly trend data
  const monthlyTrend = monthlyData.map(item => ({
    month: item.month,
    balance: item.income - item.expense
  }));

  // Calculate category distribution
  const categoryExpenses = categories.map(category => {
    const total = transactions
      .filter(tx => tx.category === category.name && tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    return {
      name: category.name,
      amount: total,
      color: category.color
    };
  }).filter(item => item.amount > 0);

  // Format currency for tooltips
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Monthly Balance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyTrend}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`} 
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Balance']} 
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="balance" 
                    name="Monthly Balance" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryExpenses}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickFormatter={(value) => `$${value}`} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100}
                    tickLine={false}
                  />
                  <Tooltip formatter={(value: number) => [formatCurrency(value), 'Amount']} />
                  <Legend />
                  <Bar 
                    dataKey="amount" 
                    name="Expense Amount"
                    radius={[0, 4, 4, 0]}
                  >
                    {categoryExpenses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
