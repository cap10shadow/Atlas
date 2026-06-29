"use client";

import { FileText } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { getAllDocuments } from "@/documents/documentDemoContent";
import { DocumentCard } from "@/documents/DocumentCard";

export default function DocumentsPage() {
	usePageTitle("Documents");

	const documents = getAllDocuments();

	return (
		<div className="flex flex-col gap-5">
			<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Documents" }]} />

			<div>
				<h2 className="text-2xl font-bold tracking-tight text-foreground">Documents</h2>
				<p className="mt-0.5 text-[13px] text-muted-foreground">
					Access technical documentation and manuals linked to engineering parts.
				</p>
			</div>

			{documents.length === 0 ? (
				<EmptyState
					icon={FileText}
					title="No Documents Available"
					description="No engineering documents have been linked."
				/>
			) : (
				<div className="flex flex-col gap-2">
					{documents.map((document) => (
						<DocumentCard key={document.id} document={document} />
					))}
				</div>
			)}
		</div>
	);
}
