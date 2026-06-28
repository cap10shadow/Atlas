package com.atlas.assemblies.controller;

import com.atlas.assemblies.dto.AssemblyResponse;
import com.atlas.assemblies.service.AssemblyService;
import com.atlas.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class AssemblyController {

	private final AssemblyService assemblyService;

	public AssemblyController(AssemblyService assemblyService) {
		this.assemblyService = assemblyService;
	}

	@GetMapping("/products/{productId}/assemblies")
	public ResponseEntity<ApiResponse<List<AssemblyResponse>>> getAssembliesByProductId(@PathVariable UUID productId) {
		return ResponseEntity.ok(
				ApiResponse.of("Assemblies retrieved successfully.", assemblyService.getAssembliesByProductId(productId)));
	}

	@GetMapping("/assemblies/{id}")
	public ResponseEntity<ApiResponse<AssemblyResponse>> getAssemblyById(@PathVariable UUID id) {
		return ResponseEntity.ok(ApiResponse.of("Assembly retrieved successfully.", assemblyService.getAssemblyById(id)));
	}
}
