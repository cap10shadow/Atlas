import { ReactNode } from "react";

interface SectionHeadingProps {
	children: ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
	return (
		<h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{children}</h3>
	);
}
