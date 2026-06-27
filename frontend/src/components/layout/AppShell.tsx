import { ReactNode } from "react";

interface AppShellProps {
	children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b px-6 py-4">
				<span className="text-sm font-semibold">Atlas</span>
			</header>
			<main className="flex-1 p-6">{children}</main>
		</div>
	);
}
