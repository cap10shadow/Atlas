# 05_DATABASE.md

# Atlas – Database Design

---

# Document Purpose

This document defines the logical database design for Atlas.

It describes the business entities, their relationships, storage strategy, naming conventions, and database design principles used throughout the platform.

The schema is normalized and designed to support future enterprise capabilities, including S1000D integration, without requiring significant structural changes.

---

# Database Philosophy

Atlas models business concepts rather than user interface screens.

Every table represents a real business entity within the domain.

The design prioritizes:

* Normalization
* Maintainability
* Scalability
* Extensibility
* Referential Integrity

---

# Database Scope

Version 1 includes only the entities required to demonstrate the complete documentation workflow.

The MVP intentionally excludes advanced S1000D entities such as:

* Data Modules
* Publication Modules
* BREX Objects
* DMRL
* Applicability
* CSDB Metadata

These can be introduced later without changing the core hierarchy.

---

# Database Design Strategy

Atlas follows a normalized relational database design.

Business entities are stored independently and connected using foreign key relationships.

Large files are **never stored inside PostgreSQL**.

Instead:

* Metadata is stored in PostgreSQL.
* Physical files are stored in the Storage Layer.
* The database stores only file references and metadata.

---

# Core Entity Relationship

```text
User
│
├── Role

Product
│
├── Assembly
│
│   ├── Sub Assembly (Optional)
│   │
│   ├── Part
│   │
│   ├── Document
│   ├── Procedure
│   ├── Training
│   ├── Media
│   └── Download
```

---

# Common Entity Fields

Every business entity should include:

* id (UUID)
* created_at
* updated_at
* created_by
* updated_by
* status
* version

These fields provide consistency, auditing, and future extensibility.

---

# Core Entities

## User

### Purpose

Stores authenticated platform users.

### Typical Fields

* id
* username
* email
* password_hash
* role_id
* status

### Relationships

* Many Users → One Role

### Future

* LDAP
* OAuth2
* Enterprise SSO

---

## Role

### Purpose

Defines user permissions.

### Example Roles

* Administrator
* Technical Writer
* Reviewer
* Maintenance Engineer
* Technician
* Trainer

### Relationships

* One Role → Many Users

---

## Product

### Purpose

Represents a top-level engineering system.

### Typical Fields

* id
* name
* description
* product_code
* status

### Relationships

* One Product → Many Assemblies

---

## Assembly

### Purpose

Represents logical assemblies within a product.

### Typical Fields

* id
* product_id
* parent_assembly_id
* name
* assembly_code
* status

### Relationships

* One Assembly → One Product
* One Assembly → Many Parts
* One Assembly → Parent Assembly (Optional)

---

## Part

### Purpose

Represents maintainable engineering components.

### Typical Fields

* id
* assembly_id
* part_number
* name
* description
* status

### Relationships

* One Part → One Assembly
* One Part → Many Documents
* One Part → Many Procedures
* One Part → Many Training Resources
* One Part → Many Media Assets

---

## Document

### Purpose

Stores technical documentation metadata.

### Typical Fields

* id
* part_id
* title
* document_number
* file_path
* document_type
* version

### Relationships

* Many Documents → One Part

### Future

Can reference S1000D Data Modules.

---

## Procedure

### Purpose

Stores maintenance procedures.

### Typical Fields

* id
* part_id
* title
* description
* file_path

### Relationships

* Many Procedures → One Part

---

## Training

### Purpose

Stores training resources.

### Typical Fields

* id
* part_id
* title
* video_url
* duration

### Relationships

* Many Training Resources → One Part

---

## Media

### Purpose

Stores images and multimedia metadata.

### Typical Fields

* id
* part_id
* media_type
* file_path
* thumbnail

### Relationships

* Many Media Assets → One Part

---

# Entity Cardinality

```text
Role (1)
      │
      └────────── Users (N)

Product (1)
      │
      └────────── Assemblies (N)

Assembly (1)
      │
      └────────── Parts (N)

Part (1)
      ├────────── Documents (N)
      ├────────── Procedures (N)
      ├────────── Training (N)
      └────────── Media (N)
```

---

# Storage Strategy

Structured Data

→ PostgreSQL

Large Files

→ Local File Storage

Future

→ AWS S3 / Azure Blob Storage / Object Storage

---

# Naming Conventions

## Tables

Plural

Examples

* users
* roles
* products
* assemblies
* parts
* documents
* procedures
* training
* media

---

## Columns

snake_case

Examples

* product_id
* created_at
* updated_at
* part_number

---

## Primary Keys

UUID

```
id
```

---

## Foreign Keys

```
entity_id
```

Examples

* product_id
* assembly_id
* part_id
* role_id

---

# Database Constraints

* UUID Primary Keys
* Foreign Key Constraints
* NOT NULL where appropriate
* Unique Product Codes
* Unique Part Numbers
* Unique Document Numbers

---

# Indexing Strategy

Primary Indexes

* id

Secondary Indexes

* product_code
* assembly_code
* part_number
* document_number
* name

Foreign Key Indexes

* product_id
* assembly_id
* part_id
* role_id

---

# Soft Delete Strategy

Business entities should not be permanently deleted.

Instead use either:

* status
* deleted_at

This enables future auditing and data recovery.

---

# Future Database Expansion

Future versions may introduce:

* XML Data Modules
* Common Source Database (CSDB)
* BREX Rules
* Publication Modules
* Applicability
* Workflow History
* Audit Logs
* Notifications
* Search Indexes
* Analytics Tables

The current schema should support these additions without requiring major redesign.

---

# Database Design Principles

The database should:

* Represent business entities
* Avoid duplicated information
* Keep entities normalized
* Store metadata separately from files
* Minimize cascading deletes
* Prefer UUID primary keys
* Remain independent of presentation logic

---

# Dependencies

This document provides the database model for:

* 06_API_SPEC.md
* 07_UI_UX.md
* 08_REPOSITORY_STRUCTURE.md
* 09_ROADMAP.md

---

# Notes for AI Coding Agents

Generate normalized PostgreSQL tables and JPA entities.

Implement one entity class per business entity.

Use UUID primary keys.

Implement proper foreign key relationships.

Store only metadata inside PostgreSQL.

Store physical files in the Storage Layer.

Keep Entity classes independent from DTOs.

Generate Flyway/Liquibase migrations from this schema.

Avoid embedding business logic inside entity classes.