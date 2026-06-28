package com.atlas.products.service;

import com.atlas.exception.ResourceNotFoundException;
import com.atlas.products.dto.ProductResponse;
import com.atlas.products.entity.Product;
import com.atlas.products.mapper.ProductMapper;
import com.atlas.products.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class ProductService {

	private final ProductRepository productRepository;
	private final ProductMapper productMapper;

	public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
		this.productRepository = productRepository;
		this.productMapper = productMapper;
	}

	public List<ProductResponse> getAllProducts() {
		return productRepository.findAll().stream()
				.map(productMapper::toResponse)
				.toList();
	}

	public ProductResponse getProductById(UUID id) {
		Product product = productRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
		return productMapper.toResponse(product);
	}
}
