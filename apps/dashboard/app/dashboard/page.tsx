"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
	const products = [
		{
			id: 1,
			name: "Modern Sofa",
			price: 999.99,
			stock: 15,
			image:
				"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
		},
		{
			id: 2,
			name: "Dining Table",
			price: 599.99,
			stock: 8,
			image:
				"https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
		},
		{
			id: 3,
			name: "Bed Frame",
			price: 799.99,
			stock: 12,
			image:
				"https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80",
		},
		// Add more products as needed
	];
	return (
		<>
			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
				<Card className="p-6">
					<h3 className="text-lg font-medium">Total Sales</h3>
					<p className="text-2xl font-bold mt-2">$12,345</p>
					<p className="text-sm text-green-600 mt-2">+12% from last month</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-lg font-medium">Orders</h3>
					<p className="text-2xl font-bold mt-2">234</p>
					<p className="text-sm text-green-600 mt-2">+5% from last month</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-lg font-medium">Customers</h3>
					<p className="text-2xl font-bold mt-2">1,234</p>
					<p className="text-sm text-green-600 mt-2">+8% from last month</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-lg font-medium">Average Order</h3>
					<p className="text-2xl font-bold mt-2">$52.45</p>
					<p className="text-sm text-red-600 mt-2">-2% from last month</p>
				</Card>
			</div>
			<Card className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold">Products</h2>
					<Button>Add Product</Button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((product) => (
						<Card key={product.id} className="overflow-hidden">
							<img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
							<div className="p-4">
								<h3 className="font-medium">{product.name}</h3>
								<p className="text-lg font-bold mt-1">${product.price}</p>
								<p className="text-sm text-gray-600 mt-1">Stock: {product.stock}</p>
								<div className="flex gap-2 mt-4">
									<Button variant="outline" size="sm">
										Edit
									</Button>
									<Button variant="outline" size="sm">
										Delete
									</Button>
								</div>
							</div>
						</Card>
					))}
				</div>
			</Card>

			{/* Recent Activity */}
			<Card className="p-6">
				<h2 className="text-xl font-bold mb-6">Recent Activity</h2>
				<div className="space-y-4">
					{/* Add recent activity items here */}
					<div className="flex items-center justify-between p-4 bg-muted rounded-lg">
						<div>
							<p className="font-medium">New order #1234</p>
							<p className="text-sm text-muted-foreground">2 minutes ago</p>
						</div>
						<span className="text-green-600 font-medium">$299.99</span>
					</div>
					<div className="flex items-center justify-between p-4 bg-muted rounded-lg">
						<div>
							<p className="font-medium">Customer feedback received</p>
							<p className="text-sm text-muted-foreground">15 minutes ago</p>
						</div>
						<span className="text-blue-600 font-medium">⭐⭐⭐⭐⭐</span>
					</div>
					<div className="flex items-center justify-between p-4 bg-muted rounded-lg">
						<div>
							<p className="font-medium">Low stock alert: Modern Sofa</p>
							<p className="text-sm text-muted-foreground">1 hour ago</p>
						</div>
						<span className="text-yellow-600 font-medium">3 left</span>
					</div>
				</div>
			</Card>
		</>
	);
}
