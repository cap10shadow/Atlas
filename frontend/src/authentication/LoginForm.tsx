"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/authentication/AuthProvider";

export function LoginForm() {
	const { login } = useAuth();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validationError, setValidationError] = useState<string | null>(null);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!email.trim() || !password.trim()) {
			setValidationError("Email and password are required.");
			return;
		}
		setValidationError(null);
		setSubmitError(null);

		setIsSubmitting(true);
		try {
			await login(email, password);
			router.replace("/dashboard");
		} catch (err) {
			setSubmitError(err instanceof Error ? err.message : "Login failed.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
			<h1 className="text-2xl font-semibold">Sign in to Atlas</h1>

			<div className="flex flex-col gap-1">
				<label htmlFor="email" className="text-sm font-medium">
					Email
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					autoComplete="email"
					className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label htmlFor="password" className="text-sm font-medium">
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					autoComplete="current-password"
					className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
				/>
			</div>

			{validationError && <p className="text-sm text-destructive">{validationError}</p>}
			{submitError && <p className="text-sm text-destructive">{submitError}</p>}

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Signing in..." : "Sign in"}
			</Button>
		</form>
	);
}
