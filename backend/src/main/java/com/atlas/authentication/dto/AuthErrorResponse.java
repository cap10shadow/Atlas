package com.atlas.authentication.dto;

import java.time.Instant;

public record AuthErrorResponse(boolean success, String message, String errorCode, Instant timestamp) {

	public static AuthErrorResponse of(String message, String errorCode) {
		return new AuthErrorResponse(false, message, errorCode, Instant.now());
	}
}
