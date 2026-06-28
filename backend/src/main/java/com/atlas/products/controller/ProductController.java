package com.atlas.products.controller;

import com.atlas.common.ApiResponse;
import com.atlas.products.dto.ProductResponse;
import com.atlas.products.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

	private final ProductService productService;

	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	@GetMapping
	public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {
		return ResponseEntity.ok(ApiResponse.of("Products retrieved successfully.", productService.getAllProducts()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable UUID id) {
		return ResponseEntity.ok(ApiResponse.of("Product retrieved successfully.", productService.getProductById(id)));
	}
}
