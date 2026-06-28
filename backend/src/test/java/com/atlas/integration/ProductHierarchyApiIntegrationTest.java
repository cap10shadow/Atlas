package com.atlas.integration;

import com.atlas.assemblies.entity.Assembly;
import com.atlas.assemblies.repository.AssemblyRepository;
import com.atlas.parts.entity.Part;
import com.atlas.parts.repository.PartRepository;
import com.atlas.products.entity.Product;
import com.atlas.products.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductHierarchyApiIntegrationTest {

	private static final String ADMIN_EMAIL = "admin@atlas.local";
	private static final String ADMIN_PASSWORD = "Atlas@Admin123";

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private AssemblyRepository assemblyRepository;

	@Autowired
	private PartRepository partRepository;

	private String token;
	private UUID productId;
	private UUID assemblyId;
	private UUID partId;

	@BeforeEach
	void setUp() throws Exception {
		Product radarSystem = productRepository.findAll().stream()
				.filter(p -> p.getProductCode().equals("PRD-RADAR-001"))
				.findFirst()
				.orElseThrow();
		productId = radarSystem.getId();

		Assembly powerSupplyUnit = assemblyRepository.findByProductId(productId).get(0);
		assemblyId = powerSupplyUnit.getId();

		Part coolingFan = partRepository.findByAssemblyId(assemblyId).get(0);
		partId = coolingFan.getId();

		String body = objectMapper.writeValueAsString(new LoginPayload(ADMIN_EMAIL, ADMIN_PASSWORD));
		String response = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isOk())
				.andReturn()
				.getResponse()
				.getContentAsString();
		token = objectMapper.readTree(response).at("/data/token").asText();
	}

	@Test
	void getAllProductsWithoutTokenIsRejected() throws Exception {
		mockMvc.perform(get("/api/v1/products"))
				.andExpect(status().isUnauthorized());
	}

	@Test
	void getAllProductsReturnsSeededRadarSystem() throws Exception {
		mockMvc.perform(get("/api/v1/products").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.length()").value(1))
				.andExpect(jsonPath("$.data[0].productCode").value("PRD-RADAR-001"))
				.andExpect(jsonPath("$.data[0].name").value("Radar System"));
	}

	@Test
	void getProductByIdReturnsRadarSystem() throws Exception {
		mockMvc.perform(get("/api/v1/products/" + productId).header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.productCode").value("PRD-RADAR-001"));
	}

	@Test
	void getProductByUnknownIdReturns404() throws Exception {
		mockMvc.perform(get("/api/v1/products/" + UUID.randomUUID()).header("Authorization", "Bearer " + token))
				.andExpect(status().isNotFound())
				.andExpect(jsonPath("$.errorCode").value("NOT_FOUND"));
	}

	@Test
	void getProductByInvalidUuidReturns400() throws Exception {
		mockMvc.perform(get("/api/v1/products/not-a-valid-uuid").header("Authorization", "Bearer " + token))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.errorCode").value("INVALID_PARAMETER"));
	}

	@Test
	void getAssembliesByProductIdReturnsPowerSupplyUnit() throws Exception {
		mockMvc.perform(get("/api/v1/products/" + productId + "/assemblies").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.length()").value(1))
				.andExpect(jsonPath("$.data[0].assemblyCode").value("ASM-PSU-001"))
				.andExpect(jsonPath("$.data[0].productId").value(productId.toString()));
	}

	@Test
	void getAssembliesForUnknownProductReturns404() throws Exception {
		mockMvc.perform(get("/api/v1/products/" + UUID.randomUUID() + "/assemblies").header("Authorization", "Bearer " + token))
				.andExpect(status().isNotFound());
	}

	@Test
	void getAssemblyByIdReturnsPowerSupplyUnit() throws Exception {
		mockMvc.perform(get("/api/v1/assemblies/" + assemblyId).header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.assemblyCode").value("ASM-PSU-001"));
	}

	@Test
	void getAssemblyByUnknownIdReturns404() throws Exception {
		mockMvc.perform(get("/api/v1/assemblies/" + UUID.randomUUID()).header("Authorization", "Bearer " + token))
				.andExpect(status().isNotFound());
	}

	@Test
	void getPartsByAssemblyIdReturnsCoolingFan() throws Exception {
		mockMvc.perform(get("/api/v1/assemblies/" + assemblyId + "/parts").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.length()").value(1))
				.andExpect(jsonPath("$.data[0].partNumber").value("PRT-FAN-001"))
				.andExpect(jsonPath("$.data[0].assemblyId").value(assemblyId.toString()));
	}

	@Test
	void getPartsForUnknownAssemblyReturns404() throws Exception {
		mockMvc.perform(get("/api/v1/assemblies/" + UUID.randomUUID() + "/parts").header("Authorization", "Bearer " + token))
				.andExpect(status().isNotFound());
	}

	@Test
	void getPartByIdReturnsCoolingFan() throws Exception {
		mockMvc.perform(get("/api/v1/parts/" + partId).header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.partNumber").value("PRT-FAN-001"));
	}

	@Test
	void getPartByUnknownIdReturns404() throws Exception {
		mockMvc.perform(get("/api/v1/parts/" + UUID.randomUUID()).header("Authorization", "Bearer " + token))
				.andExpect(status().isNotFound());
	}

	@Test
	void getPartWithInvalidTokenIsRejected() throws Exception {
		mockMvc.perform(get("/api/v1/parts/" + partId).header("Authorization", "Bearer invalid.token.value"))
				.andExpect(status().isUnauthorized());
	}

	private record LoginPayload(String email, String password) {
	}
}
