package com.atlas.parts.repository;

import com.atlas.parts.entity.Part;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PartRepository extends JpaRepository<Part, UUID> {

	List<Part> findByAssemblyId(UUID assemblyId);
}
