import Link from "next/link";
import { FileText, GraduationCap, LucideIcon, Package, PackageSearch, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SearchResultItem, SearchResultType } from "@/search/searchTypes";

const TYPE_ICONS: Record<SearchResultType, LucideIcon> = {
	Product: Package,
	Assembly: PackageSearch,
	Part: Wrench,
	Document: FileText,
	Training: GraduationCap,
};

interface SearchResultRowProps {
	result: SearchResultItem;
}

export function SearchResultRow({ result }: SearchResultRowProps) {
	const Icon = TYPE_ICONS[result.type];

	return (
		<Link href={result.href} className="block">
			<Card className="flex-row items-center gap-3 py-3 transition-colors duration-150 hover:border-primary/40 hover:bg-accent/30">
				<Icon className="size-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
				<div>
					<h4 className="text-sm font-semibold text-foreground">{result.title}</h4>
					<p className="text-sm text-muted-foreground">{result.subtitle}</p>
				</div>
			</Card>
		</Link>
	);
}
