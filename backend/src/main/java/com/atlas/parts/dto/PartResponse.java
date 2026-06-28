package com.atlas.parts.dto;

import java.util.UUID;

public record PartResponse(
		UUID id,
		UUID assemblyId,
		String partNumber,
		String name,
		String description,
		String status) {
}
