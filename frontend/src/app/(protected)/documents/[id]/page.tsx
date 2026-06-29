"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Download, Printer, Share2 } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DetailPageHeader } from "@/components/layout/DetailPageHeader";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { InfoCard } from "@/components/layout/InfoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { getDocumentById } from "@/documents/documentDemoContent";
import { PdfPreview } from "@/documents/PdfPreview";
import { getPartHierarchyByPartNumber, PartHierarchy } from "@/parts/partHierarchy";

export default function DocumentDetailsPage() {
	const params = useParams<{ id: string }>();

	const doc = useMemo(() => getDocumentById(params.id), [params.id]);
	const [hierarchyResult, setHierarchyResult] = useState<{
		partNumber: string;
		hierarchy: PartHierarchy | null;
		error: string | null;
	} | null>(null);

	usePageTitle(doc ? doc.title : "Document Details");

	useEffect(() => {
		if (!doc) {
			return;
		}

		let isMounted = true;

		getPartHierarchyByPartNumber(doc.partNumber)
			.then((result) => {
				if (isMounted) {
					setHierarchyResult({ partNumber: doc.partNumber, hierarchy: result, error: null });
				}
			})
			.catch(() => {
				if (isMounted) {
					setHierarchyResult({
						partNumber: doc.partNumber,
						hierarchy: null,
						error: "Unable to load related engineering information.",
					});
				}
			});

		return () => {
			isMounted = false;
		};
	}, [doc]);

	const isCurrentHierarchy = doc && hierarchyResult?.partNumber === doc.partNumber;
	const hierarchy = isCurrentHierarchy ? hierarchyResult.hierarchy : null;
	const error = isCurrentHierarchy ? hierarchyResult.error : null;

	if (!doc) {
		return (
			<div className="flex flex-col gap-5">
				<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Documents", href: "/documents" }]} />
				<ErrorState title="Document not found." description="Please go back to Documents and try again." />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<Breadcrumbs
				items={[
					{ label: "Dashboard", href: "/dashboard" },
					{ label: "Documents", href: "/documents" },
					{ label: doc.title },
				]}
			/>

			<DetailPageHeader title={doc.title} identifier={doc.documentType} description={doc.description} />

			<section>
				<SectionHeading>Document Preview</SectionHeading>
				<PdfPreview />
				<div className="mt-3 flex items-center gap-2">
					<Button variant="outline" disabled>
						<Download className="size-4" aria-hidden="true" />
						Download
					</Button>
					<Button variant="outline" disabled>
						<Printer className="size-4" aria-hidden="true" />
						Print
					</Button>
					<Button variant="outline" disabled>
						<Share2 className="size-4" aria-hidden="true" />
						Share
					</Button>
				</div>
			</section>

			<section>
				<SectionHeading>Document Information</SectionHeading>
				<InfoCard
					fields={[
						{ label: "Document Type", value: doc.documentType },
						{ label: "Revision", value: doc.revision },
						{ label: "Version", value: doc.version },
						{ label: "Language", value: doc.language },
						{ label: "Published", value: doc.publishedDate },
						{ label: "Last Updated", value: doc.lastUpdated },
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
