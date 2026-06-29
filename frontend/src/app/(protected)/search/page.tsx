"use client";

import { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { buildSearchIndex, filterSearchIndex, groupSearchResults } from "@/search/searchService";
import { SearchResultItem, SearchResultType } from "@/search/searchTypes";
import { SearchResultRow } from "@/search/SearchResultRow";

const GROUP_ORDER: SearchResultType[] = ["Product", "Assembly", "Part", "Document", "Training"];

const GROUP_LABELS: Record<SearchResultType, string> = {
	Product: "Products",
	Assembly: "Assemblies",
	Part: "Parts",
	Document: "Documents",
	Training: "Training",
};

export default function SearchPage() {
	usePageTitle("Search");

	const [query, setQuery] = useState("");
	const [index, setIndex] = useState<SearchResultItem[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		buildSearchIndex()
			.then((result) => {
				if (isMounted) {
					setIndex(result);
				}
			})
			.catch(() => {
				if (isMounted) {
					setError("Unable to load search index.");
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	const results = useMemo(() => (index ? filterSearchIndex(index, query) : []), [index, query]);
	const grouped = useMemo(() => groupSearchResults(results), [results]);
	const hasQuery = query.trim().length > 0;

	return (
		<div className="flex flex-col gap-5">
			<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Search" }]} />

			<div>
				<h2 className="text-2xl font-bold tracking-tight text-foreground">Search</h2>
				<p className="mt-0.5 text-[13px] text-muted-foreground">
					Search across products, assemblies, parts, documents and training resources.
				</p>
			</div>

			<div className="relative max-w-md">
				<SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
				<input
					type="search"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder="Search the engineering hierarchy..."
					aria-label="Search"
					className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
				/>
			</div>

			{error ? (
				<ErrorState title={error} description="Please refresh the page or try again later." />
			) : index === null ? (
				<div className="flex flex-col gap-2">
					{Array.from({ length: 3 }).map((_, skeletonIndex) => (
						<Skeleton key={skeletonIndex} className="h-14 w-full" />
					))}
				</div>
			) : !hasQuery ? (
				<EmptyState
					icon={SearchIcon}
					title="Start Searching"
					description="Type a product, assembly, part, document or training name to begin."
				/>
			) : results.length === 0 ? (
				<EmptyState
					icon={SearchIcon}
					title="No Results Found"
					description={`No matches were found for "${query}".`}
				/>
			) : (
				<div className="flex flex-col gap-5">
					{GROUP_ORDER.map((type) => {
						const items = grouped[type];
						if (items.length === 0) {
							return null;
						}

						return (
							<section key={type}>
								<SectionHeading>{GROUP_LABELS[type]}</SectionHeading>
								<div className="flex flex-col gap-2">
									{items.map((item) => (
										<SearchResultRow key={`${item.type}-${item.id}`} result={item} />
									))}
								</div>
							</section>
						);
					})}
				</div>
			)}
		</div>
	);
}
