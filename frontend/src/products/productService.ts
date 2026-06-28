import { apiRequest } from "@/services/api-client";
import { Product } from "@/products/productTypes";

export function getAllProducts(): Promise<Product[]> {
	return apiRequest<Product[]>("/products");
}

export function getProductById(id: string): Promise<Product> {
	return apiRequest<Product>(`/products/${id}`);
}
