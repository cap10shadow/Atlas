package com.atlas.integration;

import com.atlas.authentication.entity.Role;
import com.atlas.authentication.entity.User;
import com.atlas.authentication.repository.RoleRepository;
import com.atlas.authentication.repository.UserRepository;
import com.atlas.authentication.service.PasswordService;
import com.atlas.constants.RoleName;
import tools.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerIntegrationTest {

	private static final String ADMIN_EMAIL = "admin@atlas.local";
	private static final String ADMIN_PASSWORD = "Atlas@Admin123";
	private static final String TECHNICIAN_EMAIL = "technician.rbac-test@atlas.local";
	private static final String TECHNICIAN_PASSWORD = "Technician@123";

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordService passwordService;

	@BeforeEach
	@Transactional
	void seedTechnicianUser() {
		if (userRepository.existsByEmail(TECHNICIAN_EMAIL)) {
			return;
		}

		Role technicianRole = roleRepository.findByName(RoleName.TECHNICIAN).orElseThrow();

		User technician = new User();
		technician.setEmail(TECHNICIAN_EMAIL);
		technician.setPasswordHash(passwordService.hash(TECHNICIAN_PASSWORD));
		technician.setFirstName("RBAC");
		technician.setLastName("Test");
		technician.setRole(technicianRole);
		technician.setEnabled(true);

		userRepository.save(technician);
	}

	@Test
	void loginWithValidCredentialsReturnsTokenAndProfile() throws Exception {
		String body = objectMapper.writeValueAsString(new LoginPayload(ADMIN_EMAIL, ADMIN_PASSWORD));

		mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.success").value(true))
				.andExpect(jsonPath("$.data.token").value(notNullValue()))
				.andExpect(jsonPath("$.data.tokenType").value("Bearer"))
				.andExpect(jsonPath("$.data.user.email").value(ADMIN_EMAIL))
				.andExpect(jsonPath("$.data.user.role").value("ADMINISTRATOR"));
	}

	@Test
	void loginWithInvalidPasswordIsRejected() throws Exception {
		String body = objectMapper.writeValueAsString(new LoginPayload(ADMIN_EMAIL, "WrongPassword123"));

		mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isUnauthorized())
				.andExpect(jsonPath("$.success").value(false))
				.andExpect(jsonPath("$.errorCode").value("INVALID_CREDENTIALS"));
	}

	@Test
	void loginWithUnknownEmailIsRejectedWithSameGenericError() throws Exception {
		String body = objectMapper.writeValueAsString(new LoginPayload("nobody@atlas.local", "Whatever123"));

		mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isUnauthorized())
				.andExpect(jsonPath("$.errorCode").value("INVALID_CREDENTIALS"));
	}

	@Test
	void loginWithBlankFieldsFailsValidation() throws Exception {
		String body = objectMapper.writeValueAsString(new LoginPayload("", ""));

		mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.errorCode").value("VALIDATION_ERROR"));
	}

	@Test
	void meWithoutTokenIsRejected() throws Exception {
		mockMvc.perform(get("/api/v1/auth/me"))
				.andExpect(status().isUnauthorized());
	}

	@Test
	void meWithInvalidTokenIsRejected() throws Exception {
		mockMvc.perform(get("/api/v1/auth/me").header("Authorization", "Bearer not-a-real-token"))
				.andExpect(status().isUnauthorized());
	}

	@Test
	void meWithValidTokenReturnsAuthenticatedUser() throws Exception {
		String token = loginAndExtractToken(ADMIN_EMAIL, ADMIN_PASSWORD);

		mockMvc.perform(get("/api/v1/auth/me").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.email").value(ADMIN_EMAIL))
				.andExpect(jsonPath("$.data.role").value("ADMINISTRATOR"));
	}

	@Test
	void logoutWithValidTokenSucceeds() throws Exception {
		String token = loginAndExtractToken(ADMIN_EMAIL, ADMIN_PASSWORD);

		mockMvc.perform(post("/api/v1/auth/logout").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.success").value(true));
	}

	@Test
	void logoutWithoutTokenIsRejected() throws Exception {
		mockMvc.perform(post("/api/v1/auth/logout"))
				.andExpect(status().isUnauthorized());
	}

	@Test
	void rbacDistinguishesRolesAcrossDifferentUsers() throws Exception {
		String adminToken = loginAndExtractToken(ADMIN_EMAIL, ADMIN_PASSWORD);
		String technicianToken = loginAndExtractToken(TECHNICIAN_EMAIL, TECHNICIAN_PASSWORD);

		mockMvc.perform(get("/api/v1/auth/me").header("Authorization", "Bearer " + adminToken))
				.andExpect(jsonPath("$.data.role").value("ADMINISTRATOR"));

		mockMvc.perform(get("/api/v1/auth/me").header("Authorization", "Bearer " + technicianToken))
				.andExpect(jsonPath("$.data.role").value("TECHNICIAN"));
	}

	private String loginAndExtractToken(String email, String password) throws Exception {
		String body = objectMapper.writeValueAsString(new LoginPayload(email, password));

		String response = mockMvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isOk())
				.andReturn()
				.getResponse()
				.getContentAsString();

		return objectMapper.readTree(response).at("/data/token").asText();
	}

	private record LoginPayload(String email, String password) {
	}
}
