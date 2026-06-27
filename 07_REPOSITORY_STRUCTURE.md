# 07_REPOSITORY_STRUCTURE.md

# Atlas – Repository Structure

---

# Document Purpose

This document defines the repository organization for Atlas.

It establishes how source code, configuration, documentation, storage, demo content, infrastructure, and development assets are organized.

The repository is designed for maintainability, scalability, collaboration, and AI-assisted development.

---

# Repository Philosophy

The repository should:

* Be easy to navigate
* Separate frontend and backend responsibilities
* Keep business modules isolated
* Support modular development
* Avoid unnecessary nesting
* Scale without structural redesign
* Follow consistent conventions across all modules

---

# High-Level Repository Structure

```text
atlas/

├── frontend/
├── backend/
├── storage/
├── demo/
├── docs/
├── scripts/
├── docker/
├── .github/
├── docker-compose.yml
├── .env.example
├── README.md
├── LICENSE
└── .gitignore
```

---

# Frontend Structure

```text
frontend/

├── public/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │
│   ├── authentication/
│   ├── dashboard/
│   ├── products/
│   ├── assemblies/
│   ├── parts/
│   ├── documents/
│   ├── procedures/
│   ├── training/
│   ├── media/
│   ├── search/
│   ├── admin/
│   │
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── styles/
│
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── eslint.config.js
├── tsconfig.json
└── Dockerfile
```

---

# Backend Structure

```text
backend/

├── src/
│
├── main/
│   ├── java/
│   │
│   └── com/
│       └── atlas/
│
│           ├── config/
│           ├── common/
│           ├── constants/
│           ├── security/
│           ├── exception/
│           ├── validation/
│           ├── util/
│           │
│           ├── authentication/
│           ├── products/
│           ├── assemblies/
│           ├── parts/
│           ├── documents/
│           ├── procedures/
│           ├── training/
│           ├── media/
│           ├── search/
│           ├── admin/
│           │
│           └── AtlasApplication.java
│
├── resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   ├── db/
│   ├── static/
│   └── templates/
│
├── test/
│
├── build.gradle
├── settings.gradle
└── Dockerfile
```

---

# Standard Backend Module Structure

Every business module follows the same internal organization.

```text
module/

├── controller/
├── service/
├── repository/
├── entity/
├── dto/
├── mapper/
├── validator/
├── exception/
└── specification/
```

Each module owns its own business logic and remains independent from other modules.

---

# Storage Structure

```text
storage/

├── documents/
├── procedures/
├── videos/
├── images/
├── thumbnails/
├── uploads/
├── exports/
└── temp/
```

The Storage directory contains uploaded assets only.

Business metadata remains inside PostgreSQL.

---

# Documentation Structure

```text
docs/

├── architecture/
├── api/
├── database/
├── design/
├── development/
├── decisions/
└── adr/
```

Architectural Decision Records (ADR) should document major design decisions throughout the project.

---

# Demo Structure

```text
demo/

├── bel/
│
├── products/
│
├── radar-system/
│
├── power-supply-unit/
│
└── cooling-fan/
```

The demo directory contains only sample data used to demonstrate the platform.

Production deployments should replace this data without modifying application code.

---

# Docker Structure

```text
docker/

├── backend/
├── frontend/
└── nginx/
```

Container configuration remains isolated from application code.

---

# Build & CI

```text
.github/

└── workflows/

    ├── backend.yml

    ├── frontend.yml

    └── docker.yml
```

These workflows automate build validation, testing, and container verification.

---

# Scripts

```text
scripts/

├── setup.sh
├── seed-data.sh
├── backup.sh
├── clean.sh
└── start-dev.sh
```

Automation scripts should never contain business logic.

---

# Configuration

Environment-specific configuration should remain outside application code.

```text
.env

.env.example

application.yml

application-dev.yml

application-prod.yml
```

Configuration values should be injected through environment variables whenever possible.

---

# Development Workflow

A typical feature implementation follows:

```text
Feature Request

↓

Database Entity

↓

Repository

↓

Service

↓

Controller

↓

REST API

↓

Frontend Service

↓

Frontend UI

↓

Testing
```

---

# Feature Development Guidelines

Every business module should include:

* Entity
* Repository
* Service
* Controller
* DTOs
* Mapper
* Validator
* Exception Handling
* Tests

Maintain the same folder structure across every module.

---

# Testing Structure

```text
backend/

├── test/
│
├── integration/
└── unit/

frontend/

├── tests/
│
├── components/
└── features/
```

Testing should remain separated by responsibility.

---

# Static Assets

Application assets should be organized separately.

```text
public/

├── images/
├── icons/
├── logos/
└── fonts/
```

---

# Repository Design Principles

The repository should:

* Keep frontend and backend independent
* Avoid duplicated code
* Prefer feature-based organization
* Keep configuration centralized
* Separate storage from metadata
* Keep modules self-contained
* Maintain consistent naming conventions

---

# Dependencies

This repository organization supports:

* Development Team
* AI Coding Agents
* CI/CD Pipelines
* Docker Configuration
* Future Enterprise Features

---

# Notes for AI Coding Agents

Generate the repository exactly as described.

Keep all business modules self-contained.

Generate one package per business module.

Do not place business logic inside Controllers.

Do not expose Entity classes outside the backend.

Store uploaded files in the Storage layer.

Generate configuration files in the appropriate locations.

Follow the standard module structure for every feature.

Maintain consistency across the repository.

Prefer feature-based organization over technical grouping.

Keep the repository ready for future enterprise-scale expansion without introducing unnecessary complexity in Version 1.