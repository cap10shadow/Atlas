import Link from "next/link";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EngineeringDocument } from "@/documents/documentTypes";

interface DocumentCardProps {
	document: EngineeringDocument;
}

export function DocumentCard({ document }: DocumentCardProps) {
	return (
		<Link href={`/documents/${document.id}`} className="block">
			<Card className="flex-row items-center gap-3 py-3 transition-colors duration-150 hover:border-primary/40 hover:bg-accent/30">
				<FileText className="size-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
				<div className="flex flex-1 items-center justify-between gap-2">
					<div>
						<h4 className="text-sm font-semibold text-foreground">{document.title}</h4>
						<p className="text-sm text-muted-foreground">{document.documentType}</p>
					</div>
					<Badge variant="gray">Rev {document.revision}</Badge>
				</div>
			</Card>
		</Link>
	);
}
