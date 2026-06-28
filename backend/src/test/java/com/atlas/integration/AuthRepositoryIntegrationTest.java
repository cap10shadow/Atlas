package com.atlas.integration;

import com.atlas.authentication.entity.User;
import com.atlas.authentication.repository.RoleRepository;
import com.atlas.authentication.repository.UserRepository;
import com.atlas.constants.RoleName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class AuthRepositoryIntegrationTest {

	@org.springframework.beans.factory.annotation.Autowired
	private UserRepository userRepository;

	@org.springframework.beans.factory.annotation.Autowired
	private RoleRepository roleRepository;

	@Test
	void rolesAreSeededByMigration() {
		assertThat(roleRepository.findByName(RoleName.ADMINISTRATOR)).isPresent();
		assertThat(roleRepository.count()).isEqualTo(RoleName.values().length);
	}

	@Test
	void adminUserIsSeededWithAdministratorRole() {
		Optional<User> admin = userRepository.findByEmail("admin@atlas.local");

		assertThat(admin).isPresent();
		assertThat(admin.get().isEnabled()).isTrue();
		assertThat(admin.get().getRole().getName()).isEqualTo(RoleName.ADMINISTRATOR);
		assertThat(admin.get().getPasswordHash()).startsWith("$2a$12$");
	}
}
