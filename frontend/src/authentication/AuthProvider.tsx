"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { clearStoredToken, getStoredToken, setStoredToken } from "@/services/api-client";
import { getCurrentUser, login as loginRequest, logout as logoutRequest } from "@/authentication/authService";
import { AuthContextValue, User } from "@/authentication/authTypes";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(() => getStoredToken() !== null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const token = getStoredToken();
		if (!token) {
			return;
		}

		getCurrentUser()
			.then(setUser)
			.catch(() => {
				clearStoredToken();
				setUser(null);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const login = useCallback(async (email: string, password: string) => {
		setError(null);
		try {
			const response = await loginRequest({ email, password });
			setStoredToken(response.token);
			setUser(response.user);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Login failed.";
			setError(message);
			throw err;
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await logoutRequest();
		} catch {
			// The token may already be invalid or expired; proceed with local logout regardless.
		} finally {
			clearStoredToken();
			setUser(null);
		}
	}, []);

	const value: AuthContextValue = {
		user,
		isAuthenticated: user !== null,
		isLoading,
		error,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
