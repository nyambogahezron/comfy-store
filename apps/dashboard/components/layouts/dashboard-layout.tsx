"use client";

import {
	Bell,
	ChevronDown,
	LayoutDashboard,
	Menu,
	Package,
	Search,
	Settings,
	ShoppingCart,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Products", href: "/dashboard/products", icon: Package },
	{ name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
	{ name: "Customers", href: "/dashboard/customers", icon: Users },
	{ name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const pathname = usePathname();

	return (
		<div className="min-h-screen bg-background">
			{/* Sidebar */}
			<aside
				className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-card transition-transform duration-200 ease-in-out ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex h-16 items-center justify-center border-b">
					<h1 className="text-xl font-bold">Comfy Store</h1>
				</div>
				<nav className="mt-6 px-4">
					{navigation.map((item) => {
						const Icon = item.icon;
						return (
							<Link key={item.name} href={item.href}>
								<Button
									variant={pathname === item.href ? "secondary" : "ghost"}
									className="w-full justify-start mb-2"
								>
									<Icon className="mr-2 h-4 w-4" />
									{item.name}
								</Button>
							</Link>
						);
					})}
				</nav>
			</aside>

			{/* Main Content */}
			<div className={`${isSidebarOpen ? "ml-64" : "ml-0"}`}>
				{/* Header */}
				<header
					className="bg-card border-b h-16 fixed right-0 top-0 left-0 z-30 flex items-center justify-between px-4"
					style={{ left: isSidebarOpen ? "16rem" : "0" }}
				>
					<div className="flex items-center">
						<Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
							<Menu className="h-5 w-5" />
						</Button>
						<div className="ml-4 relative">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input className="pl-10 w-[300px]" placeholder="Search..." />
						</div>
					</div>
					<div className="flex items-center gap-4">
						<ThemeToggle />
						<Button variant="ghost" size="icon">
							<Bell className="h-5 w-5" />
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="gap-2">
									Admin User
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				{/* Main Content */}
				<main className="p-6 mt-16">{children}</main>
			</div>
		</div>
	);
}
