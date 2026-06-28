"use client";

import { usePageTitle } from "@/hooks/usePageTitle";

export default function SearchPage() {
	usePageTitle("Search");

	return <h1 className="text-2xl font-semibold">Search</h1>;
}
