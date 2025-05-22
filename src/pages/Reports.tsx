
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { monthlyData, categories, transactions } from "@/lib/data";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { formatCurrency } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateReportsPDF, downloadPDF } from "@/lib/pdfUtils";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
      toast.success("Reports data loaded successfully");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  // Get currency from context
  const { currency } = useCurrency();

  const handleDownloadReportsPDF = async () => {
    setIsDownloading(true);
    try {
      const doc = await generateReportsPDF({
        monthlyData,
        categoryData: categoryExpenses,
        currency,
      });

      const filename = `financial-reports-${new Date().toISOString().split('T')[0]}.pdf`;
      downloadPDF(doc, filename);

      toast.success("Reports PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating reports PDF:", error);
      toast.error("Failed to generate reports PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const CustomBalanceTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-md border">
          <p className="font-bold mb-1">Month: {label}</p>
          <p className="text-blue-600">Balance: {formatCurrency(payload[0].value, currency)}</p>
        </div>
      );
    }
    return null;
  };

  const CustomCategoryTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const totalExpense = categoryExpenses.reduce((sum, cat) => sum + cat.amount, 0);
      const percentage = ((payload[0].value / totalExpense) * 100).toFixed(1);

      return (
        <div className="bg-white p-3 shadow-lg rounded-md border">
          <p className="font-bold mb-1">{payload[0].payload.name}</p>
          <p>Amount: {formatCurrency(payload[0].value, currency)}</p>
          <p>Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <Button
            onClick={handleDownloadReportsPDF}
            variant="outline"
            disabled={loading || isDownloading}
          >
            {isDownloading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Monthly Balance Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              {!loading && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyTrend}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={(value) => {
                        // Simple formatter for Y-axis that just shows the currency symbol and value
                        const symbol = currency === 'USD' ? '$' :
                                      currency === 'EUR' ? '€' :
                                      currency === 'GBP' ? '£' :
                                      currency === 'JPY' ? '¥' :
                                      currency === 'CAD' ? 'C$' :
                                      currency === 'INR' ? '₹' : '$';
                        return `${symbol}${value}`;
                      }}
                      width={80}
                    />
                    <Tooltip content={<CustomBalanceTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      name="Monthly Balance"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                      animationDuration={1000}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="h-96">
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              {!loading && categoryExpenses.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryExpenses}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => {
                        // Simple formatter for X-axis that just shows the currency symbol and value
                        const symbol = currency === 'USD' ? '$' :
                                      currency === 'EUR' ? '€' :
                                      currency === 'GBP' ? '£' :
                                      currency === 'JPY' ? '¥' :
                                      currency === 'CAD' ? 'C$' :
                                      currency === 'INR' ? '₹' : '$';
                        return `${symbol}${value}`;
                      }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={100}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomCategoryTooltip />} />
                    <Legend />
                    <Bar
                      dataKey="amount"
                      name="Expense Amount"
                      radius={[0, 4, 4, 0]}
                      animationDuration={1000}
                      isAnimationActive={true}
                    >
                      {categoryExpenses.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
              {!loading && categoryExpenses.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No expense data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
