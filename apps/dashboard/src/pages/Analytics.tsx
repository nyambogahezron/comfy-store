import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { generateRevenueData } from '@/lib/mockData';
import { useEffect, useState } from 'react';
import { getOrders, getCustomers, initializeStorage } from '@/lib/localStorage';

const Analytics = () => {
  const [revenueData] = useState(generateRevenueData());
  const [categoryData, setCategoryData] = useState<{ name: string; value: number; }[]>([]);

  useEffect(() => {
    initializeStorage();
    const orders = getOrders();
    
    // Calculate category distribution
    const categoryTotals: { [key: string]: number } = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const category = 'Furniture'; // Simplified for demo
        categoryTotals[category] = (categoryTotals[category] || 0) + item.total;
      });
    });

    setCategoryData([
      { name: 'Living Room', value: 45000 },
      { name: 'Bedroom', value: 38000 },
      { name: 'Dining', value: 28000 },
      { name: 'Office', value: 22000 },
      { name: 'Storage', value: 18000 },
    ]);
  }, []);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

  const customerGrowthData = [
    { month: 'Jan', new: 12, returning: 8 },
    { month: 'Feb', new: 15, returning: 12 },
    { month: 'Mar', new: 18, returning: 15 },
    { month: 'Apr', new: 22, returning: 20 },
    { month: 'May', new: 19, returning: 22 },
    { month: 'Jun', new: 25, returning: 28 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your store's performance and insights</p>
        </div>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Revenue"
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="orders" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Orders"
                  dot={{ fill: 'hsl(var(--success))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution & Customer Growth */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="new" fill="hsl(var(--primary))" name="New Customers" />
                  <Bar dataKey="returning" fill="hsl(var(--success))" name="Returning Customers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Average Order Value</p>
              <p className="text-2xl font-bold mt-2">$2,541.50</p>
              <p className="text-sm text-success mt-1">↑ 12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold mt-2">3.24%</p>
              <p className="text-sm text-success mt-1">↑ 0.8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Customer Lifetime Value</p>
              <p className="text-2xl font-bold mt-2">$8,925</p>
              <p className="text-sm text-success mt-1">↑ 15.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-muted-foreground">Return Rate</p>
              <p className="text-2xl font-bold mt-2">2.1%</p>
              <p className="text-sm text-destructive mt-1">↓ 0.5% from last month</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
