import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { TopProducts } from '@/components/dashboard/TopProducts';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getOrders, getCustomers, initializeStorage } from '@/lib/localStorage';
import { generateDashboardStats } from '@/lib/mockData';
import { DashboardStats } from '@/types';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    revenueChange: 0,
    ordersChange: 0,
    customersChange: 0,
  });

  useEffect(() => {
    initializeStorage();
    const orders = getOrders();
    const customers = getCustomers();
    const dashboardStats = generateDashboardStats(orders, customers);
    setStats(dashboardStats);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your store.</p>
        </div>

        {/* Stats grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={stats.revenueChange}
            icon={DollarSign}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toString()}
            change={stats.ordersChange}
            icon={ShoppingCart}
          />
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers.toString()}
            change={stats.customersChange}
            icon={Users}
          />
          <StatCard
            title="Average Order"
            value={`$${stats.averageOrderValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change={5.2}
            icon={TrendingUp}
          />
        </div>

        {/* Charts and widgets */}
        <div className="grid gap-4 md:grid-cols-2">
          <RevenueChart />
          <TopProducts />
        </div>

        {/* Low stock alert */}
        <LowStockAlert />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
