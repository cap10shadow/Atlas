package com.atlas.authentication.service;

import com.atlas.authentication.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

	private final SecretKey signingKey;
	private final long expirationMillis;
	private final String issuer;

	public JwtService(
			@Value("${atlas.jwt.secret}") String secret,
			@Value("${atlas.jwt.expiration-ms}") long expirationMillis,
			@Value("${atlas.jwt.issuer}") String issuer) {
		this.signingKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		this.expirationMillis = expirationMillis;
		this.issuer = issuer;
	}

	public String generateToken(User user) {
		Instant now = Instant.now();
		Instant expiry = now.plusMillis(expirationMillis);

		return Jwts.builder()
				.subject(user.getEmail())
				.claim("userId", user.getId().toString())
				.claim("email", user.getEmail())
				.claim("role", user.getRole().getName().name())
				.issuer(issuer)
				.issuedAt(Date.from(now))
				.expiration(Date.from(expiry))
				.signWith(signingKey)
				.compact();
	}

	public Claims parseClaims(String token) {
		return Jwts.parser()
				.verifyWith(signingKey)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	public boolean isValid(String token) {
		try {
			parseClaims(token);
			return true;
		} catch (JwtException | IllegalArgumentException ex) {
			return false;
		}
	}

	public String extractEmail(String token) {
		return parseClaims(token).getSubject();
	}

	public String extractRole(String token) {
		return parseClaims(token).get("role", String.class);
	}

	public long getExpirationSeconds() {
		return expirationMillis / 1000;
	}
}
