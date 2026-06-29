import { FileText } from "lucide-react";

export function PdfPreview() {
	return (
		<div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 text-center">
			<FileText className="size-6 text-muted-foreground" aria-hidden="true" />
			<p className="max-w-sm text-sm text-muted-foreground">
				Document preview will be available in the portfolio version.
			</p>
		</div>
	);
}
