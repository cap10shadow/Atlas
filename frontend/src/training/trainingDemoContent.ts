import { TrainingResource } from "@/training/trainingTypes";

const TRAINING_RESOURCES: TrainingResource[] = [
	{
		id: "training-fan-replacement",
		partNumber: "PRT-FAN-001",
		title: "Cooling Fan Replacement Tutorial",
		description: "Step-by-step guidance for safely replacing the cooling fan assembly.",
		durationMinutes: 12,
		skillLevel: "Intermediate",
		version: "1.0",
		language: "English",
		lastUpdated: "2026-03-10",
		status: "Available",
	},
];

export function getAllTrainingResources(): TrainingResource[] {
	return TRAINING_RESOURCES;
}

export function getTrainingResourcesByPartNumber(partNumber: string): TrainingResource[] {
	return TRAINING_RESOURCES.filter((resource) => resource.partNumber === partNumber);
}

export function getTrainingResourceById(id: string): TrainingResource | null {
	return TRAINING_RESOURCES.find((resource) => resource.id === id) ?? null;
}
