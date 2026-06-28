import { getAssembliesByProductId } from "@/assemblies/assemblyService";
import { Product } from "@/products/productTypes";

export type ProductLifecycleStatus = "Complete" | "Planned";

export async function getProductLifecycleStatus(product: Product): Promise<ProductLifecycleStatus> {
	const assemblies = await getAssembliesByProductId(product.id);
	return assemblies.length > 0 ? "Complete" : "Planned";
}
