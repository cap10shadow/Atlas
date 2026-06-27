# 00_PROJECT_GUIDELINES.md

# Atlas - Project Guidelines

---

# Document Purpose

This document defines the common standards, engineering principles, documentation conventions, and AI coding guidelines used throughout the Atlas project.

All project documents should follow the conventions defined here.

---

# Product Identity

Atlas is an enterprise technical documentation and knowledge management platform for complex engineering products.

The platform is designed to centralize documentation, maintenance knowledge, multimedia, and training content while following architecture principles that can evolve into a fully S1000D-compliant enterprise solution.

---

# Product Positioning

Atlas is designed as a Software-as-a-Service (SaaS) platform that can also be deployed on-premises for organizations with strict security and compliance requirements.

The MVP demonstrates the platform using simplified demo content, while the architecture is designed to support enterprise-scale deployments.

---

# Project Vision

Build a modern, scalable, modular, and enterprise-grade documentation platform that demonstrates how structured technical information can be managed, explored, and consumed through a unified web application.

---

# Documentation Standards

Every project document should contain only information relevant to its purpose.

Avoid repeating content across documents.

Each document should reference related documents through a Dependencies section rather than duplicating information.

---

# Document Naming Convention

Project documents should follow the format:

```
00_PROJECT_GUIDELINES.md

01_PRODUCT_EXPERIENCE.md

02_PROJECT_BRAIN.md

03_PRD.md

04_ARCHITECTURE.md

05_DATABASE.md

06_API_SPEC.md

07_UI_UX.md

08_REPOSITORY_STRUCTURE.md

09_ROADMAP.md
```

---

# Standard Document Metadata

Every document should begin with:

* Document Name
* Version
* Status
* Purpose

Every document should end with:

* Dependencies
* Notes for AI Coding Agents

---

# Product Naming Conventions

Use generic domain terminology.

Preferred terminology:

* Product
* Assembly
* Sub Assembly
* Part
* Document
* Procedure
* Training
* Media
* User
* Role

Avoid hardcoding customer-specific names inside product documentation.

Customer-specific information belongs in the demo directory.

---

# Engineering Principles

Atlas follows the following engineering principles.

* Domain-driven design
* Clean architecture
* SOLID Principles
* Modular design
* API-first development
* Separation of concerns
* Backend-driven frontend
* Scalable domain model
* Reusable components
* Loose coupling
* High cohesion

---

# Architecture Principles

The architecture should always prioritize:

* Simplicity
* Maintainability
* Scalability
* Extensibility
* Readability
* Testability

Feature completeness should never take priority over architectural quality.

---

# UI Principles

The interface should feel like a modern enterprise SaaS platform.

Guidelines:

* Clean layout
* Consistent spacing
* Minimal visual clutter
* Responsive design
* Accessible navigation
* Reusable components
* Professional color palette
* Dashboard-first experience

---

# Backend Principles

The backend should:

* Expose REST APIs
* Own all business logic
* Validate incoming requests
* Return standardized API responses
* Implemet centralized exception handling
* Never expose database internals
* Keep controllers lightweight
* Keep services independent
* Keep repositories isolated

---

# Database Principles

The database should:

* Model real business entities
* Avoid duplicated information
* Support future scalability
* Keep relationships normalized
* Remain independent of demo data

---

# AI Coding Guidelines

AI coding agents should:

* Prefer maintainability over shortcuts.
* Generate production-quality code.
* Minimize unnecessary dependencies.
* Follow layered architecture.
* Generate reusable components.
* Keep functions small and focused.
* Avoid duplicate logic.
* Prefer configuration over hardcoding.
* Follow project naming conventions.

---

# Demo Data Policy

The MVP intentionally uses simplified demo content.

The architecture must never depend on:

* BEL
* Radar System
* Power Supply Unit
* Cooling Fan

These are demonstration assets only.

Replacing demo content with another customer should require no architectural changes.

---

# S1000D Strategy

Version 1 is **not** a fully S1000D-compliant implementation.

Instead, Atlas demonstrates concepts inspired by S1000D while maintaining an architecture capable of supporting future enterprise features such as:

* XML Data Modules
* CSDB
* BREX Validation
* Publishing
* Workflow
* IETP
* Configuration Management

---

# Definition of MVP

A feature belongs in Version 1 only if it directly demonstrates the product vision.

Features that significantly increase engineering complexity without improving demonstration value should be deferred to future releases.

---

# Quality Standards

Every implementation should aim for:

* Clean code
* Consistent naming
* Comprehensive logging
* Consistent error handling
* Low technical debt
* Modular architecture
* Clear documentation
* Enterprise-quality user experience

---

# Review Process

Every document and implementation should be reviewed using three priority levels.

🔴 Critical

Must be fixed before implementation.

🟡 Recommended

Strongly encouraged to improve quality.

🟢 Optional

Nice-to-have improvements.

---

# Decision Priority

When making engineering decisions, always prioritize in the following order:

1. Product Vision
2. User Experience
3. Maintainability
4. Scalability
5. Performance
6. Feature Completeness

---
# Source of Truth

This document is the highest-level reference for the Atlas project.

If another document conflicts with these guidelines, these guidelines take precedence unless explicitly updated.

---

# Notes for AI Coding Agents

Read this document before processing any other project documentation.

Use these conventions consistently throughout code generation, architecture decisions, naming, and repository organization.

Treat all remaining project documents as specialized extensions of these project guidelines.

---
# Document Version

Version: 1.0

Status: Draft

Owner: Product Team

Last Updated: <date>