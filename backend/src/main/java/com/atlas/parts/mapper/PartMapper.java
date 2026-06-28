package com.atlas.parts.mapper;

import com.atlas.parts.dto.PartResponse;
import com.atlas.parts.entity.Part;
import org.springframework.stereotype.Component;

@Component
public class PartMapper {

	public PartResponse toResponse(Part part) {
		return new PartResponse(
				part.getId(),
				part.getAssembly().getId(),
				part.getPartNumber(),
				part.getName(),
				part.getDescription(),
				part.getStatus().name());
	}
}
