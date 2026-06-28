"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface PageHeaderContextValue {
	title: string;
	setTitle: (title: string) => void;
}

const PageHeaderContext = createContext<PageHeaderContextValue | undefined>(undefined);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
	const [title, setTitle] = useState("Atlas");

	return (
		<PageHeaderContext.Provider value={{ title, setTitle }}>
			{children}
		</PageHeaderContext.Provider>
	);
}

export function usePageHeader(): PageHeaderContextValue {
	const context = useContext(PageHeaderContext);
	if (!context) {
		throw new Error("usePageHeader must be used within a PageHeaderProvider");
	}
	return context;
}
