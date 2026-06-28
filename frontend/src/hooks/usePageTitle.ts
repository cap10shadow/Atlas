"use client";

import { useEffect } from "react";
import { usePageHeader } from "@/components/layout/PageHeaderContext";

export function usePageTitle(title: string): void {
	const { setTitle } = usePageHeader();

	useEffect(() => {
		setTitle(title);
	}, [title, setTitle]);
}
