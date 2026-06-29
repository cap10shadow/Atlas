export interface User {
	id: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
	role: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	tokenType: string;
	expiresInSeconds: number;
	user: User;
}

export interface SessionInfo {
	loginAt: string;
	expiresInSeconds: number;
	tokenType: string;
}

export interface AuthContextValue {
	user: User | null;
	session: SessionInfo | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
}
