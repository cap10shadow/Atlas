import { apiRequest } from "@/services/api-client";
import { Part } from "@/parts/partTypes";

export function getPartsByAssemblyId(assemblyId: string): Promise<Part[]> {
	return apiRequest<Part[]>(`/assemblies/${assemblyId}/parts`);
}

export function getPartById(id: string): Promise<Part> {
	return apiRequest<Part>(`/parts/${id}`);
}
