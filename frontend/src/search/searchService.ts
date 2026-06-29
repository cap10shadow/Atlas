import { getAllProducts } from "@/products/productService";
import { getAssembliesByProductId } from "@/assemblies/assemblyService";
import { getPartsByAssemblyId } from "@/parts/partService";
import { getAllDocuments } from "@/documents/documentDemoContent";
import { getAllTrainingResources } from "@/training/trainingDemoContent";
import { SearchResultItem, SearchResultType } from "@/search/searchTypes";

export async function buildSearchIndex(): Promise<SearchResultItem[]> {
	const products = await getAllProducts();
	const assembliesByProduct = await Promise.all(products.map((product) => getAssembliesByProductId(product.id)));
	const assemblies = assembliesByProduct.flat();
	const partsByAssembly = await Promise.all(assemblies.map((assembly) => getPartsByAssemblyId(assembly.id)));
	const parts = partsByAssembly.flat();
	const documents = getAllDocuments();
	const trainingResources = getAllTrainingResources();

	return [
		...products.map((product): SearchResultItem => ({
			id: product.id,
			type: "Product",
			title: product.name,
			subtitle: product.productCode,
			href: `/products/${product.id}`,
		})),
		...assemblies.map((assembly): SearchResultItem => ({
			id: assembly.id,
			type: "Assembly",
			title: assembly.name,
			subtitle: assembly.assemblyCode,
			href: `/assemblies/${assembly.id}`,
		})),
		...parts.map((part): SearchResultItem => ({
			id: part.id,
			type: "Part",
			title: part.name,
			subtitle: part.partNumber,
			href: `/parts/${part.id}`,
		})),
		...documents.map((document): SearchResultItem => ({
			id: document.id,
			type: "Document",
			title: document.title,
			subtitle: document.documentType,
			href: `/documents/${document.id}`,
		})),
		...trainingResources.map((resource): SearchResultItem => ({
			id: resource.id,
			type: "Training",
			title: resource.title,
			subtitle: `${resource.durationMinutes} min · ${resource.skillLevel}`,
			href: `/training/${resource.id}`,
		})),
	];
}

export function filterSearchIndex(index: SearchResultItem[], query: string): SearchResultItem[] {
	const normalized = query.trim().toLowerCase();

	if (!normalized) {
		return [];
	}

	return index.filter(
		(item) => item.title.toLowerCase().includes(normalized) || item.subtitle.toLowerCase().includes(normalized),
	);
}

export function groupSearchResults(results: SearchResultItem[]): Record<SearchResultType, SearchResultItem[]> {
	const groups: Record<SearchResultType, SearchResultItem[]> = {
		Product: [],
		Assembly: [],
		Part: [],
		Document: [],
		Training: [],
	};

	for (const result of results) {
		groups[result.type].push(result);
	}

	return groups;
}
