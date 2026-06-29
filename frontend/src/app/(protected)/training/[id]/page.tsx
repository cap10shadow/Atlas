"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DetailPageHeader } from "@/components/layout/DetailPageHeader";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { InfoCard } from "@/components/layout/InfoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { Badge } from "@/components/ui/badge";
import { getTrainingResourceById } from "@/training/trainingDemoContent";
import { VideoPlayer } from "@/training/VideoPlayer";
import { getPartHierarchyByPartNumber, PartHierarchy } from "@/parts/partHierarchy";

export default function TrainingDetailsPage() {
	const params = useParams<{ id: string }>();

	const resource = useMemo(() => getTrainingResourceById(params.id), [params.id]);
	const [hierarchyResult, setHierarchyResult] = useState<{
		partNumber: string;
		hierarchy: PartHierarchy | null;
		error: string | null;
	} | null>(null);

	usePageTitle(resource ? resource.title : "Training Details");

	useEffect(() => {
		if (!resource) {
			return;
		}

		let isMounted = true;

		getPartHierarchyByPartNumber(resource.partNumber)
			.then((result) => {
				if (isMounted) {
					setHierarchyResult({ partNumber: resource.partNumber, hierarchy: result, error: null });
				}
			})
			.catch(() => {
				if (isMounted) {
					setHierarchyResult({
						partNumber: resource.partNumber,
						hierarchy: null,
						error: "Unable to load related engineering information.",
					});
				}
			});

		return () => {
			isMounted = false;
		};
	}, [resource]);

	const isCurrentHierarchy = resource && hierarchyResult?.partNumber === resource.partNumber;
	const hierarchy = isCurrentHierarchy ? hierarchyResult.hierarchy : null;
	const error = isCurrentHierarchy ? hierarchyResult.error : null;

	if (!resource) {
		return (
			<div className="flex flex-col gap-5">
				<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Training", href: "/training" }]} />
				<ErrorState title="Training resource not found." description="Please go back to Training and try again." />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<Breadcrumbs
				items={[
					{ label: "Dashboard", href: "/dashboard" },
					{ label: "Training", href: "/training" },
					{ label: resource.title },
				]}
			/>

			<DetailPageHeader title={resource.title} identifier={resource.partNumber} description={resource.description} />

			<section>
				<SectionHeading>Training Video</SectionHeading>
				<VideoPlayer videoUrl={resource.videoUrl} title={resource.title} />
			</section>

			<section>
				<SectionHeading>Training Information</SectionHeading>
				<InfoCard
					fields={[
						{ label: "Duration", value: `${resource.durationMinutes} minutes` },
						{ label: "Skill Level", value: resource.skillLevel },
						{ label: "Version", value: resource.version },
						{ label: "Language", value: resource.language },
						{ label: "Last Updated", value: resource.lastUpdated },
						{ label: "Status", value: <Badge variant="green">{resource.status}</Badge> },
					]}
				/>
			</section>

			<section>
				<SectionHeading>Related Resources</SectionHeading>
				{error ? (
					<ErrorState title={error} description="Please refresh the page or try again later." />
				) : !hierarchy ? (
					<Skeleton className="h-20 w-full" />
				) : (
					<InfoCard
						fields={[
							{
								label: "Related Product",
								value: (
									<Link href={`/products/${hierarchy.product.id}`} className="text-primary hover:underline">
										{hierarchy.product.name}
									</Link>
								),
							},
							{
								label: "Related Assembly",
								value: (
									<Link href={`/assemblies/${hierarchy.assembly.id}`} className="text-primary hover:underline">
										{hierarchy.assembly.name}
									</Link>
								),
							},
							{
								label: "Related Part",
								value: (
									<Link href={`/parts/${hierarchy.part.id}`} className="text-primary hover:underline">
										{hierarchy.part.name}
									</Link>
								),
							},
						]}
					/>
				)}
			</section>
		</div>
	);
}
