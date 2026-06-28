package com.atlas.authentication.service;

import com.atlas.authentication.entity.User;
import com.atlas.authentication.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class AuthService {

	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final JwtService jwtService;

	public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, JwtService jwtService) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.jwtService = jwtService;
	}

	@Transactional
	public AuthResult login(String email, String rawPassword) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(email, rawPassword));

		User user = userRepository.findByEmail(authentication.getName())
				.orElseThrow(() -> new IllegalStateException("Authenticated user not found: " + authentication.getName()));

		user.setLastLogin(Instant.now());
		userRepository.save(user);

		String token = jwtService.generateToken(user);

		return new AuthResult(token, user);
	}

	@Transactional(readOnly = true)
	public User getCurrentUser(String email) {
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalStateException("Authenticated user not found: " + email));
	}

	public record AuthResult(String token, User user) {
	}
}
