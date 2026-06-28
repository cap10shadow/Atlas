package com.atlas.assemblies.service;

import com.atlas.assemblies.dto.AssemblyResponse;
import com.atlas.assemblies.entity.Assembly;
import com.atlas.assemblies.mapper.AssemblyMapper;
import com.atlas.assemblies.repository.AssemblyRepository;
import com.atlas.exception.ResourceNotFoundException;
import com.atlas.products.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class AssemblyService {

	private final AssemblyRepository assemblyRepository;
	private final AssemblyMapper assemblyMapper;
	private final ProductService productService;

	public AssemblyService(AssemblyRepository assemblyRepository, AssemblyMapper assemblyMapper, ProductService productService) {
		this.assemblyRepository = assemblyRepository;
		this.assemblyMapper = assemblyMapper;
		this.productService = productService;
	}

	public List<AssemblyResponse> getAssembliesByProductId(UUID productId) {
		productService.getProductById(productId);

		return assemblyRepository.findByProductId(productId).stream()
				.map(assemblyMapper::toResponse)
				.toList();
	}

	public AssemblyResponse getAssemblyById(UUID id) {
		Assembly assembly = assemblyRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Assembly not found: " + id));
		return assemblyMapper.toResponse(assembly);
	}
}
