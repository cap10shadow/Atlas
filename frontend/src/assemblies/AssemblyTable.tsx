import Link from "next/link";
import { Assembly } from "@/assemblies/assemblyTypes";

interface AssemblyTableProps {
	assemblies: Assembly[];
}

export function AssemblyTable({ assemblies }: AssemblyTableProps) {
	return (
		<div className="overflow-hidden rounded-[12px] border border-border">
			<table className="w-full text-sm">
				<thead className="bg-muted">
					<tr>
						<th className="px-4 py-2 text-left font-medium text-muted-foreground">Name</th>
						<th className="px-4 py-2 text-left font-medium text-muted-foreground">Assembly Code</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{assemblies.map((assembly) => (
						<tr key={assembly.id} className="hover:bg-muted/50">
							<td className="p-0">
								<Link href={`/assemblies/${assembly.id}`} className="block px-4 py-3 font-medium text-foreground">
									{assembly.name}
								</Link>
							</td>
							<td className="p-0">
								<Link href={`/assemblies/${assembly.id}`} className="block px-4 py-3 text-muted-foreground">
									{assembly.assemblyCode}
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
