"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPartById } from "@/parts/partService";
import { Part } from "@/parts/partTypes";
import { getAssemblyById } from "@/assemblies/assemblyService";
import { Assembly } from "@/assemblies/assemblyTypes";
import { getProductById } from "@/products/productService";
import { Product } from "@/products/productTypes";
import { getDemoDocuments, getDemoTrainingResources } from "@/parts/partDemoContent";
import { DocumentationSection } from "@/parts/DocumentationSection";
import { TrainingSection } from "@/parts/TrainingSection";
import { ApiError } from "@/services/api-client";

export default function PartDetailsPage() {
	const params = useParams<{ id: string }>();

	const [part, setPart] = useState<Part | null>(null);
	const [assembly, setAssembly] = useState<Assembly | null>(null);
	const [product, setProduct] = useState<Product | null>(null);
	const [error, setError] = useState<string | null>(null);

	usePageTitle(part ? part.name : "Part Details");

	useEffect(() => {
		let isMounted = true;

		getPartById(params.id)
			.then(async (partResult) => {
				const assemblyResult = await getAssemblyById(partResult.assemblyId);
				const productResult = await getProductById(assemblyResult.productId);

				if (isMounted) {
					setPart(partResult);
					setAssembly(assemblyResult);
					setProduct(productResult);
				}
			})
			.catch((err) => {
				if (!isMounted) {
					return;
				}
				setError(err instanceof ApiError && err.status === 404 ? "Part not found." : "Unable to load this part.");
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

	if (!part || !assembly || !product) {
		return (
			<div className="flex flex-col gap-6">
				<Skeleton className="h-5 w-64" />
				<Skeleton className="h-20 w-full" />
				<Skeleton className="h-32 w-full" />
			</div>
		);
	}

	const documents = getDemoDocuments(part.partNumber);
	const trainingResources = getDemoTrainingResources(part.partNumber);

	return (
		<div className="flex flex-col gap-8">
			<Breadcrumbs
				items={[
					{ label: "Dashboard", href: "/dashboard" },
					{ label: "Products", href: "/products" },
					{ label: product.name, href: `/products/${product.id}` },
					{ label: assembly.name, href: `/assemblies/${assembly.id}` },
					{ label: part.name },
				]}
			/>

			<div className="flex flex-col gap-2 border-b border-border pb-6">
				<div className="flex items-center gap-3">
					<h2 className="text-2xl font-bold text-foreground">{part.name}</h2>
					<Badge variant="blue">{part.partNumber}</Badge>
				</div>
				{part.description && <p className="text-sm text-muted-foreground">{part.description}</p>}
			</div>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Documentation</h3>
				<DocumentationSection documents={documents} />
			</section>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Training</h3>
				<TrainingSection resources={trainingResources} />
			</section>

			<section>
				<h3 className="mb-4 text-lg font-semibold text-foreground">Part Information</h3>
				<Card>
					<dl className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<dt className="text-muted-foreground">Part Number</dt>
							<dd className="font-medium text-foreground">{part.partNumber}</dd>
						</div>
						<div>
							<dt className="text-muted-foreground">Status</dt>
							<dd className="font-medium text-foreground">{part.status}</dd>
						</div>
					</dl>
				</Card>
			</section>
		</div>
	);
}
