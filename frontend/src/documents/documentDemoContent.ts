import { EngineeringDocument } from "@/documents/documentTypes";

const DOCUMENTS: EngineeringDocument[] = [
	{
		id: "doc-fan-maintenance",
		partNumber: "PRT-FAN-001",
		title: "Cooling Fan Maintenance Manual",
		documentType: "Maintenance Manual",
		revision: "C",
		version: "2.1",
		language: "English",
		publishedDate: "2025-09-12",
		lastUpdated: "2026-02-18",
		description:
			"Comprehensive maintenance procedures for the cooling fan assembly, including inspection intervals and replacement steps.",
	},
	{
		id: "doc-fan-installation",
		partNumber: "PRT-FAN-001",
		title: "Cooling Fan Installation Guide",
		documentType: "Installation Guide",
		revision: "B",
		version: "1.3",
		language: "English",
		publishedDate: "2025-06-01",
		lastUpdated: "2025-11-30",
		description: "Installation requirements and torque specifications for mounting the cooling fan within the power supply unit.",
	},
];

export function getAllDocuments(): EngineeringDocument[] {
	return DOCUMENTS;
}

export function getDocumentsByPartNumber(partNumber: string): EngineeringDocument[] {
	return DOCUMENTS.filter((document) => document.partNumber === partNumber);
}

export function getDocumentById(id: string): EngineeringDocument | null {
	return DOCUMENTS.find((document) => document.id === id) ?? null;
}
