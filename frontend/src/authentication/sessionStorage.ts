export interface SessionMeta {
	loginAt: string;
	expiresInSeconds: number;
	tokenType: string;
}

const SESSION_STORAGE_KEY = "atlas.auth.session";

export function getStoredSession(): SessionMeta | null {
	if (typeof window === "undefined") {
		return null;
	}

	const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
	if (!raw) {
		return null;
	}

	try {
		return JSON.parse(raw) as SessionMeta;
	} catch {
		return null;
	}
}

export function setStoredSession(session: SessionMeta): void {
	window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearStoredSession(): void {
	window.localStorage.removeItem(SESSION_STORAGE_KEY);
}
