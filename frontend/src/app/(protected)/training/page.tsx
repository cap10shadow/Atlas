"use client";

import { GraduationCap } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { getAllTrainingResources } from "@/training/trainingDemoContent";
import { TrainingCard } from "@/training/TrainingCard";

export default function TrainingPage() {
	usePageTitle("Training");

	const resources = getAllTrainingResources();

	return (
		<div className="flex flex-col gap-5">
			<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Training" }]} />

			<div>
				<h2 className="text-2xl font-bold tracking-tight text-foreground">Training</h2>
				<p className="mt-0.5 text-[13px] text-muted-foreground">
					View training resources and tutorials linked to engineering parts.
				</p>
			</div>

			{resources.length === 0 ? (
				<EmptyState
					icon={GraduationCap}
					title="No Training Available"
					description="No training resources are currently available."
				/>
			) : (
				<div className="flex flex-col gap-2">
					{resources.map((resource) => (
						<TrainingCard key={resource.id} resource={resource} />
					))}
				</div>
			)}
		</div>
	);
}
