import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
	return (
		<nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
			{items.map((item, index) => {
				const isLast = index === items.length - 1;

				return (
					<span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
						{index > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
						{item.href && !isLast ? (
							<Link href={item.href} className="hover:text-foreground hover:underline">
								{item.label}
							</Link>
						) : (
							<span className={isLast ? "font-medium text-foreground" : undefined}>
								{item.label}
							</span>
						)}
					</span>
				);
			})}
		</nav>
	);
}
