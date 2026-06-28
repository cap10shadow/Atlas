import { ProtectedRoute } from "@/authentication/ProtectedRoute";

export default function AdministrationPage() {
	return (
		<ProtectedRoute>
			<h1 className="text-2xl font-semibold">Administration</h1>
		</ProtectedRoute>
	);
}
