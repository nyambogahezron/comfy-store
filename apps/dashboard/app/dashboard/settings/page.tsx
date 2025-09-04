"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Settings</h1>
			</div>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="notifications">Notifications</TabsTrigger>
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
				</TabsList>

				<TabsContent value="general">
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-6">General Settings</h2>
						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="storeName">Store Name</Label>
									<Input id="storeName" placeholder="Your store name" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="storeEmail">Store Email</Label>
									<Input id="storeEmail" type="email" placeholder="store@example.com" />
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="storeAddress">Store Address</Label>
								<Input id="storeAddress" placeholder="Store address" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="currency">Currency</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select currency" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="usd">USD ($)</SelectItem>
										<SelectItem value="eur">EUR (€)</SelectItem>
										<SelectItem value="gbp">GBP (£)</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button>Save Changes</Button>
						</div>
					</Card>
				</TabsContent>

				<TabsContent value="notifications">
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Order Notifications</Label>
									<p className="text-sm text-muted-foreground">
										Receive notifications for new orders
									</p>
								</div>
								<Switch />
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Low Stock Alerts</Label>
									<p className="text-sm text-muted-foreground">
										Get notified when products are running low
									</p>
								</div>
								<Switch />
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Customer Reviews</Label>
									<p className="text-sm text-muted-foreground">
										Notifications for new customer reviews
									</p>
								</div>
								<Switch />
							</div>
							<Button>Save Preferences</Button>
						</div>
					</Card>
				</TabsContent>

				<TabsContent value="appearance">
					<Card className="p-6">
						<h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label>Theme</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select theme" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Light</SelectItem>
										<SelectItem value="dark">Dark</SelectItem>
										<SelectItem value="system">System</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Accent Color</Label>
								<Select>
									<SelectTrigger>
										<SelectValue placeholder="Select accent color" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="blue">Blue</SelectItem>
										<SelectItem value="green">Green</SelectItem>
										<SelectItem value="purple">Purple</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<Button>Save Appearance</Button>
						</div>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
