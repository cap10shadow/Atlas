# 11_GATE3_IMPLEMENTATION_PLAN.md

# Atlas – Gate 3 Implementation Plan

---

# Document Purpose

This document defines the engineering implementation strategy for Gate 3 — Core Product Hierarchy.

Unlike the PRD, Architecture, and API Specification documents, this implementation plan defines **how Gate 3 will be executed**.

The document serves as the execution guide for AI coding agents and developers.

Implementation should follow this document exactly.

---

# Gate Objective

Build the core engineering hierarchy that enables authenticated users to explore engineering products from the highest level down to individual maintainable parts.

This gate establishes the central business domain upon which all remaining Atlas functionality depends.

Once Gate 3 is complete, users should be able to navigate:

Dashboard

↓

Products

↓

Assemblies

↓

Parts

This hierarchy becomes the foundation for:

* Documentation (Gate 4)
* Training (Gate 5)
* Search (Gate 6)
* Administration (Gate 7)

---

# Engineering Goals

Gate 3 should deliver:

* Product hierarchy
* Engineering navigation
* Secure read-only APIs
* Responsive frontend explorer
* Enterprise-quality user experience
* Modular backend implementation
* Production-quality persistence layer

The implementation should remain simple while preserving future extensibility.

---

# Scope

Included

* Products
* Assemblies
* Parts
* Product Explorer
* Assembly Explorer
* Part Explorer
* Breadcrumb navigation
* Dashboard integration
* Demo hierarchy

Excluded

* Documentation
* Procedures
* Training
* Media
* Search
* CRUD management
* Administration
* Versioning
* Workflow
* XML

These belong to later gates.

---

# Prototype Strategy

Atlas is currently an engineering prototype designed to demonstrate architecture, engineering quality, and user experience.

The objective is **not** to create a fully populated enterprise documentation platform.

Only a minimal amount of demonstration data should be implemented.

One complete engineering hierarchy is sufficient.

Example hierarchy:

Radar System

↓

Power Supply Unit

↓

Cooling Fan

Future products may exist as lightweight placeholder records without requiring complete documentation or media.

Engineering quality always takes priority over demonstration data volume.

---

# Design Principles

Every implementation decision should prioritize:

* Simplicity
* Maintainability
* Readability
* Extensibility
* Separation of Concerns
* Clean Architecture

Avoid implementing functionality that is not required to demonstrate the engineering hierarchy.

---

# Architecture Rules

The modular monolith architecture defined in 04_ARCHITECTURE.md must remain unchanged.

Each business module owns its own:

* Entity
* Repository
* Service
* Controller
* DTOs
* Validation
* Exceptions

Business logic must never bypass module boundaries.

Controllers remain lightweight.

Repositories remain persistence-only.

Services own business logic.

---

# Security Rules

All endpoints introduced during Gate 3 must use the authentication framework implemented during Gate 2.

Authentication

✔ Required

Authorization

✔ Role Based

JWT

✔ Required

Public Endpoints

✘ None

Unauthenticated users must never access engineering data.

---

# Demo Data Policy

Only one complete hierarchy should be fully implemented.

Product

Radar System

Assembly

Power Supply Unit

Part

Cooling Fan

Additional products or assemblies should exist only as lightweight placeholder records where necessary to improve the demonstration experience.

Avoid unnecessary demo data.

---

# Implementation Strategy

Gate 3 is intentionally divided into four independent implementation sessions.

Each session must produce a working milestone.

Implementation must stop after each session until validation has completed.

```

---

## Session Overview

```text
Session 1

Database & Persistence Layer

↓

Validation

↓

Session 2

Backend APIs (Read-only MVP)

↓

Validation

↓

Session 3

Frontend Product Explorer

↓

Validation

↓

Session 4

Final Validation

Documentation

Cleanup

Git Commit

Gate Complete
```

```md
Every session must leave the application in a deployable state.

No session may depend on unfinished work from a later session.

```

---

This is **Part 1**.

I would rate it **10/10** and fully consistent with your existing documentation.

**Next, we'll write Part 2**, which covers **Session 1 (Database & Persistence)** and **Session 2 (Backend APIs)** in the same level of detail as your Gate 2 implementation plan.

# Session 1 — Database & Persistence Layer

---

## Objective

Establish the complete persistence layer for the engineering hierarchy.

This session creates the database schema, JPA entities, repositories, and demo data that become the foundation for the remaining implementation.

No business logic, REST APIs, or frontend code should be implemented during this session.

---

## Scope

Implement:

* Flyway Migration (V3)
* Product Entity
* Assembly Entity
* Part Entity
* ProductRepository
* AssemblyRepository
* PartRepository
* Demo Seed Data

Do Not Implement:

* Services
* Controllers
* DTOs
* Validation
* Business Logic
* UI

---

## Step 1 — Flyway Migration

Objective

Create the database schema required for the engineering hierarchy.

Migration

```
V3__core_product_hierarchy.sql
```

Create Tables

* products
* assemblies
* parts

Relationships

```
Product

↓

Assembly

↓

Part
```

---

## Products Table

Purpose

Represents an engineering product.

Example

```
Radar System
```

Typical Fields

* id
* product_code
* name
* description
* status
* created_at
* updated_at
* version

---

## Assemblies Table

Purpose

Represents logical assemblies belonging to a product.

Example

```
Power Supply Unit
```

Relationships

* Many Assemblies → One Product

Typical Fields

* id
* product_id
* assembly_code
* name
* description
* status
* created_at
* updated_at
* version

---

## Parts Table

Purpose

Represents maintainable engineering components.

Example

```
Cooling Fan
```

Relationships

* Many Parts → One Assembly

Typical Fields

* id
* assembly_id
* part_number
* name
* description
* status
* created_at
* updated_at
* version

---

## Constraints

Products

* product_code unique

Assemblies

* assembly_code unique

Parts

* part_number unique

Foreign Keys

* product_id
* assembly_id

Indexes

* product_code
* assembly_code
* part_number
* product_id
* assembly_id

---

## Demo Seed Data

Insert only one complete hierarchy.

```
Radar System

↓

Power Supply Unit

↓

Cooling Fan
```

No additional engineering data should be created.

Future placeholder records belong to later gates.

---

## Step 2 — Domain Layer

Create

```
Product

Assembly

Part
```

Requirements

* UUID Primary Keys
* JPA Entities
* BaseEntity inheritance
* Proper relationships
* Lazy loading
* Clean annotations

Avoid business logic inside entities.

---

## Step 3 — Repository Layer

Create

```
ProductRepository

AssemblyRepository

PartRepository
```

Repositories should expose only persistence operations.

Required Queries

Product

```
findById()

findAll()
```

Assembly

```
findByProductId()

findById()
```

Part

```
findByAssemblyId()

findById()
```

No custom business logic.

---

## Session 1 Validation Checklist

✔ Flyway migration executes

✔ Tables created

✔ Foreign keys created

✔ Seed data inserted

✔ Gradle build passes

✔ Docker starts successfully

✔ Spring Boot starts

✔ Repository tests pass

---

## Session 1 Exit Criteria

The engineering hierarchy exists inside PostgreSQL.

Repositories compile successfully.

The application remains deployable.

Stop implementation.

Proceed only after validation passes.

---

# Session 2 — Backend APIs (Read-Only MVP)

---

## Objective

Expose the engineering hierarchy through secure REST APIs.

Version 1 intentionally provides **read-only** access.

Management functionality belongs to Gate 7.

---

## Scope

Implement

* ProductService
* AssemblyService
* PartService

* ProductController
* AssemblyController
* PartController

* Request Validation

* Response DTOs

* Exception Handling

Do Not Implement

* POST
* PUT
* DELETE
* Admin CRUD

---

## Step 1 — DTO Layer

Create

Products

* ProductResponse
* ProductSummaryResponse

Assemblies

* AssemblyResponse
* AssemblySummaryResponse

Parts

* PartResponse
* PartSummaryResponse

Entities must never be returned directly.

---

## Step 2 — Mapper Layer

Create

```
ProductMapper

AssemblyMapper

PartMapper
```

Responsibilities

* Entity → DTO

Only.

---

## Step 3 — Service Layer

Create

```
ProductService

AssemblyService

PartService
```

Responsibilities

Products

* Get All Products
* Get Product

Assemblies

* Get Assemblies by Product
* Get Assembly

Parts

* Get Parts by Assembly
* Get Part

Business Rules

* Validate IDs
* Throw NotFoundException
* Return DTOs

---

## Step 4 — Controllers

Create

```
ProductController

AssemblyController

PartController
```

Read-Only Endpoints

```
GET /products

GET /products/{id}

GET /products/{productId}/assemblies

GET /assemblies/{id}

GET /assemblies/{assemblyId}/parts

GET /parts/{id}
```

No write operations.

---

## Security

Authentication

✔ Required

Authorization

Authenticated users may browse the hierarchy.

Administrative permissions are deferred to Gate 7.

---

## Error Handling

Return

404

for missing resources.

Return

401

for unauthenticated users.

Return

500

only for unexpected failures.

All responses must follow the standard API response defined in 06_API_SPEC.md.

---

## Session 2 Validation Checklist

✔ APIs compile

✔ Authentication enforced

✔ Products returned

✔ Assemblies returned

✔ Parts returned

✔ Invalid IDs return 404

✔ Unauthorized requests return 401

✔ Docker validation passes

---

## Session 2 Exit Criteria

Users can securely browse the engineering hierarchy through REST APIs.

The backend is complete.

Stop implementation.

Proceed only after validation succeeds.

---
# Session 3 — Frontend Product Explorer

---

## Objective

Build the primary user experience for navigating the engineering hierarchy.

The interface should allow authenticated users to move naturally from Products to Assemblies and finally to Parts.

The focus of this session is usability, clarity, and responsiveness rather than implementing every enterprise feature.

---

## Scope

Implement

* Product Explorer
* Assembly Explorer
* Part Explorer
* Dashboard integration
* Breadcrumb navigation
* Empty states
* Loading states
* Error handling
* API integration

Do Not Implement

* Product creation
* Product editing
* Drag & Drop
* Advanced filtering
* Search
* Document viewing
* Training viewer

These belong to later gates.

---

# UI Philosophy

The frontend should present engineering information in a clean, modern, enterprise-style interface.

Users should immediately understand where they are within the product hierarchy.

Navigation should always require the minimum number of clicks.

The interface should feel lightweight while remaining scalable for future modules.

---

# Step 1 — Dashboard

Enhance the existing dashboard.

Display

* Total Products
* Total Assemblies
* Total Parts

Provide quick navigation into the Product Explorer.

Do not implement analytics, charts, or operational metrics during this gate.

---

# Step 2 — Product Explorer

Create

```
/products
```

Features

* Product cards
* Product name
* Product code
* Description
* Number of assemblies
* View Details button

Clicking a product opens its assemblies.

---

# Step 3 — Assembly Explorer

Display assemblies belonging to the selected product.

Each assembly card displays

* Assembly Name
* Assembly Code
* Description
* Number of Parts

Clicking an assembly opens its parts.

---

# Step 4 — Part Explorer

Display all parts belonging to the selected assembly.

Each part displays

* Part Number
* Part Name
* Description

Selecting a part opens the Part Details page.

The details page acts as the entry point for future Documentation and Training modules.

---

# Step 5 — Part Details

Create

```
/parts/{id}
```

Display

* Part Name
* Part Number
* Description

Placeholder sections

* Documentation
* Procedures
* Training
* Media

Display simple "Coming in Gate X" placeholders where functionality has not yet been implemented.

This reinforces the future roadmap while keeping the prototype complete.

---

# Step 6 — Navigation

Implement persistent breadcrumb navigation.

Example

```
Dashboard

>

Radar System

>

Power Supply Unit

>

Cooling Fan
```

Breadcrumbs should appear on every hierarchy page.

---

# Step 7 — API Integration

Use the authenticated API client created during Gate 2.

Responsibilities

* Fetch Products
* Fetch Assemblies
* Fetch Parts

Automatically attach JWT tokens.

Handle unauthorized responses.

Redirect expired sessions to Login.

---

# Step 8 — Loading States

Every page should display

* Skeleton loaders
* Loading indicators

Avoid blank pages.

---

# Step 9 — Empty States

Examples

"No Products Available"

"No Assemblies Available"

"No Parts Available"

Provide helpful guidance instead of empty tables.

---

# Step 10 — Error Handling

Display friendly messages for

* Network failures
* Unauthorized access
* Missing resources

Do not expose backend exception details.

---

# Responsive Design

Support

* Desktop
* Laptop
* Tablet

Mobile support should remain functional but is not a primary objective for the prototype.

---

# Session 3 Validation Checklist

✔ Login redirects correctly

✔ Dashboard loads

✔ Products displayed

✔ Assemblies displayed

✔ Parts displayed

✔ Breadcrumb navigation works

✔ Loading states visible

✔ Empty states handled

✔ Unauthorized users redirected

✔ Frontend production build succeeds

---

# Session 3 Exit Criteria

Users can browse the complete engineering hierarchy through the frontend.

Navigation is intuitive.

Authentication remains enforced.

The application is ready for demonstration.

---

# Session 4 — Final Validation, Documentation & Cleanup

---

## Objective

Prepare Gate 3 for completion.

Validate the complete engineering workflow.

Update project documentation.

Leave the repository in a production-quality state.

---

## Scope

Perform

* Backend validation
* Frontend validation
* Docker validation
* Documentation updates
* Architecture review
* Code cleanup
* Final Git commit

No new functionality should be introduced.

---

# Step 1 — Backend Validation

Verify

✔ Gradle build

✔ Tests

✔ Flyway migrations

✔ Repository startup

✔ Docker backend

✔ API responses

✔ Security

---

# Step 2 — Frontend Validation

Verify

✔ Production build

✔ TypeScript

✔ Navigation

✔ Authentication

✔ API integration

✔ Protected routes

---

# Step 3 — End-to-End Validation

Complete the following user journey

```
Login

↓

Dashboard

↓

Products

↓

Radar System

↓

Power Supply Unit

↓

Cooling Fan

↓

Part Details
```

Every transition should complete successfully.

---

# Step 4 — Documentation Review

Review

* 05_DATABASE.md
* 06_API_SPEC.md

Update only if implementation differs from the documented design.

Otherwise, no documentation changes are required.

---

# Step 5 — Architectural Cleanup

Perform

* Remove unused code
* Remove dead imports
* Improve naming
* Simplify services
* Remove duplication
* Verify package organization
* Ensure module boundaries remain intact

Do not introduce refactoring unrelated to Gate 3.

---

# Step 6 — Final Repository Validation

Verify

✔ Gradle Build

✔ Frontend Build

✔ Docker Compose

✔ PostgreSQL

✔ Authentication

✔ Product APIs

✔ Explorer UI

✔ Repository structure

✔ Documentation consistency

---

# Deliverables

Backend

* Product Module
* Assembly Module
* Part Module
* Read-only REST APIs

Frontend

* Dashboard updates
* Product Explorer
* Assembly Explorer
* Part Explorer
* Breadcrumb navigation

Database

* V3 Flyway migration
* Product hierarchy schema
* Demo hierarchy

Infrastructure

* Docker validation
* Repository validation

---

# Gate 3 Exit Criteria

Gate 3 is complete when

* The engineering hierarchy is fully implemented.
* Authenticated users can navigate from Product to Part.
* All backend APIs are operational.
* Frontend explorer is functional.
* Docker deployment succeeds.
* Automated tests pass.
* Documentation remains synchronized.
* The repository is committed and pushed.

---

# AI Coding Instructions

Implement one session at a time.

Validate each session completely before continuing.

Do not begin the next session until the current session passes validation.

Maintain modular boundaries.

Keep controllers lightweight.

Keep business logic inside services.

Never expose entities through APIs.

Generate production-quality code.

Perform a self-review after every session.

Create one Git commit after each completed session.

---

# Success Criteria

Atlas successfully demonstrates the complete engineering navigation workflow.

An authenticated user can seamlessly browse:

```
Login

↓

Dashboard

↓

Products

↓

Assemblies

↓

Parts
```

The implementation remains clean, modular, secure, and fully aligned with the Atlas architecture while leaving clear extension points for Documentation, Training, Search, and Administration in subsequent gates.