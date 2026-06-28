import { ProtectedRoute } from "@/authentication/ProtectedRoute";

export default function DashboardPage() {
	return (
		<ProtectedRoute>
			<h1 className="text-2xl font-semibold">Dashboard</h1>
		</ProtectedRoute>
	);
}
