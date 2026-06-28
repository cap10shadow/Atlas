"use client";

import { usePageTitle } from "@/hooks/usePageTitle";

export default function DocumentsPage() {
	usePageTitle("Documents");

	return <h1 className="text-2xl font-semibold">Documents</h1>;
}
