import { apiRequest } from "@/services/api-client";
import { LoginRequest, LoginResponse, User } from "@/authentication/authTypes";

export function login(credentials: LoginRequest): Promise<LoginResponse> {
	return apiRequest<LoginResponse>("/auth/login", {
		method: "POST",
		body: credentials,
		authenticated: false,
	});
}

export function logout(): Promise<void> {
	return apiRequest<void>("/auth/logout", { method: "POST" });
}

export function getCurrentUser(): Promise<User> {
	return apiRequest<User>("/auth/me");
}
