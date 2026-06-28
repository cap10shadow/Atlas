package com.atlas.integration;

import com.atlas.assemblies.entity.Assembly;
import com.atlas.assemblies.repository.AssemblyRepository;
import com.atlas.parts.entity.Part;
import com.atlas.parts.repository.PartRepository;
import com.atlas.products.entity.Product;
import com.atlas.products.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class ProductHierarchyRepositoryIntegrationTest {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private AssemblyRepository assemblyRepository;

	@Autowired
	private PartRepository partRepository;

	@Test
	void seededRadarSystemHierarchyIsComplete() {
		List<Product> products = productRepository.findAll();
		assertThat(products).hasSize(4);

		Product radarSystem = products.stream()
				.filter(p -> p.getProductCode().equals("PRD-RADAR-001"))
				.findFirst()
				.orElseThrow();
		assertThat(radarSystem.getName()).isEqualTo("Radar System");

		Optional<Product> foundById = productRepository.findById(radarSystem.getId());
		assertThat(foundById).isPresent();

		List<Assembly> assemblies = assemblyRepository.findByProductId(radarSystem.getId());
		assertThat(assemblies).hasSize(1);

		Assembly powerSupplyUnit = assemblies.get(0);
		assertThat(powerSupplyUnit.getAssemblyCode()).isEqualTo("ASM-PSU-001");
		assertThat(powerSupplyUnit.getName()).isEqualTo("Power Supply Unit");

		List<Part> parts = partRepository.findByAssemblyId(powerSupplyUnit.getId());
		assertThat(parts).hasSize(1);

		Part coolingFan = parts.get(0);
		assertThat(coolingFan.getPartNumber()).isEqualTo("PRT-FAN-001");
		assertThat(coolingFan.getName()).isEqualTo("Cooling Fan");
	}

	@Test
	void shellProductsExistWithNoAssemblies() {
		List<Product> products = productRepository.findAll();
		List<String> shellCodes = List.of("PRD-COMM-001", "PRD-MISSILE-001", "PRD-NAV-001");

		for (String code : shellCodes) {
			Product shellProduct = products.stream()
					.filter(p -> p.getProductCode().equals(code))
					.findFirst()
					.orElseThrow();

			assertThat(assemblyRepository.findByProductId(shellProduct.getId())).isEmpty();
		}
	}
}
