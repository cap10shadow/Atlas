package com.atlas.parts.service;

import com.atlas.assemblies.service.AssemblyService;
import com.atlas.exception.ResourceNotFoundException;
import com.atlas.parts.dto.PartResponse;
import com.atlas.parts.entity.Part;
import com.atlas.parts.mapper.PartMapper;
import com.atlas.parts.repository.PartRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class PartService {

	private final PartRepository partRepository;
	private final PartMapper partMapper;
	private final AssemblyService assemblyService;

	public PartService(PartRepository partRepository, PartMapper partMapper, AssemblyService assemblyService) {
		this.partRepository = partRepository;
		this.partMapper = partMapper;
		this.assemblyService = assemblyService;
	}

	public List<PartResponse> getPartsByAssemblyId(UUID assemblyId) {
		assemblyService.getAssemblyById(assemblyId);

		return partRepository.findByAssemblyId(assemblyId).stream()
				.map(partMapper::toResponse)
				.toList();
	}

	public PartResponse getPartById(UUID id) {
		Part part = partRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Part not found: " + id));
		return partMapper.toResponse(part);
	}
}
