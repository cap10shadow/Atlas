package com.atlas.products.mapper;

import com.atlas.products.dto.ProductResponse;
import com.atlas.products.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

	public ProductResponse toResponse(Product product) {
		return new ProductResponse(
				product.getId(),
				product.getProductCode(),
				product.getName(),
				product.getDescription(),
				product.getStatus().name());
	}
}
