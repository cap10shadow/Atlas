package com.atlas.parts.entity;

import com.atlas.assemblies.entity.Assembly;
import com.atlas.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "parts")
public class Part extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "assembly_id", nullable = false)
	private Assembly assembly;

	@Column(name = "part_number", nullable = false, unique = true, length = 50)
	private String partNumber;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", length = 1000)
	private String description;

	public Assembly getAssembly() {
		return assembly;
	}

	public void setAssembly(Assembly assembly) {
		this.assembly = assembly;
	}

	public String getPartNumber() {
		return partNumber;
	}

	public void setPartNumber(String partNumber) {
		this.partNumber = partNumber;
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
