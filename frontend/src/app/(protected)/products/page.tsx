"use client";

import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { getAllProducts } from "@/products/productService";
import { getProductLifecycleStatus, ProductLifecycleStatus } from "@/products/productStatus";
import { Product } from "@/products/productTypes";
import { ProductCard } from "@/products/ProductCard";

interface ProductWithStatus {
	product: Product;
	lifecycleStatus: ProductLifecycleStatus;
}

export default function ProductsPage() {
	usePageTitle("Products");

	const [items, setItems] = useState<ProductWithStatus[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		getAllProducts()
			.then(async (products) => {
				const withStatus = await Promise.all(
					products.map(async (product) => ({
						product,
						lifecycleStatus: await getProductLifecycleStatus(product),
					})),
				);
				if (isMounted) {
					setItems(withStatus);
				}
			})
			.catch(() => {
				if (isMounted) {
					setError("Unable to load Products.");
				}
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className="flex flex-col gap-5">
			<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Products" }]} />

			<div>
				<h2 className="text-2xl font-bold tracking-tight text-foreground">Products</h2>
				<p className="mt-0.5 text-[13px] text-muted-foreground">
					Browse engineering products, assemblies, and parts.
				</p>
			</div>

			{error ? (
				<ErrorState title="Unable to load Products." description="Please refresh the page or try again later." />
			) : items === null ? (
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 4 }).map((_, index) => (
						<Skeleton key={index} className="h-28 w-full" />
					))}
				</div>
			) : items.length === 0 ? (
				<EmptyState
					icon={Package}
					title="No Products"
					description="Products will appear here once they are created."
				/>
			) : (
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{items.map(({ product, lifecycleStatus }) => (
						<ProductCard key={product.id} product={product} lifecycleStatus={lifecycleStatus} />
					))}
				</div>
			)}
		</div>
	);
}
