"use client";

import { useEffect, useState } from "react";
import { FileText, GraduationCap, Package, Search, Settings, UserCircle } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/authentication/AuthProvider";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { QuickNavigationCard } from "@/dashboard/QuickNavigationCard";
import { EngineeringOverview } from "@/dashboard/EngineeringOverview";
import { RecentProducts } from "@/dashboard/RecentProducts";
import { EngineeringOverviewCounts, getEngineeringOverviewCounts } from "@/dashboard/dashboardService";
import { getAllProducts } from "@/products/productService";
import { Product } from "@/products/productTypes";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";

const QUICK_NAV_ITEMS = [
	{
		href: "/products",
		icon: Package,
		title: "Products",
		description: "Browse engineering products, assemblies and parts.",
	},
	{
		href: "/documents",
		icon: FileText,
		title: "Documents",
		description: "Access technical documentation and manuals.",
	},
	{
		href: "/training",
		icon: GraduationCap,
		title: "Training",
		description: "View training resources and tutorials.",
	},
	{
		href: "/search",
		icon: Search,
		title: "Search",
		description: "Search across the engineering hierarchy.",
	},
	{
		href: "/admin",
		icon: Settings,
		title: "Administration",
		description: "Manage platform users and settings.",
	},
	{
		href: "/profile",
		icon: UserCircle,
		title: "Profile",
		description: "View your account and role information.",
	},
];

function getGreeting(): string {
	const hour = new Date().getHours();
	if (hour < 12) return "Good Morning";
	if (hour < 18) return "Good Afternoon";
	return "Good Evening";
}

export default function DashboardPage() {
	usePageTitle("Dashboard");
	const { user } = useAuth();

	const [counts, setCounts] = useState<EngineeringOverviewCounts | null>(null);
	const [countsError, setCountsError] = useState<string | null>(null);
	const [products, setProducts] = useState<Product[] | null>(null);
	const [productsError, setProductsError] = useState<string | null>(null);

	useEffect(() => {
		getEngineeringOverviewCounts()
			.then(setCounts)
			.catch(() => setCountsError("Unable to load Engineering Overview."));

		getAllProducts()
			.then(setProducts)
			.catch(() => setProductsError("Unable to load Recent Products."));
	}, []);

	const fullName = user ? [user.firstName, user.lastName].filter(Boolean).join(" ") : "";

	return (
		<div className="flex flex-col gap-6">
			<section>
				<h2 className="text-2xl font-bold tracking-tight text-foreground">
					{getGreeting()}
					{fullName ? `, ${fullName}` : ""}
				</h2>
				<p className="mt-0.5 text-[13px] text-muted-foreground">Engineering Documentation Platform</p>
			</section>

			<section>
				<SectionHeading>Engineering Overview</SectionHeading>
				{countsError ? (
					<ErrorState title="Unable to load Engineering Overview." description="Please refresh the page or try again later." />
				) : counts ? (
					<EngineeringOverview counts={counts} />
				) : (
					<Skeleton className="h-20 w-full" />
				)}
			</section>

			<section>
				<SectionHeading>Quick Navigation</SectionHeading>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{QUICK_NAV_ITEMS.map((item) => (
						<QuickNavigationCard key={item.href} {...item} />
					))}
				</div>
			</section>

			<section>
				<SectionHeading>Recent Products</SectionHeading>
				{productsError ? (
					<ErrorState title="Unable to load Recent Products." description="Please refresh the page or try again later." />
				) : products ? (
					<RecentProducts products={products} />
				) : (
					<Skeleton className="h-32 w-full" />
				)}
			</section>

			<section>
				<SectionHeading>Recent Activity</SectionHeading>
				<Card className="text-sm text-muted-foreground">Activity tracking will be available in a future release.</Card>
			</section>
		</div>
	);
}
