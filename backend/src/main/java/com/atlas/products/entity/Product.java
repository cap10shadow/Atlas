package com.atlas.products.entity;

import com.atlas.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product extends BaseEntity {

	@Column(name = "product_code", nullable = false, unique = true, length = 50)
	private String productCode;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", length = 1000)
	private String description;

	public String getProductCode() {
		return productCode;
	}

	public void setProductCode(String productCode) {
		this.productCode = productCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
