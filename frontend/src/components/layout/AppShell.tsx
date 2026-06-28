"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/authentication/AuthProvider";

interface AppShellProps {
	children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
	const { user, isAuthenticated, logout } = useAuth();
	const router = useRouter();

	async function handleLogout() {
		await logout();
		router.replace("/login");
	}

	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex items-center justify-between border-b px-6 py-4">
				<span className="text-sm font-semibold">Atlas</span>
				{isAuthenticated && user && (
					<div className="flex items-center gap-3 text-sm">
						<span>
							{user.firstName ?? user.email} ({user.role})
						</span>
						<Button variant="outline" size="sm" onClick={handleLogout}>
							Log out
						</Button>
					</div>
				)}
			</header>
			<main className="flex-1 p-6">{children}</main>
		</div>
	);
}
