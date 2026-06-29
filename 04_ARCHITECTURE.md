# 04_ARCHITECTURE.md

# Atlas – System Architecture

---

# Document Purpose

This document defines the high-level software architecture of Atlas.

It describes how the frontend, backend, database, storage, and supporting components interact while maintaining a modular, scalable, and maintainable architecture.

This document focuses on logical software architecture rather than deployment or infrastructure.

---

# Architecture Goals

The architecture should:

* Be easy to understand
* Be modular
* Be scalable
* Be maintainable
* Support future S1000D capabilities
* Minimize coupling between modules
* Maximize component reusability

---

# Architecture Style

Atlas follows a **Modular Monolith Architecture**.

The application is deployed as a single backend application while internally separating responsibilities into independent business modules.

This approach provides:

* Faster MVP development
* Lower operational complexity
* Easier debugging
* Easier testing
* Clear module boundaries
* Future migration to microservices without major architectural redesign

---

# High-Level Architecture

```text
                         Web Browser
                              │
                    Next.js / React Frontend
                              │
                        REST API Layer
                              │
                    Spring Boot Backend
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
 Application & Domain     File Storage        PostgreSQL
        Layer                                    Database
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                         Domain Model
```

---

# Architectural Principles

Atlas follows a layered architecture based on Domain-Driven Design.

Every request follows the same lifecycle:

```text
User Interface

↓

REST API

↓

Application Service

↓

Domain Logic

↓

Repository

↓

Database

↓

Response
```

Business logic remains independent of presentation, persistence, and infrastructure.

---

# System Layers

## Presentation Layer

### Responsibilities

* User Interface
* Routing
* Authentication
* Navigation
* Forms
* State Management

### Technology

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

---

## API Layer

### Responsibilities

* REST Endpoints
* Request Validation
* Authentication
* Authorization
* Response Formatting

### Technology

* Spring Boot
* Spring Web

---

## Application & Domain Layer

### Responsibilities

* Business Rules
* Domain Logic
* Validation
* Permissions
* Application Services

### Business Modules

* Authentication
* Products
* Assemblies
* Parts
* Documents
* Training
* Search
* Administration

---

## Persistence Layer

### Responsibilities

* Database Access
* Repository Pattern
* Entity Management
* Data Persistence

### Technology

* Spring Data JPA
* PostgreSQL

---

## Storage Layer

### Responsibilities

Store:

* PDF Documents
* Images
* Videos
* Demo JSON Data
* Future XML Data Modules

Storage remains abstract so local storage can later be replaced with cloud object storage.

---

# Backend Module Structure

Every backend module follows the same internal structure.

```text
Authentication
├── Controller
├── Service
├── Repository
├── DTO
├── Entity
└── Mapper

Products
├── Controller
├── Service
├── Repository
├── DTO
├── Entity
└── Mapper

Assemblies
├── Controller
├── Service
├── Repository
├── DTO
├── Entity
└── Mapper

Parts
├── Controller
├── Service
├── Repository
├── DTO
├── Entity
└── Mapper

Documents
├── Controller
├── Service
├── Repository
├── DTO
├── Entity
└── Mapper

Training
├── Controller
├── Service
├── Repository
├── DTO
├── Entity
└── Mapper

Search
├── Controller
├── Service
└── DTO

Administration
├── Controller
├── Service
└── DTO
```

Each module owns its own business logic and communicates through well-defined service boundaries.

---

# Frontend Module Structure

The frontend follows feature-based organization.

```text
Authentication

Dashboard

Products

Assemblies

Parts

Documents

Training

Search

Administration

Shared Components

Shared Hooks

Shared Utilities
```

---

# Implementation Status (Prototype v1.0)

The module structures above describe the target design for the full Atlas Platform. In this prototype:

* **Fully implemented** (backend + database + REST API + frontend): Authentication, Products, Assemblies, Parts.
* **Scaffolded only** (module folders and empty entity/controller classes exist to preserve the architecture, but contain no fields, persistence, or endpoints): Documents, Procedures, Training, Media, Search, Administration.
* The frontend Documents, Training, Search, and Profile experiences are implemented as **frontend-only modules** using static demo content, deliberately without new backend APIs. They demonstrate the intended user experience ahead of the backend modules listed above, which are deferred to the future Atlas Platform (Portfolio Edition).

---

# Domain Model

Atlas revolves around a hierarchical engineering product model.

```text
Product
│
├── Assembly
│
│   ├── Sub Assembly (Optional)
│   │
│   ├── Part
│   │
│   ├── Documents
│   ├── Procedures
│   ├── Training
│   ├── Media
│   └── Downloads
```

Every piece of information belongs to a business entity rather than existing as an isolated file.

---

# Request Lifecycle

Every user request follows the same processing pipeline.

```text
Web Browser

↓

Next.js

↓

REST Controller

↓

Application Service

↓

Domain Service

↓

Repository

↓

PostgreSQL

↓

DTO

↓

Frontend Response
```

---

# Cross-Cutting Components

Shared services available across the entire application.

* Authentication
* Authorization
* Validation
* Logging
* Exception Handling
* Configuration Management
* File Storage
* Response Handling

These components are shared and should never contain business-specific logic.

---

# Security Architecture

Version 1 includes:

* Authentication
* Role-Based Authorization
* Protected Routes
* Secure REST APIs

Future versions may include:

* OAuth2
* OpenID Connect
* Enterprise SSO
* LDAP / Active Directory Integration

---

# Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA

## Database

* PostgreSQL

## Storage

* Local File Storage

## Infrastructure

* Docker
* Docker Compose

---

# Scalability Strategy

The MVP uses a modular monolith architecture.

Future improvements may include:

* Object Storage
* Redis Caching
* Search Indexing
* Background Job Processing
* Event-Driven Communication
* Independent Module Deployment

---

# Future Architecture Evolution

```text
Version 1

↓

Modular Monolith

↓

Version 2

↓

Modular Services

↓

Version 3

↓

Distributed Enterprise Platform

↓

Future

↓

Complete S1000D Platform
```

---

# Future Enterprise Components

Future versions may introduce:

* XML Processing Engine
* S1000D Data Module Service
* Common Source Database (CSDB)
* BREX Validation Engine
* Publishing Engine
* Workflow Engine
* Notification Service
* Audit Service
* Search Engine
* Analytics Engine

These components are intentionally excluded from Version 1.

---

# Architecture Principles

Every module should:

* Be independently testable
* Own its own business logic
* Communicate through service boundaries
* Avoid circular dependencies
* Expose functionality only through public APIs
* Minimize shared state
* Prefer composition over tight coupling

---

# Dependencies

This document provides the architectural foundation for:

* 05_DATABASE.md
* 06_API_SPEC.md
* 07_REPOSITORY_STRUCTURE.md
* 08_IMPLEMENTATION_ROADMAP.md

---

# Notes for AI Coding Agents

Implement Atlas as a modular monolith.

Generate clean module boundaries.

Avoid unnecessary microservices.

Follow layered architecture and Domain-Driven Design principles.

Keep the domain model independent of storage implementation.

Every business module should be self-contained with Controllers, Services, Repositories, DTOs, Entities, and Mappers.

Design all modules so they can be extracted into independent services in future versions without changing their public APIs.
