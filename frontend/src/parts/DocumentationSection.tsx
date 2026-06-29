import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/EmptyState";
import { DemoDocument } from "@/parts/partDemoContent";

interface DocumentationSectionProps {
	documents: DemoDocument[];
}

export function DocumentationSection({ documents }: DocumentationSectionProps) {
	if (documents.length === 0) {
		return (
			<EmptyState
				icon={FileText}
				title="No Documentation Available"
				description="Documentation has not yet been added for this part."
			/>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{documents.map((document) => (
				<Card key={document.id} className="flex-row items-center gap-3 py-3">
					<FileText className="size-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
					<div>
						<h4 className="text-sm font-semibold text-foreground">{document.title}</h4>
						<p className="text-sm text-muted-foreground">{document.documentType}</p>
					</div>
				</Card>
			))}
		</div>
	);
}
