"use client";

import { usePageTitle } from "@/hooks/usePageTitle";

export default function ProfilePage() {
	usePageTitle("Profile");

	return <h1 className="text-2xl font-semibold">Profile</h1>;
}
