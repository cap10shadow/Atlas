import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";
import { DemoTrainingResource } from "@/parts/partDemoContent";

interface TrainingSectionProps {
	resources: DemoTrainingResource[];
}

export function TrainingSection({ resources }: TrainingSectionProps) {
	if (resources.length === 0) {
		return (
			<EmptyState
				icon={GraduationCap}
				title="No Training Available"
				description="Training resources have not yet been added for this part."
			/>
		);
	}

	return (
		<div className="flex flex-col gap-3">
			{resources.map((resource) => (
				<Card key={resource.id} className="flex-row items-start gap-3">
					<GraduationCap className="size-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
					<div className="flex flex-1 flex-col gap-1">
						<div className="flex items-center justify-between gap-2">
							<h4 className="text-sm font-semibold text-foreground">{resource.title}</h4>
							<Badge variant="green">{resource.status}</Badge>
						</div>
						<p className="text-sm text-muted-foreground">{resource.description}</p>
						<p className="text-xs text-muted-foreground">{resource.durationMinutes} minutes</p>
					</div>
				</Card>
			))}
		</div>
	);
}
