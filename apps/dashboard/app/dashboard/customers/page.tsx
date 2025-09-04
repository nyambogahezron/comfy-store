"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const customers = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		orders: 12,
		spent: 2499.99,
		lastOrder: "2024-03-20",
		status: "Active",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		orders: 8,
		spent: 1799.5,
		lastOrder: "2024-03-15",
		status: "Active",
	},
	{
		id: 3,
		name: "Bob Johnson",
		email: "bob@example.com",
		orders: 5,
		spent: 999.99,
		lastOrder: "2024-03-10",
		status: "Inactive",
	},
];

export default function CustomersPage() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Customers</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
				<Card className="p-6">
					<h3 className="text-lg font-medium">Total Customers</h3>
					<p className="text-2xl font-bold mt-2">1,234</p>
					<p className="text-sm text-green-600 mt-2">+12% from last month</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-lg font-medium">Active Customers</h3>
					<p className="text-2xl font-bold mt-2">892</p>
					<p className="text-sm text-green-600 mt-2">72% of total</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-lg font-medium">New Customers</h3>
					<p className="text-2xl font-bold mt-2">45</p>
					<p className="text-sm text-green-600 mt-2">This month</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-lg font-medium">Avg. Spend</h3>
					<p className="text-2xl font-bold mt-2">$435</p>
					<p className="text-sm text-green-600 mt-2">Per customer</p>
				</Card>
			</div>

			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Orders</TableHead>
							<TableHead>Spent</TableHead>
							<TableHead>Last Order</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers.map((customer) => (
							<TableRow key={customer.id}>
								<TableCell>
									<div className="flex items-center gap-3">
										<Avatar>
											<AvatarFallback>
												{customer.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className="font-medium">{customer.name}</div>
											<div className="text-sm text-muted-foreground">{customer.email}</div>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<span
										className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
											customer.status === "Active"
												? "bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-500"
												: "bg-gray-100 text-gray-700 dark:bg-gray-700/20 dark:text-gray-500"
										}`}
									>
										{customer.status}
									</span>
								</TableCell>
								<TableCell>{customer.orders}</TableCell>
								<TableCell>${customer.spent.toFixed(2)}</TableCell>
								<TableCell>{customer.lastOrder}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
		</div>
	);
}
