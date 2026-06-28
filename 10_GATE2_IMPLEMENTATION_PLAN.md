# 10_GATE2_IMPLEMENTATION_PLAN.md

# Atlas – Gate 2 Implementation Plan

---

# Document Purpose

This document defines the engineering implementation strategy for **Gate 2 – Authentication**.

Unlike the PRD or Architecture documents, this document focuses on **how Authentication should be implemented**.

It serves as the execution blueprint for AI coding agents.

Every implementation step should follow this document.

---

# Gate Objective

Build a secure authentication system that enables users to log into Atlas and access only the functionality permitted by their assigned role.

The implementation should remain:

* Secure
* Modular
* Maintainable
* Simple
* Extensible

Version 1 intentionally focuses on JWT-based authentication without introducing unnecessary enterprise complexity.

---

# Engineering Goals

Gate 2 delivers:

* Secure authentication
* JWT authorization
* Role-Based Access Control (RBAC)
* Protected backend APIs
* Protected frontend routes
* User session management
* Authentication APIs

No business modules outside Authentication should be modified.

---

# Scope

## Included

* Login
* Logout
* Current User
* JWT Authentication
* Password Hashing
* Role Validation
* Protected Routes
* Authentication Context

## Excluded

* Refresh Tokens
* OAuth2
* LDAP
* SSO
* Multi-Factor Authentication
* Password Reset
* Email Verification
* Account Locking
* Rate Limiting

These belong to future releases.

---

# Repository Changes

## Backend

authentication/

* controller/

  * AuthController.java

* service/

  * AuthService.java
  * JwtService.java
  * PasswordService.java
  * CustomUserDetailsService.java

* repository/

  * UserRepository.java
  * RoleRepository.java

* entity/

  * User.java
  * Role.java

* dto/

  * LoginRequest.java
  * LoginResponse.java
  * UserProfileResponse.java
  * AuthErrorResponse.java

* mapper/

* validator/

* exception/

security/

* SecurityConfig.java
* JwtAuthenticationFilter.java
* JwtAuthenticationEntryPoint.java

resources/

db/

migration/

* V2__authentication.sql

---

## Frontend

authentication/

* LoginPage.tsx
* LoginForm.tsx
* AuthProvider.tsx
* ProtectedRoute.tsx
* authService.ts
* authTypes.ts

---

# Implementation Strategy

Implementation is divided into two phases.

Phase A

Backend Authentication

↓

Validation

↓

Phase B

Frontend Authentication

↓

Validation

↓

Integration

↓

Final Validation

Backend must be completed before frontend implementation begins.

---

# Phase A — Backend Authentication

---

## Step A1 — Flyway Migration

### Objective

Create the authentication database schema.

### Deliverables

* Roles table
* Users table
* Foreign Keys
* Constraints
* Default Roles
* Default Administrator

### Validation

* Migration executes successfully
* Tables created
* Seed data available

### Exit Criteria

Authentication schema exists.

---

## Step A2 — Domain Layer

### Create

Entities

* User
* Role

Repositories

* UserRepository
* RoleRepository

### User Entity

Fields

* id
* email
* password_hash
* first_name
* last_name
* role_id
* enabled
* last_login
* created_at
* updated_at
* version

### Role Entity

Fields

* id
* name
* description
* created_at
* updated_at
* version

### Validation

Repositories load successfully.

### Exit Criteria

Entities map correctly to PostgreSQL.

---

## Step A3 — Security Foundation

### Create

* SecurityConfig
* JwtAuthenticationFilter
* JwtAuthenticationEntryPoint
* JwtService
* PasswordService
* PasswordEncoder
* AuthenticationManager
* CustomUserDetailsService

### Validation

Spring Security loads successfully.

### Exit Criteria

Security configuration operational.

---

## Step A4 — JWT Layer

### Responsibilities

* Generate JWT
* Validate JWT
* Parse Claims

### JWT Claims

* sub
* userId
* email
* role
* iat
* exp
* iss

### Validation

JWT generation and validation verified.

### Exit Criteria

JWT authentication operational.

---

## Step A5 — Authentication Service

### Create

* AuthService

### Responsibilities

* Authenticate credentials
* Generate JWT
* Load current user
* Update last_login timestamp

### Validation

Authentication service returns expected responses.

### Exit Criteria

Authentication business logic complete.

---

## Step A6 — Controllers

### Create

AuthController

### Endpoints

POST

/api/v1/auth/login

POST

/api/v1/auth/logout

GET

/api/v1/auth/me

### Validation

All authentication endpoints functional.

### Exit Criteria

Authentication API complete.

---

# Backend Validation Checklist

* Flyway migration executed
* Roles seeded
* Admin user seeded
* Password hashed
* Login successful
* Invalid password rejected
* JWT generated
* JWT validated
* Expired JWT rejected
* Unauthorized requests rejected
* RBAC verified
* Current User endpoint operational

---

# Phase B — Frontend Authentication

---

## Step B1 — API Client

### Create

* apiClient

### Responsibilities

* Base URL
* Authorization Header
* Error Interceptor

### Validation

Requests successfully reach backend.

---

## Step B2 — Authentication Provider

### Create

* AuthContext
* AuthProvider

### Responsibilities

* Current User
* Login
* Logout
* Authentication State
* Session Restore

### Validation

Authentication state updates correctly.

---

## Step B3 — Login Page

### Create

/login

### Features

* Email
* Password
* Client Validation
* Loading State
* Error State

### Validation

Successful login redirects to Dashboard.

---

## Step B4 — Protected Routes

Protect

* Dashboard
* Products
* Documents
* Training
* Admin

Unauthenticated users

↓

Redirect

↓

/login

### Validation

Unauthorized navigation blocked.

---

## Step B5 — Session Management

### Responsibilities

* Store JWT on client (MVP)
* Restore Session
* Logout
* Token Expiration

Future production versions should migrate to HttpOnly Secure Cookies.

### Validation

Browser refresh restores authenticated session.

---

# Frontend Validation Checklist

* Login form validation
* Login success
* Login failure
* Loading state
* Error state
* Route protection
* Session restored
* Logout
* Unauthorized redirect
* Current User displayed

---

# API Summary

| Endpoint            | Method | Purpose      | Authentication |
| ------------------- | ------ | ------------ | -------------- |
| /api/v1/auth/login  | POST   | User Login   | No             |
| /api/v1/auth/logout | POST   | User Logout  | Yes            |
| /api/v1/auth/me     | GET    | Current User | Yes            |

---

# Security Decisions

Authentication

JWT (Stateless)

Password Hashing

BCrypt (Strength 12)

Authorization

Role-Based Access Control (RBAC)

Transport

HTTPS (Production)

Token Lifetime

12 Hours

Refresh Tokens

Not Implemented

JWT Storage

Client-side storage for the MVP.

Future enterprise versions may migrate to HttpOnly Secure Cookies.

Reason

Keeping JWT client-side reduces implementation complexity for the prototype while allowing a straightforward migration to a more secure cookie-based strategy in future releases.

---

# Testing Strategy

## Unit Tests

* JwtService
* AuthService
* PasswordService

## Integration Tests

* Login
* Logout
* Current User

## Security Tests

* Invalid credentials
* Invalid JWT
* Expired JWT
* Missing JWT
* Unauthorized role access

## Frontend Tests

* Login
* Logout
* Route Protection
* Session Restore

---

# Gate 2 Exit Criteria

Gate 2 is complete when:

* Users can authenticate.
* JWT authentication functions correctly.
* Protected APIs require authentication.
* Frontend authentication works.
* RBAC functions correctly.
* Validation passes.
* Docker deployment succeeds.
* Automated tests pass.

---

# Gate 2.1 Architectural Cleanup

After implementation:

* Remove dead code
* Improve naming
* Improve error handling
* Remove duplication
* Improve package organization
* Update documentation
* Validate architecture

---

# Deliverables

## Backend Deliverables

* Authentication Module
* JWT Service
* Security Configuration
* RBAC

## Frontend Deliverables

* Login Page
* Authentication Provider
* Protected Routes

## Database Deliverables

* Users Table
* Roles Table
* Flyway Migration

## Infrastructure Deliverables

* Updated Docker Configuration
* Updated Environment Variables

## Documentation Deliverables

* Updated API Specification
* Updated Database Design

---

# AI Coding Instructions

Implement one implementation step at a time.

Do not skip validation checkpoints.

Do not begin the next implementation step until the current step passes validation.

Keep controllers lightweight.

Keep business logic inside services.

Never expose JPA entities through APIs.

Follow the repository structure exactly.

Do not introduce functionality outside the current implementation step.

Perform a self-review after completing each implementation phase.

---

# Success Criteria

Atlas users can securely authenticate and access only the functionality permitted by their assigned role.

The implementation remains modular, maintainable, secure, and fully aligned with the Atlas architecture.

This implementation establishes the authentication foundation required for all future Atlas modules.