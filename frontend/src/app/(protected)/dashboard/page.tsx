"use client";

import { useEffect, useState } from "react";
import { FileText, GraduationCap, Package, Search, Settings, UserCircle } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/authentication/AuthProvider";
import { QuickNavigationCard } from "@/dashboard/QuickNavigationCard";
import { EngineeringOverview } from "@/dashboard/EngineeringOverview";
import { EngineeringOverviewCounts, getEngineeringOverviewCounts } from "@/dashboard/dashboardService";
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
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getEngineeringOverviewCounts()
			.then(setCounts)
			.catch(() => setError("Unable to load Engineering Overview."));
	}, []);

	const fullName = user ? [user.firstName, user.lastName].filter(Boolean).join(" ") : "";

	return (
		<div className="flex flex-col gap-8">
			<section>
				<h2 className="text-2xl font-bold text-foreground">
					{getGreeting()}
					{fullName ? `, ${fullName}` : ""}
				</h2>
				<p className="mt-1 text-sm text-muted-foreground">Engineering Documentation Platform</p>
			</section>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Quick Navigation</h3>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{QUICK_NAV_ITEMS.map((item) => (
						<QuickNavigationCard key={item.href} {...item} />
					))}
				</div>
			</section>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Engineering Overview</h3>
				{error ? (
					<ErrorState
						title="Unable to load Engineering Overview."
						description="Please refresh the page or try again later."
					/>
				) : counts ? (
					<EngineeringOverview counts={counts} />
				) : (
					<Skeleton className="h-24 w-full" />
				)}
			</section>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Recent Activity</h3>
				<div className="rounded-[12px] border border-border bg-card p-6 text-sm text-muted-foreground">
					Activity tracking will be available in a future release.
				</div>
			</section>
		</div>
	);
}
