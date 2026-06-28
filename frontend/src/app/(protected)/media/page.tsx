"use client";

import { usePageTitle } from "@/hooks/usePageTitle";

export default function MediaPage() {
	usePageTitle("Media");

	return <h1 className="text-2xl font-semibold">Media</h1>;
}
