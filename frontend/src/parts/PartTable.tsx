import Link from "next/link";
import { Part } from "@/parts/partTypes";

interface PartTableProps {
	parts: Part[];
}

export function PartTable({ parts }: PartTableProps) {
	return (
		<div className="overflow-hidden rounded-[12px] border border-border">
			<table className="w-full text-sm">
				<thead className="bg-muted">
					<tr>
						<th className="px-4 py-2 text-left font-medium text-muted-foreground">Name</th>
						<th className="px-4 py-2 text-left font-medium text-muted-foreground">Part Number</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{parts.map((part) => (
						<tr key={part.id} className="hover:bg-muted/50">
							<td className="p-0">
								<Link href={`/parts/${part.id}`} className="block px-4 py-3 font-medium text-foreground">
									{part.name}
								</Link>
							</td>
							<td className="p-0">
								<Link href={`/parts/${part.id}`} className="block px-4 py-3 text-muted-foreground">
									{part.partNumber}
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
