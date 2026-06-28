import { Card } from "@/components/ui/card";
import { EngineeringOverviewCounts } from "@/dashboard/dashboardService";

interface EngineeringOverviewProps {
	counts: EngineeringOverviewCounts;
}

export function EngineeringOverview({ counts }: EngineeringOverviewProps) {
	const stats: { label: string; value: number }[] = [
		{ label: "Products", value: counts.products },
		{ label: "Assemblies", value: counts.assemblies },
		{ label: "Parts", value: counts.parts },
	];

	return (
		<Card>
			<div className="grid grid-cols-3 divide-x divide-border">
				{stats.map((stat) => (
					<div key={stat.label} className="flex flex-col items-center gap-1 px-4">
						<span className="text-2xl font-semibold text-foreground">{stat.value}</span>
						<span className="text-sm text-muted-foreground">{stat.label}</span>
					</div>
				))}
			</div>
		</Card>
	);
}
