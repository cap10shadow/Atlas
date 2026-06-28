import { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/authentication/ProtectedRoute";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
	return (
		<ProtectedRoute>
			<AppShell>{children}</AppShell>
		</ProtectedRoute>
	);
}
