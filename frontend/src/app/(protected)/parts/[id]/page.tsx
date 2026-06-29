"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DetailPageHeader } from "@/components/layout/DetailPageHeader";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { InfoCard } from "@/components/layout/InfoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { Badge, getStatusBadgeVariant } from "@/components/ui/badge";
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
			<div className="flex flex-col gap-5">
				<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Products", href: "/products" }]} />
				<ErrorState title={error} description="Please go back to Products and try again." />
			</div>
		);
	}

	if (!part || !assembly || !product) {
		return (
			<div className="flex flex-col gap-5">
				<Skeleton className="h-5 w-64" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-28 w-full" />
			</div>
		);
	}

	const documents = getDemoDocuments(part.partNumber);
	const trainingResources = getDemoTrainingResources(part.partNumber);

	return (
		<div className="flex flex-col gap-6">
			<Breadcrumbs
				items={[
					{ label: "Dashboard", href: "/dashboard" },
					{ label: "Products", href: "/products" },
					{ label: product.name, href: `/products/${product.id}` },
					{ label: assembly.name, href: `/assemblies/${assembly.id}` },
					{ label: part.name },
				]}
			/>

			<DetailPageHeader title={part.name} identifier={part.partNumber} description={part.description} />

			<section>
				<SectionHeading>Documentation</SectionHeading>
				<DocumentationSection documents={documents} />
			</section>

			<section>
				<SectionHeading>Training</SectionHeading>
				<TrainingSection resources={trainingResources} />
			</section>

			<section>
				<SectionHeading>Part Information</SectionHeading>
				<InfoCard
					fields={[
						{ label: "Part Number", value: part.partNumber },
						{ label: "Status", value: <Badge variant={getStatusBadgeVariant(part.status)}>{part.status}</Badge> },
					]}
				/>
			</section>
		</div>
	);
}
