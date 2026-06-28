# 12_GATE3_SESSION2_IMPLEMENTATION_PLAN.md

# Atlas – Gate 3 Session 2 Implementation Plan

---

# Document Purpose

This document defines the implementation strategy for **Gate 3 – Session 2 (Backend APIs)**.

Session 1 established the persistence layer by creating the Product, Assembly, and Part entities along with their database schema.

Session 2 exposes these entities through secure, read-only REST APIs following the modular monolith architecture.

This document serves as the execution blueprint for AI coding agents.

---

# Session Objective

Expose the engineering product hierarchy through secure REST APIs.

The APIs should allow authenticated users to navigate:

Product

↓

Assemblies

↓

Parts

without exposing internal entities or implementing unnecessary business functionality.

This session intentionally remains read-only.

---

# Engineering Goals

Session 2 should deliver:

* Read-only REST APIs
* DTO-based responses
* Mapper layer
* Service layer
* Controller layer
* JWT protection
* Standard API responses
* Backend validation

No frontend work is included.

---

# Scope

Included

* Product APIs
* Assembly APIs
* Part APIs
* DTOs
* Entity-to-DTO mappers
* Services
* Controllers
* Exception handling
* JWT protection
* Integration tests

Excluded

* Create
* Update
* Delete
* Pagination
* Search
* Sorting
* Filtering
* Admin APIs
* File uploads
* Documentation module
* Training module

---

# Implementation Strategy

```
DTO Layer

↓

Mapper Layer

↓

Service Layer

↓

Controller Layer

↓

Validation

↓

Final Review
```

Each layer must be completed and validated before continuing.

---

# Step S2.1 — DTO Layer

Create response DTOs only.

## ProductResponse

Contains

* id
* productCode
* name
* description
* status

---

## AssemblyResponse

Contains

* id
* productId
* assemblyCode
* name
* description
* status

---

## PartResponse

Contains

* id
* assemblyId
* partNumber
* name
* description
* status

Validation

* No entity classes exposed.
* DTOs serialize correctly.

---

# Step S2.2 — Mapper Layer

Create

* ProductMapper
* AssemblyMapper
* PartMapper

Responsibilities

* Entity → DTO

No reverse mapping is required.

Validation

Each mapper correctly converts entities to DTOs.

---

# Step S2.3 — Service Layer

Create

* ProductService
* AssemblyService
* PartService

Responsibilities

## ProductService

* Get all products
* Get product by ID

## AssemblyService

* Get assemblies for a product
* Get assembly by ID

## PartService

* Get parts for an assembly
* Get part by ID

Business Rules

* Throw NotFoundException when resources do not exist.
* Keep services read-only.

Validation

Services return DTOs only.

---

# Step S2.4 — Controller Layer

Create

* ProductController
* AssemblyController
* PartController

Controllers must:

* Delegate to services
* Return standard ApiResponse objects
* Remain stateless
* Contain no business logic

---

# API Endpoints

## Products

GET

```
/api/v1/products
```

Returns all products.

---

GET

```
/api/v1/products/{id}
```

Returns one product.

---

GET

```
/api/v1/products/{productId}/assemblies
```

Returns assemblies belonging to a product.

---

## Assemblies

GET

```
/api/v1/assemblies/{id}
```

Returns one assembly.

---

GET

```
/api/v1/assemblies/{assemblyId}/parts
```

Returns parts belonging to an assembly.

---

## Parts

GET

```
/api/v1/parts/{id}
```

Returns one part.

---

# Security

Reuse Gate 2 authentication.

Every endpoint requires:

* Valid JWT
* Authenticated user

No role restrictions are required during this prototype.

Future gates may introduce finer-grained authorization.

---

# Exception Handling

Return standardized responses for:

* 400 Bad Request
* 401 Unauthorized
* 404 Not Found
* 500 Internal Server Error

Reuse the existing global exception handler.

---

# Validation Strategy

Backend Validation

* Gradle build succeeds.
* Application starts.
* Flyway validates.
* Docker starts successfully.

API Validation

Verify:

* GET /products
* GET /products/{id}
* GET /products/{productId}/assemblies
* GET /assemblies/{id}
* GET /assemblies/{assemblyId}/parts
* GET /parts/{id}

Security Validation

* Missing JWT → 401
* Invalid JWT → 401
* Valid JWT → 200

Integration Testing

Create MockMvc integration tests covering:

* Successful retrieval
* Invalid UUID
* Missing resource
* Unauthorized request

---

# Prototype Constraints

This session intentionally exposes only read-only APIs.

Exactly one engineering hierarchy is expected:

Product

* Radar System

Assembly

* Power Supply Unit

Part

* Cooling Fan

Do NOT implement:

* CRUD
* Pagination
* Search
* Sorting
* Filtering
* Caching
* HATEOAS
* GraphQL
* Projections
* Recursive hierarchies
* Business workflows

The implementation should remain simple while preserving future extensibility.

---

# Deliverables

Backend

* DTOs
* Mappers
* Services
* Controllers
* Read-only APIs

Testing

* Integration tests
* Security validation

Infrastructure

* Successful Docker deployment
* Passing Gradle build

---

# AI Coding Instructions

Implement one layer at a time.

Validate after each layer.

Do not expose JPA entities through the API.

Do not place business logic inside controllers.

Keep services lightweight and read-only.

Reuse the existing authentication system.

Stop immediately after Session 2 validation.

Do not begin Session 3.

---

# Success Criteria

Session 2 is complete when:

* Authenticated users can navigate:

Products

↓

Assemblies

↓

Parts

through secure REST APIs.

All validation passes.

The backend remains modular, maintainable, and aligned with the Atlas architecture.

Wait for approval before beginning Gate 3 – Session 3.