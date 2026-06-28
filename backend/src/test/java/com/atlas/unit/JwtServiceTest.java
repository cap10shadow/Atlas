package com.atlas.unit;

import com.atlas.authentication.entity.Role;
import com.atlas.authentication.entity.User;
import com.atlas.authentication.service.JwtService;
import com.atlas.constants.RoleName;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

	private static final String SECRET = "unit-test-only-jwt-signing-secret-not-for-production-1234567890";

	private JwtService jwtService;
	private User user;

	@BeforeEach
	void setUp() {
		jwtService = new JwtService(SECRET, 43_200_000L, "atlas");

		Role role = new Role();
		role.setName(RoleName.TECHNICIAN);

		user = new User();
		user.setEmail("technician@atlas.local");
		user.setRole(role);
		ReflectionTestUtils.setField(user, "id", UUID.randomUUID());
	}

	@Test
	void generatesTokenContainingExpectedClaims() {
		String token = jwtService.generateToken(user);

		Claims claims = jwtService.parseClaims(token);

		assertThat(claims.getSubject()).isEqualTo("technician@atlas.local");
		assertThat(claims.get("email", String.class)).isEqualTo("technician@atlas.local");
		assertThat(claims.get("role", String.class)).isEqualTo("TECHNICIAN");
		assertThat(claims.get("userId", String.class)).isEqualTo(user.getId().toString());
		assertThat(claims.getIssuer()).isEqualTo("atlas");
	}

	@Test
	void validTokenPassesValidation() {
		String token = jwtService.generateToken(user);

		assertThat(jwtService.isValid(token)).isTrue();
	}

	@Test
	void tamperedTokenFailsValidation() {
		String token = jwtService.generateToken(user);
		String tampered = token.substring(0, token.length() - 1) + (token.endsWith("a") ? "b" : "a");

		assertThat(jwtService.isValid(tampered)).isFalse();
	}

	@Test
	void expiredTokenFailsValidation() {
		JwtService shortLivedJwtService = new JwtService(SECRET, -1_000L, "atlas");

		String token = shortLivedJwtService.generateToken(user);

		assertThat(shortLivedJwtService.isValid(token)).isFalse();
	}
}
