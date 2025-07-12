"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2024-03-20",
    status: "Delivered",
    total: 1299.99,
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2024-03-19",
    status: "Processing",
    total: 799.50,
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    date: "2024-03-18",
    status: "Shipped",
    total: 2499.99,
    items: 5,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-500";
    case "Processing":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/20 dark:text-yellow-500";
    case "Shipped":
      return "bg-blue-100 text-blue-700 dark:bg-blue-700/20 dark:text-blue-500";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-700/20 dark:text-gray-500";
  }
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium">Total Orders</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
          <p className="text-sm text-green-600 mt-2">+8% from last month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium">Processing</h3>
          <p className="text-2xl font-bold mt-2">45</p>
          <p className="text-sm text-yellow-600 mt-2">12 need attention</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium">Shipped</h3>
          <p className="text-2xl font-bold mt-2">89</p>
          <p className="text-sm text-blue-600 mt-2">23 arriving today</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium">Delivered</h3>
          <p className="text-2xl font-bold mt-2">1,100</p>
          <p className="text-sm text-green-600 mt-2">98% satisfaction rate</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}