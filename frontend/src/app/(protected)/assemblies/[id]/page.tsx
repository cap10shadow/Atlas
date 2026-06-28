"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Wrench } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAssemblyById } from "@/assemblies/assemblyService";
import { Assembly } from "@/assemblies/assemblyTypes";
import { getProductById } from "@/products/productService";
import { Product } from "@/products/productTypes";
import { getPartsByAssemblyId } from "@/parts/partService";
import { Part } from "@/parts/partTypes";
import { PartTable } from "@/parts/PartTable";
import { ApiError } from "@/services/api-client";

export default function AssemblyDetailsPage() {
	const params = useParams<{ id: string }>();

	const [assembly, setAssembly] = useState<Assembly | null>(null);
	const [product, setProduct] = useState<Product | null>(null);
	const [parts, setParts] = useState<Part[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	usePageTitle(assembly ? assembly.name : "Assembly Details");

	useEffect(() => {
		let isMounted = true;

		getAssemblyById(params.id)
			.then(async (assemblyResult) => {
				const [productResult, partsResult] = await Promise.all([
					getProductById(assemblyResult.productId),
					getPartsByAssemblyId(assemblyResult.id),
				]);

				if (isMounted) {
					setAssembly(assemblyResult);
					setProduct(productResult);
					setParts(partsResult);
				}
			})
			.catch((err) => {
				if (!isMounted) {
					return;
				}
				setError(err instanceof ApiError && err.status === 404 ? "Assembly not found." : "Unable to load this assembly.");
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

	if (!assembly || !product || parts === null) {
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
					{ label: product.name, href: `/products/${product.id}` },
					{ label: assembly.name },
				]}
			/>

			<div className="flex flex-col gap-2 border-b border-border pb-6">
				<div className="flex items-center gap-3">
					<h2 className="text-2xl font-bold text-foreground">{assembly.name}</h2>
					<Badge variant="blue">{assembly.assemblyCode}</Badge>
				</div>
				{assembly.description && <p className="text-sm text-muted-foreground">{assembly.description}</p>}
			</div>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Parts</h3>
				{parts.length === 0 ? (
					<EmptyState
						icon={Wrench}
						title="No Engineering Data Yet"
						description="Engineering data has not yet been added for this assembly."
					/>
				) : (
					<PartTable parts={parts} />
				)}
			</section>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Assembly Information</h3>
				<Card>
					<dl className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<dt className="text-muted-foreground">Assembly Code</dt>
							<dd className="font-medium text-foreground">{assembly.assemblyCode}</dd>
						</div>
						<div>
							<dt className="text-muted-foreground">Status</dt>
							<dd className="font-medium text-foreground">{assembly.status}</dd>
						</div>
					</dl>
				</Card>
			</section>
		</div>
	);
}
