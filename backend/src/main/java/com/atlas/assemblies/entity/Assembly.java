package com.atlas.assemblies.entity;

import com.atlas.common.BaseEntity;
import com.atlas.products.entity.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "assemblies")
public class Assembly extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@Column(name = "assembly_code", nullable = false, unique = true, length = 50)
	private String assemblyCode;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", length = 1000)
	private String description;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getAssemblyCode() {
		return assemblyCode;
	}

	public void setAssemblyCode(String assemblyCode) {
		this.assemblyCode = assemblyCode;
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
