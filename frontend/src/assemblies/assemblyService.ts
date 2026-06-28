import { apiRequest } from "@/services/api-client";
import { Assembly } from "@/assemblies/assemblyTypes";

export function getAssembliesByProductId(productId: string): Promise<Assembly[]> {
	return apiRequest<Assembly[]>(`/products/${productId}/assemblies`);
}

export function getAssemblyById(id: string): Promise<Assembly> {
	return apiRequest<Assembly>(`/assemblies/${id}`);
}
