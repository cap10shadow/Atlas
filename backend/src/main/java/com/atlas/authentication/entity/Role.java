package com.atlas.authentication.entity;

import com.atlas.common.BaseEntity;
import com.atlas.constants.RoleName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity {

	@Enumerated(EnumType.STRING)
	@Column(name = "name", nullable = false, unique = true, length = 50)
	private RoleName name;

	@Column(name = "description")
	private String description;

	public RoleName getName() {
		return name;
	}

	public void setName(RoleName name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
