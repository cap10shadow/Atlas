"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/authentication/AuthProvider";
import { usePageHeader } from "@/components/layout/PageHeaderContext";

export function Header() {
	const { user, isAuthenticated, logout } = useAuth();
	const { title } = usePageHeader();
	const router = useRouter();

	async function handleLogout() {
		await logout();
		router.replace("/login");
	}

	const initials = user?.firstName
		? user.firstName.charAt(0).toUpperCase()
		: user?.email.charAt(0).toUpperCase() ?? "?";

	return (
		<header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-border bg-background px-6">
			<h1 className="text-lg font-semibold text-foreground">{title}</h1>

			{isAuthenticated && user && (
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2 text-sm">
						<span className="flex size-8 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
							{initials}
						</span>
						<div className="flex flex-col leading-tight">
							<span className="font-medium text-foreground">
								{user.firstName ?? user.email}
							</span>
							<span className="text-xs text-muted-foreground">{user.role}</span>
						</div>
					</div>
					<Button variant="outline" size="sm" onClick={handleLogout}>
						<LogOut className="size-4" aria-hidden="true" />
						Log out
					</Button>
				</div>
			)}
		</header>
	);
}
