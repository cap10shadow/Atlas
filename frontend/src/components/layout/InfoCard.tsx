import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface InfoField {
	label: string;
	value: ReactNode;
}

interface InfoCardProps {
	fields: InfoField[];
}

export function InfoCard({ fields }: InfoCardProps) {
	return (
		<Card>
			<dl className="grid grid-cols-2 gap-3 text-sm">
				{fields.map((field) => (
					<div key={field.label}>
						<dt className="text-xs text-muted-foreground">{field.label}</dt>
						<dd className="mt-1 font-medium text-foreground">{field.value}</dd>
					</div>
				))}
			</dl>
		</Card>
	);
}
