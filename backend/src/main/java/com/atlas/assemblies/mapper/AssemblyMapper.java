package com.atlas.assemblies.mapper;

import com.atlas.assemblies.dto.AssemblyResponse;
import com.atlas.assemblies.entity.Assembly;
import org.springframework.stereotype.Component;

@Component
public class AssemblyMapper {

	public AssemblyResponse toResponse(Assembly assembly) {
		return new AssemblyResponse(
				assembly.getId(),
				assembly.getProduct().getId(),
				assembly.getAssemblyCode(),
				assembly.getName(),
				assembly.getDescription(),
				assembly.getStatus().name());
	}
}
