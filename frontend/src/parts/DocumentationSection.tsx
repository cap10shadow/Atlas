import { FileText } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { EngineeringDocument } from "@/documents/documentTypes";
import { DocumentCard } from "@/documents/DocumentCard";

interface DocumentationSectionProps {
	documents: EngineeringDocument[];
}

export function DocumentationSection({ documents }: DocumentationSectionProps) {
	if (documents.length === 0) {
		return (
			<EmptyState
				icon={FileText}
				title="No Documentation Available"
				description="No engineering documents have been linked to this part."
			/>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{documents.map((document) => (
				<DocumentCard key={document.id} document={document} />
			))}
		</div>
	);
}
