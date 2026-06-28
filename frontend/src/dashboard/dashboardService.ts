import { getAllProducts } from "@/products/productService";
import { getAssembliesByProductId } from "@/assemblies/assemblyService";
import { getPartsByAssemblyId } from "@/parts/partService";

export interface EngineeringOverviewCounts {
	products: number;
	assemblies: number;
	parts: number;
}

export async function getEngineeringOverviewCounts(): Promise<EngineeringOverviewCounts> {
	const products = await getAllProducts();

	const assembliesByProduct = await Promise.all(
		products.map((product) => getAssembliesByProductId(product.id)),
	);
	const assemblies = assembliesByProduct.flat();

	const partsByAssembly = await Promise.all(
		assemblies.map((assembly) => getPartsByAssemblyId(assembly.id)),
	);
	const parts = partsByAssembly.flat();

	return {
		products: products.length,
		assemblies: assemblies.length,
		parts: parts.length,
	};
}
