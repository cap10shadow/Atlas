package com.atlas.parts.entity;

import com.atlas.common.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "parts")
public class Part extends BaseEntity {
}
