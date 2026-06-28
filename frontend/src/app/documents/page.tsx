import { ProtectedRoute } from "@/authentication/ProtectedRoute";

export default function DocumentsPage() {
	return (
		<ProtectedRoute>
			<h1 className="text-2xl font-semibold">Documents</h1>
		</ProtectedRoute>
	);
}
