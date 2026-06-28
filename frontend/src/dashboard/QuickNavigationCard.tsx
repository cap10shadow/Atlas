import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuickNavigationCardProps {
	href: string;
	icon: LucideIcon;
	title: string;
	description: string;
}

export function QuickNavigationCard({ href, icon: Icon, title, description }: QuickNavigationCardProps) {
	return (
		<Link href={href} className="block h-full">
			<Card className="h-full flex-row items-start gap-3 transition-colors hover:border-primary/40 hover:bg-accent/30">
				<Icon className="size-5 flex-shrink-0 text-primary" aria-hidden="true" />
				<div>
					<h4 className="text-sm font-semibold text-foreground">{title}</h4>
					<p className="mt-1 text-sm text-muted-foreground">{description}</p>
				</div>
			</Card>
		</Link>
	);
}
