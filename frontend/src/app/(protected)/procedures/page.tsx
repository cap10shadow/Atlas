"use client";

import { ClipboardList } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";

export default function ProceduresPage() {
	usePageTitle("Procedures");

	return (
		<div className="flex flex-col gap-5">
			<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Procedures" }]} />

			<div>
				<h2 className="text-2xl font-bold tracking-tight text-foreground">Procedures</h2>
				<p className="mt-0.5 text-[13px] text-muted-foreground">Maintenance procedures linked to engineering parts.</p>
			</div>

			<EmptyState
				icon={ClipboardList}
				title="Procedures Not Yet Available"
				description="Maintenance procedures will be available in a future release."
			/>
		</div>
	);
}
