# 06_API_SPEC.md

# Atlas – REST API Specification

---

# Document Purpose

This document defines the REST API exposed by Atlas.

The API serves as the contract between the frontend and backend and follows REST principles, standardized request/response models, and modular controller design.

Each business module exposes its own controller while remaining independent from other modules.

---

# API Design Principles

The API should:

* Follow REST conventions
* Return JSON responses
* Use UUID identifiers
* Be versioned
* Keep controllers lightweight
* Delegate business logic to Services
* Never expose database entities directly
* Return standardized responses
* Be fully documented using OpenAPI

---

# API Architecture

Every request follows the same processing pipeline.

```text
Client

↓

REST Controller

↓

Request DTO

↓

Application Service

↓

Domain Service

↓

Repository

↓

Database

↓

Response DTO

↓

Client
```

Business logic belongs exclusively in the Service layer.

---

# Base URL

```text
/api/v1
```

---

# API Standards

Content Type

```
application/json
```

Authentication

```
JWT Bearer Token
```

Character Encoding

```
UTF-8
```

Identifier Format

```
UUID
```

Date Format

```
ISO-8601
```

---

# Implementation Status (Prototype v1.0)

This document specifies the complete target API surface. In this prototype:

* **Implemented**: `AuthController` (login/logout/me), `ProductController`, `AssemblyController`, `PartController` — the latter three expose **read-only `GET` endpoints only**; this was an intentional scope decision for the prototype, not an oversight (write operations are deferred to a future Administration module).
* **Not implemented** (controllers are empty scaffolding with no endpoints): `DocumentController`, `ProcedureController`, `TrainingController`, `MediaController`, `SearchController`, `AdminController`.
* The prototype's Documentation, Training, and Search experiences are delivered entirely by the frontend using static demo content — they do not call the endpoints described below for those modules. Implementing these APIs is deferred to the future Atlas Platform (Portfolio Edition).

---

# Authentication Module

## Controller

```
AuthController
```

### Responsibility

User authentication and session management.

### Endpoints

```
POST   /auth/login
POST   /auth/logout
GET    /auth/me
```

### Request DTOs

* LoginRequest

### Response DTOs

* LoginResponse
* UserProfileResponse

### Error DTO

* AuthErrorResponse — returned for invalid-credential failures (`401 INVALID_CREDENTIALS`). Mirrors the standard error response (`success`, `message`, `errorCode`, `timestamp`) but omits the `errors` array, since credential failures are always a single, deliberately generic message. All other failures on this module (validation, missing/invalid JWT) use the standard `ApiErrorResponse` shape, including `errors`.

---

# Products Module

## Controller

```
ProductController
```

### Responsibility

Manage engineering products.

### Endpoints

```
GET     /products
GET     /products/{id}
POST    /products
PUT     /products/{id}
PATCH   /products/{id}
DELETE  /products/{id}
```

### Request DTOs

* CreateProductRequest
* UpdateProductRequest
* PatchProductRequest

### Response DTOs

* ProductResponse
* ProductListResponse

---

# Assemblies Module

## Controller

```
AssemblyController
```

### Responsibility

Manage product assemblies.

### Endpoints

```
GET     /products/{productId}/assemblies
GET     /assemblies/{id}
POST    /assemblies
PUT     /assemblies/{id}
PATCH   /assemblies/{id}
DELETE  /assemblies/{id}
```

---

# Parts Module

## Controller

```
PartController
```

### Responsibility

Manage engineering parts.

### Endpoints

```
GET     /assemblies/{assemblyId}/parts
GET     /parts/{id}
POST    /parts
PUT     /parts/{id}
PATCH   /parts/{id}
DELETE  /parts/{id}
```

---

# Documents Module

## Controller

```
DocumentController
```

### Responsibility

Manage technical documentation.

### Endpoints

```
GET     /parts/{partId}/documents
GET     /documents/{id}
POST    /documents
PUT     /documents/{id}
PATCH   /documents/{id}
DELETE  /documents/{id}
```

---

# Procedures Module

## Controller

```
ProcedureController
```

### Responsibility

Manage maintenance procedures.

### Endpoints

```
GET     /parts/{partId}/procedures
GET     /procedures/{id}
POST    /procedures
PUT     /procedures/{id}
PATCH   /procedures/{id}
DELETE  /procedures/{id}
```

---

# Training Module

## Controller

```
TrainingController
```

### Responsibility

Manage training resources.

### Endpoints

```
GET     /parts/{partId}/training
GET     /training/{id}
POST    /training
PUT     /training/{id}
PATCH   /training/{id}
DELETE  /training/{id}
```

---

# Media Module

## Controller

```
MediaController
```

### Responsibility

Manage images and multimedia.

### Endpoints

```
GET     /parts/{partId}/media
GET     /media/{id}
POST    /media
PUT     /media/{id}
PATCH   /media/{id}
DELETE  /media/{id}
```

---

# Search Module

## Controller

```
SearchController
```

### Responsibility

Search technical information across the platform.

### Endpoints

```
GET /search

GET /search/suggestions
```

### Query Parameters

* keyword
* type
* page
* size

---

# Administration Module

## Controller

```
AdminController
```

### Responsibility

Platform administration.

### Endpoints

```
GET     /admin/dashboard

GET     /admin/users

POST    /admin/users

PUT     /admin/users/{id}

PATCH   /admin/users/{id}

DELETE  /admin/users/{id}
```

---

# Standard API Response

Every successful response follows the same structure.

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "timestamp": "2026-01-01T10:15:30Z",
  "data": {}
}
```

---

# Standard Error Response

```json
{
  "success": false,
  "message": "Validation failed.",
  "errorCode": "VALIDATION_ERROR",
  "timestamp": "2026-01-01T10:15:30Z",
  "errors": []
}
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 500  | Internal Server Error |

---

# Security

Authentication is required for all endpoints except `POST /auth/login` and the `/actuator/health` and `/actuator/info` health-check endpoints.

Authorization is enforced using Role-Based Access Control (RBAC).

Supported roles:

* Administrator
* Technical Writer
* Reviewer
* Maintenance Engineer
* Technician
* Trainer

Every protected endpoint validates the authenticated user's permissions before executing business logic.

---

# API Versioning

Current version

```
/api/v1
```

Future versions

```
/api/v2
```

---

# Future API Modules

Future releases may introduce:

* XML API
* CSDB API
* BREX API
* Workflow API
* Publishing API
* Notification API
* Audit API
* Analytics API

---

# API Documentation

The backend should automatically generate API documentation using OpenAPI / Swagger.

Interactive API documentation should be available during development.

---

# API Design Guidelines

Controllers should:

* Handle HTTP requests only
* Never contain business logic
* Return DTOs only
* Delegate work to Services
* Validate requests
* Return standardized responses
* Remain independent from persistence logic

---

# API Design Summary

The Atlas API is:

* RESTful
* Stateless
* Resource-oriented
* Versioned
* Secure
* DTO-based
* Modular
* OpenAPI-ready

---

# Dependencies

This document defines the API contract for:

* 08_IMPLEMENTATION_ROADMAP.md

---

# Notes for AI Coding Agents

Generate one Controller per business module.

Generate Request and Response DTOs for every endpoint.

Never expose JPA entities through the API.

Keep Controllers thin and delegate all business logic to Services.

Generate standardized API responses and centralized exception handling.

Use OpenAPI annotations to automatically generate Swagger documentation.

Follow REST naming conventions and maintain backward compatibility between API versions.