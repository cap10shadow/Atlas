export interface DemoDocument {
	id: string;
	title: string;
	documentType: string;
}

export interface DemoTrainingResource {
	id: string;
	title: string;
	durationMinutes: number;
	description: string;
	status: string;
}

const DOCUMENTS_BY_PART_NUMBER: Record<string, DemoDocument[]> = {
	"PRT-FAN-001": [
		{ id: "doc-fan-maintenance", title: "Cooling Fan Maintenance Manual", documentType: "Maintenance Manual" },
		{ id: "doc-fan-installation", title: "Cooling Fan Installation Guide", documentType: "Installation Guide" },
	],
};

const TRAINING_BY_PART_NUMBER: Record<string, DemoTrainingResource[]> = {
	"PRT-FAN-001": [
		{
			id: "training-fan-replacement",
			title: "Cooling Fan Replacement Tutorial",
			durationMinutes: 12,
			description: "Step-by-step guidance for safely replacing the cooling fan assembly.",
			status: "Available",
		},
	],
};

export function getDemoDocuments(partNumber: string): DemoDocument[] {
	return DOCUMENTS_BY_PART_NUMBER[partNumber] ?? [];
}

export function getDemoTrainingResources(partNumber: string): DemoTrainingResource[] {
	return TRAINING_BY_PART_NUMBER[partNumber] ?? [];
}
