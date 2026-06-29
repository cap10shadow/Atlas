"use client";

import { usePageTitle } from "@/hooks/usePageTitle";
import { useAuth } from "@/authentication/AuthProvider";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { InfoCard } from "@/components/layout/InfoCard";
import { Badge } from "@/components/ui/badge";

const APPLICATION_VERSION = "Prototype v0.3";

function formatDateTime(value: string): string {
	return new Date(value).toLocaleString();
}

export default function ProfilePage() {
	usePageTitle("Profile");

	const { user, session, isAuthenticated } = useAuth();

	const fullName = user ? [user.firstName, user.lastName].filter(Boolean).join(" ") : "";
	const sessionExpiresAt = session ? new Date(new Date(session.loginAt).getTime() + session.expiresInSeconds * 1000) : null;

	return (
		<div className="flex flex-col gap-6">
			<Breadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Profile" }]} />

			<div>
				<h2 className="text-2xl font-bold tracking-tight text-foreground">Profile</h2>
				<p className="mt-0.5 text-[13px] text-muted-foreground">View your account and session information.</p>
			</div>

			<section>
				<SectionHeading>Account</SectionHeading>
				<InfoCard
					fields={[
						{ label: "Name", value: fullName || "Not provided" },
						{ label: "Role", value: user ? <Badge variant="blue">{user.role}</Badge> : "Unknown" },
						{ label: "Email", value: user?.email ?? "Unknown" },
					]}
				/>
			</section>

			<section>
				<SectionHeading>Session</SectionHeading>
				<InfoCard
					fields={[
						{
							label: "Authentication Status",
							value: <Badge variant={isAuthenticated ? "green" : "gray"}>{isAuthenticated ? "Active" : "Inactive"}</Badge>,
						},
						{ label: "Last Login", value: session ? formatDateTime(session.loginAt) : "Unavailable" },
						{ label: "Session Expires", value: sessionExpiresAt ? formatDateTime(sessionExpiresAt.toISOString()) : "Unavailable" },
						{ label: "Token Type", value: session?.tokenType ?? "Unavailable" },
						{ label: "Application Version", value: APPLICATION_VERSION },
					]}
				/>
			</section>
		</div>
	);
}
