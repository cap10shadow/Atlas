export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface TrainingResource {
	id: string;
	partNumber: string;
	title: string;
	description: string;
	durationMinutes: number;
	skillLevel: SkillLevel;
	version: string;
	language: string;
	lastUpdated: string;
	status: string;
	videoUrl?: string;
}
