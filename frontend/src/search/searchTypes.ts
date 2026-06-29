export type SearchResultType = "Product" | "Assembly" | "Part" | "Document" | "Training";

export interface SearchResultItem {
	id: string;
	type: SearchResultType;
	title: string;
	subtitle: string;
	href: string;
}
