import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
	icon: LucideIcon;
	title: string;
	description: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-6 py-10 text-center">
			<Icon className="size-6 text-muted-foreground" aria-hidden="true" />
			<h3 className="text-base font-semibold text-foreground">{title}</h3>
			<p className="max-w-sm text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
