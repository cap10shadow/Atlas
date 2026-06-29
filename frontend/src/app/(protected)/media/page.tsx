"use client";

import { Image as ImageIcon } from "lucide-react";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";

export default function MediaPage() {
	usePageTitle("Media");

	return (
		<div className="flex flex-col gap-5">
			<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Media" }]} />

			<div>
				<h2 className="text-2xl font-bold tracking-tight text-foreground">Media</h2>
				<p className="mt-0.5 text-[13px] text-muted-foreground">Images and multimedia linked to engineering parts.</p>
			</div>

			<EmptyState
				icon={ImageIcon}
				title="Media Not Yet Available"
				description="Media management will be available in a future release."
			/>
		</div>
	);
}
