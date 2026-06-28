"use client";

import { usePageTitle } from "@/hooks/usePageTitle";

export default function AdministrationPage() {
	usePageTitle("Administration");

	return <h1 className="text-2xl font-semibold">Administration</h1>;
}
