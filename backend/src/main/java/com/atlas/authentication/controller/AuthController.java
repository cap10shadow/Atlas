package com.atlas.authentication.controller;

import com.atlas.authentication.dto.AuthErrorResponse;
import com.atlas.authentication.dto.LoginRequest;
import com.atlas.authentication.dto.LoginResponse;
import com.atlas.authentication.dto.UserProfileResponse;
import com.atlas.authentication.entity.User;
import com.atlas.authentication.mapper.UserMapper;
import com.atlas.authentication.service.AuthService;
import com.atlas.authentication.service.AuthService.AuthResult;
import com.atlas.authentication.service.JwtService;
import com.atlas.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

	private final AuthService authService;
	private final UserMapper userMapper;
	private final JwtService jwtService;

	public AuthController(AuthService authService, UserMapper userMapper, JwtService jwtService) {
		this.authService = authService;
		this.userMapper = userMapper;
		this.jwtService = jwtService;
	}

	@PostMapping("/login")
	public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
		AuthResult result = authService.login(request.email(), request.password());

		LoginResponse response = new LoginResponse(
				result.token(),
				"Bearer",
				jwtService.getExpirationSeconds(),
				userMapper.toProfileResponse(result.user()));

		return ResponseEntity.ok(ApiResponse.of("Login successful.", response));
	}

	@PostMapping("/logout")
	public ResponseEntity<ApiResponse<Void>> logout() {
		return ResponseEntity.ok(ApiResponse.of("Logout successful.", null));
	}

	@GetMapping("/me")
	public ResponseEntity<ApiResponse<UserProfileResponse>> me(Authentication authentication) {
		User user = authService.getCurrentUser(authentication.getName());
		return ResponseEntity.ok(ApiResponse.of("Current user retrieved successfully.", userMapper.toProfileResponse(user)));
	}

	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<AuthErrorResponse> handleAuthenticationException(AuthenticationException ex) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(AuthErrorResponse.of("Invalid email or password.", "INVALID_CREDENTIALS"));
	}
}
