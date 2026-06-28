package com.atlas.assemblies.dto;

import java.util.UUID;

public record AssemblyResponse(
		UUID id,
		UUID productId,
		String assemblyCode,
		String name,
		String description,
		String status) {
}
