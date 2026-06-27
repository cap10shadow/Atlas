package com.atlas.assemblies.repository;

import com.atlas.assemblies.entity.Assembly;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AssemblyRepository extends JpaRepository<Assembly, UUID> {
}
