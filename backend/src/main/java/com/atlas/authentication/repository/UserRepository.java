package com.atlas.authentication.repository;

import com.atlas.authentication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

	@Query("SELECT u FROM User u JOIN FETCH u.role WHERE u.email = :email")
	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);
}
