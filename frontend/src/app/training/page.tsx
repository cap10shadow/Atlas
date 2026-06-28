import { ProtectedRoute } from "@/authentication/ProtectedRoute";

export default function TrainingPage() {
	return (
		<ProtectedRoute>
			<h1 className="text-2xl font-semibold">Training</h1>
		</ProtectedRoute>
	);
}
