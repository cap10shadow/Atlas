"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/products/productService";
import { Product } from "@/products/productTypes";
import { getAssembliesByProductId } from "@/assemblies/assemblyService";
import { Assembly } from "@/assemblies/assemblyTypes";
import { AssemblyTable } from "@/assemblies/AssemblyTable";
import { ApiError } from "@/services/api-client";

export default function ProductDetailsPage() {
	const params = useParams<{ id: string }>();

	const [product, setProduct] = useState<Product | null>(null);
	const [assemblies, setAssemblies] = useState<Assembly[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	usePageTitle(product ? product.name : "Product Details");

	useEffect(() => {
		let isMounted = true;

		Promise.all([getProductById(params.id), getAssembliesByProductId(params.id)])
			.then(([productResult, assembliesResult]) => {
				if (isMounted) {
					setProduct(productResult);
					setAssemblies(assembliesResult);
				}
			})
			.catch((err) => {
				if (!isMounted) {
					return;
				}
				setError(err instanceof ApiError && err.status === 404 ? "Product not found." : "Unable to load this product.");
			});

		return () => {
			isMounted = false;
		};
	}, [params.id]);

	if (error) {
		return (
			<div className="flex flex-col gap-6">
				<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Products", href: "/products" }]} />
				<ErrorState title={error} description="Please go back to Products and try again." />
			</div>
		);
	}

	if (!product || assemblies === null) {
		return (
			<div className="flex flex-col gap-6">
				<Skeleton className="h-5 w-64" />
				<Skeleton className="h-20 w-full" />
				<Skeleton className="h-40 w-full" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<Breadcrumbs
				items={[
					{ label: "Dashboard", href: "/dashboard" },
					{ label: "Products", href: "/products" },
					{ label: product.name },
				]}
			/>

			<div className="flex flex-col gap-2 border-b border-border pb-6">
				<div className="flex items-center gap-3">
					<h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
					<Badge variant="blue">{product.productCode}</Badge>
				</div>
				{product.description && <p className="text-sm text-muted-foreground">{product.description}</p>}
			</div>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Assemblies</h3>
				{assemblies.length === 0 ? (
					<EmptyState
						icon={PackageSearch}
						title="No Engineering Data Yet"
						description="Engineering data has not yet been added for this product."
					/>
				) : (
					<AssemblyTable assemblies={assemblies} />
				)}
			</section>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Product Information</h3>
				<Card>
					<dl className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<dt className="text-muted-foreground">Product Code</dt>
							<dd className="font-medium text-foreground">{product.productCode}</dd>
						</div>
						<div>
							<dt className="text-muted-foreground">Status</dt>
							<dd className="font-medium text-foreground">{product.status}</dd>
						</div>
					</dl>
				</Card>
			</section>
		</div>
	);
}
