import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
	title: string;
	description: string;
}

export function ErrorState({ title, description }: ErrorStateProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card px-6 py-16 text-center">
			<AlertTriangle className="size-8 text-destructive" aria-hidden="true" />
			<h3 className="text-base font-semibold text-foreground">{title}</h3>
			<p className="max-w-sm text-sm text-muted-foreground">{description}</p>
		</div>
	);
}
