import { ApiErrorResponse, ApiResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";
const TOKEN_STORAGE_KEY = "atlas.auth.token";

export function getApiBaseUrl(): string {
	return API_BASE_URL;
}

export function getStoredToken(): string | null {
	if (typeof window === "undefined") {
		return null;
	}
	return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string): void {
	window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearStoredToken(): void {
	window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export class ApiError extends Error {
	readonly status: number;
	readonly errorCode: string;

	constructor(message: string, status: number, errorCode: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.errorCode = errorCode;
	}
}

interface RequestOptions {
	method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	body?: unknown;
	authenticated?: boolean;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const { method = "GET", body, authenticated = true } = options;

	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};

	if (authenticated) {
		const token = getStoredToken();
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
	}

	const response = await fetch(`${API_BASE_URL}${path}`, {
		method,
		headers,
		body: body !== undefined ? JSON.stringify(body) : undefined,
	});

	const payload = await response.json().catch(() => null);

	if (!response.ok) {
		if (response.status === 401 && authenticated) {
			clearStoredToken();
		}

		const errorPayload = payload as ApiErrorResponse | null;
		throw new ApiError(
			errorPayload?.message ?? "An unexpected error occurred.",
			response.status,
			errorPayload?.errorCode ?? "UNKNOWN_ERROR",
		);
	}

	return (payload as ApiResponse<T>).data;
}
