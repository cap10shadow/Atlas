"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FileText,
	GraduationCap,
	LayoutDashboard,
	Package,
	Search,
	Settings,
} from "lucide-react";
import { cn } from "@/utils/utils";

interface NavItem {
	label: string;
	href: string;
	icon: typeof LayoutDashboard;
}

const NAV_ITEMS: NavItem[] = [
	{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Products", href: "/products", icon: Package },
	{ label: "Documents", href: "/documents", icon: FileText },
	{ label: "Training", href: "/training", icon: GraduationCap },
	{ label: "Search", href: "/search", icon: Search },
	{ label: "Administration", href: "/admin", icon: Settings },
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="hidden md:flex md:w-[260px] md:flex-shrink-0 md:flex-col border-r border-border bg-sidebar">
			<div className="flex h-16 items-center border-b border-border px-6">
				<span className="text-base font-semibold text-foreground">Atlas</span>
			</div>
			<nav className="flex flex-1 flex-col gap-1 p-3">
				{NAV_ITEMS.map((item) => {
					const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
					const Icon = item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
								isActive
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground hover:bg-muted hover:text-foreground",
							)}
						>
							<Icon className="size-5" aria-hidden="true" />
							{item.label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
