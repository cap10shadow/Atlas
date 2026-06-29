"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Wrench } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DetailPageHeader } from "@/components/layout/DetailPageHeader";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { InfoCard } from "@/components/layout/InfoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { EmptyState } from "@/components/EmptyState";
import { Badge, getStatusBadgeVariant } from "@/components/ui/badge";
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
			<div className="flex flex-col gap-5">
				<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Products", href: "/products" }]} />
				<ErrorState title={error} description="Please go back to Products and try again." />
			</div>
		);
	}

	if (!assembly || !product || parts === null) {
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
					{ label: product.name, href: `/products/${product.id}` },
					{ label: assembly.name },
				]}
			/>

			<DetailPageHeader title={assembly.name} identifier={assembly.assemblyCode} description={assembly.description} />

			<section>
				<SectionHeading>Parts</SectionHeading>
				{parts.length === 0 ? (
					<EmptyState
						icon={Wrench}
						title="No Parts Yet"
						description="No parts have been created for this assembly yet."
					/>
				) : (
					<PartTable parts={parts} />
				)}
			</section>

			<section>
				<SectionHeading>Assembly Information</SectionHeading>
				<InfoCard
					fields={[
						{ label: "Assembly Code", value: assembly.assemblyCode },
						{ label: "Status", value: <Badge variant={getStatusBadgeVariant(assembly.status)}>{assembly.status}</Badge> },
					]}
				/>
			</section>
		</div>
	);
}
