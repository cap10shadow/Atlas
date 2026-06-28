package com.atlas.parts.controller;

import com.atlas.common.ApiResponse;
import com.atlas.parts.dto.PartResponse;
import com.atlas.parts.service.PartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class PartController {

	private final PartService partService;

	public PartController(PartService partService) {
		this.partService = partService;
	}

	@GetMapping("/assemblies/{assemblyId}/parts")
	public ResponseEntity<ApiResponse<List<PartResponse>>> getPartsByAssemblyId(@PathVariable UUID assemblyId) {
		return ResponseEntity.ok(ApiResponse.of("Parts retrieved successfully.", partService.getPartsByAssemblyId(assemblyId)));
	}

	@GetMapping("/parts/{id}")
	public ResponseEntity<ApiResponse<PartResponse>> getPartById(@PathVariable UUID id) {
		return ResponseEntity.ok(ApiResponse.of("Part retrieved successfully.", partService.getPartById(id)));
	}
}
