import { getAllProducts } from "@/products/productService";
import { Product } from "@/products/productTypes";
import { getAssembliesByProductId } from "@/assemblies/assemblyService";
import { Assembly } from "@/assemblies/assemblyTypes";
import { getPartsByAssemblyId } from "@/parts/partService";
import { Part } from "@/parts/partTypes";

export interface PartHierarchy {
	product: Product;
	assembly: Assembly;
	part: Part;
}

export async function getPartHierarchyByPartNumber(partNumber: string): Promise<PartHierarchy | null> {
	const products = await getAllProducts();

	for (const product of products) {
		const assemblies = await getAssembliesByProductId(product.id);

		for (const assembly of assemblies) {
			const parts = await getPartsByAssemblyId(assembly.id);
			const part = parts.find((candidate) => candidate.partNumber === partNumber);

			if (part) {
				return { product, assembly, part };
			}
		}
	}

	return null;
}
