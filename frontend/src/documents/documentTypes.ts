export interface EngineeringDocument {
	id: string;
	partNumber: string;
	title: string;
	documentType: string;
	revision: string;
	version: string;
	language: string;
	publishedDate: string;
	lastUpdated: string;
	description: string;
	fileUrl?: string;
}
