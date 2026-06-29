import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrainingResource } from "@/training/trainingTypes";

interface TrainingCardProps {
	resource: TrainingResource;
}

export function TrainingCard({ resource }: TrainingCardProps) {
	return (
		<Link href={`/training/${resource.id}`} className="block">
			<Card className="flex-row items-start gap-3 py-3 transition-colors duration-150 hover:border-primary/40 hover:bg-accent/30">
				<GraduationCap className="size-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
				<div className="flex flex-1 flex-col gap-1">
					<div className="flex items-center justify-between gap-2">
						<h4 className="text-sm font-semibold text-foreground">{resource.title}</h4>
						<Badge variant="green">{resource.status}</Badge>
					</div>
					<p className="text-sm text-muted-foreground">{resource.description}</p>
					<p className="text-xs text-muted-foreground">
						{resource.durationMinutes} minutes &middot; {resource.skillLevel}
					</p>
				</div>
			</Card>
		</Link>
	);
}
