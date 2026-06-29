import { GraduationCap } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { TrainingResource } from "@/training/trainingTypes";
import { TrainingCard } from "@/training/TrainingCard";

interface TrainingSectionProps {
	resources: TrainingResource[];
}

export function TrainingSection({ resources }: TrainingSectionProps) {
	if (resources.length === 0) {
		return (
			<EmptyState
				icon={GraduationCap}
				title="No Training Available"
				description="No training resources are currently available for this part."
			/>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{resources.map((resource) => (
				<TrainingCard key={resource.id} resource={resource} />
			))}
		</div>
	);
}
