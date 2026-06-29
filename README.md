# Atlas

Atlas is an enterprise technical documentation and knowledge management platform for complex engineering products, built as a modular monolith.

**Status: Prototype v1.0** — Atlas is released as a stable, demonstration-ready Engineering Portal prototype. See [Current Scope](#current-scope) and [Prototype Limitations](#prototype-limitations) below.

---

## Project Overview

Atlas centralizes engineering documentation, maintenance knowledge, and training content for complex products, following architecture principles inspired by S1000D that can evolve into a fully S1000D-compliant enterprise solution.

This prototype demonstrates the platform using a simplified demo dataset (one fully populated product hierarchy plus three placeholder products) while the underlying architecture is designed to scale to enterprise deployments.

## Prototype Objectives

* Demonstrate a clean, modular, enterprise-grade architecture (Spring Boot modular monolith + Next.js frontend).
* Demonstrate secure authentication and role-based access control.
* Demonstrate the core engineering hierarchy: Products → Assemblies → Parts.
* Demonstrate the intended Documentation, Training, and Search experiences using a frontend-only prototype (no backend persistence yet).
* Establish a stable foundation for the future **Atlas Platform (Portfolio Edition)**.

## Key Features

* JWT-based authentication with role-based access control (RBAC)
* Product → Assembly → Part engineering hierarchy explorer with breadcrumb navigation
* Read-only REST APIs backed by PostgreSQL/Flyway-managed schema
* Documentation viewer (PDF preview placeholder, disabled download/print/share actions)
* Training viewer (native HTML5 video player with graceful placeholder when no media is present)
* Client-side search across products, assemblies, parts, documents, and training resources
* User profile page with live session information
* Enterprise-style UI: persistent sidebar, header, breadcrumbs, empty states, skeleton loading, footer

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Java 21, Spring Boot, Spring Security, Spring Data JPA |
| Database | PostgreSQL, Flyway |
| Infrastructure | Docker, Docker Compose |

## Architecture Overview

Atlas follows a **modular monolith** backend. Each business module (`authentication`, `products`, `assemblies`, `parts`, `documents`, `procedures`, `training`, `media`, `search`, `admin`) owns its own controller, service, repository, entity, and DTO layers, and communicates with other modules only through well-defined service boundaries.

The frontend mirrors this with feature-based organization (one folder per domain: `products`, `assemblies`, `parts`, `documents`, `training`, `search`, `authentication`, `dashboard`), plus a shared component/layout library (`components/`, `hooks/`, `services/`, `types/`).

See [04_ARCHITECTURE.md](04_ARCHITECTURE.md), [05_DATABASE.md](05_DATABASE.md), and [06_API_SPEC.md](06_API_SPEC.md) for the full target design, and [08_IMPLEMENTATION_ROADMAP.md](08_IMPLEMENTATION_ROADMAP.md) for what has actually been implemented in this prototype vs. deferred to the future portfolio edition.

## Screenshots

Screenshots are not yet checked into this repository. Run the application locally (see below) and sign in with the demo administrator account to view the live UI.

## Local Development Setup

1. Copy `.env.example` to `.env` and adjust values as needed.
2. Run `./scripts/setup.sh` to verify prerequisites.
3. Start PostgreSQL (via Docker, or your own instance matching the `.env` values).
4. Backend:
   ```bash
   cd backend
   ./gradlew bootRun
   ```
5. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
6. Backend: http://localhost:8080 · Frontend: http://localhost:3000

### Demo Login

| Email | Password | Role |
| --- | --- | --- |
| `admin@atlas.local` | `Atlas@Admin123` | Administrator |

This account is seeded by the Flyway migrations for demonstration purposes only.

## Docker Setup

```bash
cp .env.example .env
docker compose up --build
```

This starts PostgreSQL, the Spring Boot backend, and the Next.js frontend together. Backend: http://localhost:8080 · Frontend: http://localhost:3000

Alternatively, run `./scripts/start-dev.sh`, which performs the same steps.

## Project Structure

```text
atlas/
├── frontend/      Next.js application
├── backend/        Spring Boot application
├── storage/        Uploaded asset storage (documents, media, etc.)
├── demo/           Sample demonstration content
├── docs/           Architecture, API, and decision records
├── scripts/        Local development automation scripts
├── docker/         Container configuration isolated from app code
└── docker-compose.yml
```

See [07_REPOSITORY_STRUCTURE.md](07_REPOSITORY_STRUCTURE.md) for the complete repository layout and the numbered planning documents (`00`–`13`) for architecture, database design, API specification, and implementation history.

## Scripts

| Script | Purpose |
| --- | --- |
| `scripts/setup.sh` | Verify required tooling and prepare `.env` |
| `scripts/start-dev.sh` | Start the full stack via Docker Compose |
| `scripts/seed-data.sh` | Load demo content into the database |
| `scripts/backup.sh` | Back up the PostgreSQL database |
| `scripts/clean.sh` | Remove build artifacts and containers |

## Current Scope

This prototype implements:

* Authentication & RBAC (login, logout, JWT, protected routes)
* Read-only Product → Assembly → Part hierarchy, backed by real REST APIs and a PostgreSQL schema
* One fully populated demo hierarchy (Radar System → Power Supply Unit → Cooling Fan) plus three placeholder products (Communication System, Navigation Computer, Missile Guidance System)
* A frontend-only Documentation, Training, Search, and Profile experience, built on static demo content rather than new backend APIs

## Prototype Limitations

The following are **intentionally not implemented** in this prototype and are reserved for the future Atlas Platform (Portfolio Edition):

* Document/Training/Procedure/Media backend persistence — the corresponding entities and controllers exist only as empty scaffolding (`backend/src/main/java/com/atlas/{documents,training,procedures,media}`)
* Create/update/delete operations for Products, Assemblies, and Parts (the hierarchy API is deliberately read-only in this prototype)
* Server-side or semantic search (the current Search experience filters already-loaded data on the client)
* Administration module (user/content management UI)
* File uploads, PDF rendering, and video streaming (the Documentation and Training viewers display placeholders by design)
* Content review/approval workflows

## Future Portfolio Roadmap

Future development continues as the separate **Atlas Platform (Portfolio Edition)**, building on this stable prototype foundation:

* Full Documentation, Training, Procedures, and Media backend modules with real persistence
* Product hierarchy management (CRUD) and an Administration module
* Server-side and/or semantic search
* Atlas Content Studio (uploads, review/approval workflows, publishing)
* S1000D-inspired enterprise capabilities (CSDB, BREX validation, data modules, workflow)

## Development

Backend:

```bash
cd backend
./gradlew bootRun
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Project Status

**Prototype v1.0 — Complete.** Gates 1–3 (Project Foundation, Authentication, Core Product Hierarchy) and the subsequent UI Polish, Prototype Enhancement, and Gate 4 (final validation & release) sessions are complete. See [08_IMPLEMENTATION_ROADMAP.md](08_IMPLEMENTATION_ROADMAP.md) for the full implementation history.
