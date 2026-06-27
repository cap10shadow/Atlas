package com.atlas.common;

import java.time.Instant;
import java.util.List;

public record ApiErrorResponse(boolean success, String message, String errorCode, Instant timestamp,
		List<String> errors) {

	public static ApiErrorResponse of(String message, String errorCode, List<String> errors) {
		return new ApiErrorResponse(false, message, errorCode, Instant.now(), errors);
	}
}
