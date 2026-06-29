"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PackageSearch } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DetailPageHeader } from "@/components/layout/DetailPageHeader";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { InfoCard } from "@/components/layout/InfoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { Badge, getStatusBadgeVariant } from "@/components/ui/badge";
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
			<div className="flex flex-col gap-5">
				<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Products", href: "/products" }]} />
				<ErrorState title={error} description="Please go back to Products and try again." />
			</div>
		);
	}

	if (!product || assemblies === null) {
		return (
			<div className="flex flex-col gap-5">
				<Skeleton className="h-5 w-64" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-32 w-full" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-5">
			<Breadcrumbs
				items={[
					{ label: "Dashboard", href: "/dashboard" },
					{ label: "Products", href: "/products" },
					{ label: product.name },
				]}
			/>

			<DetailPageHeader title={product.name} identifier={product.productCode} description={product.description} />

			<section>
				<SectionHeading>Assemblies</SectionHeading>
				{assemblies.length === 0 ? (
					<EmptyState
						icon={PackageSearch}
						title="No Assemblies Published"
						description="No assemblies have been published for this product."
					/>
				) : (
					<AssemblyTable assemblies={assemblies} />
				)}
			</section>

			<section>
				<SectionHeading>Product Information</SectionHeading>
				<InfoCard
					fields={[
						{ label: "Product Code", value: product.productCode },
						{ label: "Status", value: <Badge variant={getStatusBadgeVariant(product.status)}>{product.status}</Badge> },
					]}
				/>
			</section>
		</div>
	);
}
