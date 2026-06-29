import { Badge } from "@/components/ui/badge";

interface DetailPageHeaderProps {
	title: string;
	identifier: string;
	description?: string | null;
}

export function DetailPageHeader({ title, identifier, description }: DetailPageHeaderProps) {
	return (
		<div className="flex flex-col gap-1.5 border-b border-border pb-4">
			<div className="flex items-center gap-2.5">
				<h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
				<Badge variant="blue">{identifier}</Badge>
			</div>
			{description && <p className="text-[13px] text-muted-foreground">{description}</p>}
		</div>
	);
}
