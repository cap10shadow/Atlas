package com.atlas.products.dto;

import java.util.UUID;

public record ProductResponse(
		UUID id,
		String productCode,
		String name,
		String description,
		String status) {
}
