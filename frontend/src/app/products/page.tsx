import { ProtectedRoute } from "@/authentication/ProtectedRoute";

export default function ProductsPage() {
	return (
		<ProtectedRoute>
			<h1 className="text-2xl font-semibold">Products</h1>
		</ProtectedRoute>
	);
}
