package com.atlas.authentication.dto;

public record LoginResponse(
		String token,
		String tokenType,
		long expiresInSeconds,
		UserProfileResponse user) {
}
