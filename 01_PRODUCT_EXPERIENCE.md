# 01_PRODUCT_FLOWS.md

# Atlas - Product Flows

---

# Document Purpose

This document defines how users interact with Atlas.

It is the primary reference for understanding user personas, navigation, product hierarchy, user journeys, and the overall application flow.

All future architecture, APIs, database design, and UI decisions should be derived from this document.

---

# Product Overview

Atlas is an enterprise technical documentation platform designed to centralize technical manuals, maintenance procedures, multimedia, and training content for complex engineering products.

The platform follows S1000D-inspired principles of structured, reusable, and hierarchical documentation while remaining technology-agnostic.

The MVP demonstrates the complete experience using simplified demo content.

---

# Target Users

## Customer / Operator

Consumes published documentation during operation and maintenance.

Primary Goals

- Access documentation
- View maintenance procedures
- Download manuals
- View multimedia

---
## Administrator

Responsible for managing users, products, demo content, and platform configuration.

Primary Goals

* Manage products
* Manage documentation
* Manage users
* Configure platform

---

## Technical Writer

Creates and updates technical documentation.

Primary Goals

* Upload documentation
* Edit documentation
* Organize documentation
* Attach multimedia

---

## Reviewer

Reviews documentation before publication.

Primary Goals

* Review submissions
* Approve documentation
* Reject with comments

---

## Maintenance Engineer

Uses documentation during maintenance activities.

Primary Goals

* Find product information
* View procedures
* Download manuals
* Watch maintenance videos

---

## Field Technician

Accesses repair procedures in the field.

Primary Goals

* Quickly locate parts
* Follow maintenance procedures
* Watch repair videos

---

## Trainer

Uses platform content for technical training.

Primary Goals

* Access training videos
* View documentation
* Demonstrate maintenance workflows

---

# Product Navigation

```
Login

↓

Dashboard

↓

Products

↓

Selected Product

↓

Assemblies

↓

Selected Assembly

↓

Parts

↓

Selected Part

↓

Documentation

↓

Training

↓

Downloads
```

---

# Application Navigation

```
Dashboard

├── Products

├── Documentation

├── Training

├── Search

├── Administration

├── Profile

├── Settings

└── Logout
```

---

# Product Hierarchy

```
Product

↓

Assembly

↓

Sub Assembly (Optional)

↓

Part

↓

Information

├── Documents

├── Procedures

├── Training

├── Media

└── Downloads
```

---

# User Journey 1

## Maintenance Engineer

Goal

Locate a maintenance procedure for a specific part.

Flow

```
Login

↓

Dashboard

↓

Products

↓

Selected Products

↓

Assemblies

↓

Selected Assembly

↓

Parts

↓

Selected Part

↓

Maintenance Procedure

↓

Watch Tutorial

↓

Download PDF
```

Outcome

The user successfully accesses all documentation related to the selected part.

---

# User Journey 2

## Technical Writer

Goal

Upload documentation for an existing part.

Flow

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

Upload Document

↓

Submit
```

Future versions introduce review and approval workflows.

---

# User Journey 3

## Administrator

Goal

Manage platform content.

Flow

```
Login

↓

Dashboard

↓

Admin

↓

Products

↓

Add Product

↓

Upload Documentation

↓

Assign Training Material
```

---
# User Journey 4

## Reviewer

Goal

Review documentation submitted by Technical Writers.

Flow

```
Login

↓

Dashboard

↓

Pending Reviews

↓

Open Submission

↓

Approve / Reject

↓

Comments

↓

Complete
```

---

# User Journey 5

## Trainer

Goal

Use platform content during technical training.

Flow

```
Login

↓

Training

↓

Radar System

↓

Power Supply Unit

↓

Cooling Fan

↓

Watch Training Video

↓

Open Procedure

↓

Download PDF
```

---

# Search Flow

Users may search from anywhere within the application.

```
Search

↓

Results

↓

Apply Filters

↓

Select Result

↓

Open Documentation
```

Search should support

* Products
* Assemblies
* Parts
* Documents
* Procedures
* Training Content

---

# MVP Scope

Version 1 focuses on demonstrating the complete product experience.

Included

* Authentication
* Dashboard
* Product Explorer
* Assembly Explorer
* Parts Explorer
* Document Viewer
* Embedded Videos
* Search
* Admin
* Profile

Excluded

* BREX Validation
* XML Authoring
* Workflow Engine
* Version Comparison
* Publishing Engine
* CSDB
* Multi-tenancy
* Notifications

---

# Future Product Evolution

Future releases may introduce

* Full S1000D XML support
* CSDB
* Workflow management
* Publishing engine
* Interactive IETP viewer
* XML authoring
* Version control
* Audit logs
* Cloud deployment
* Enterprise integrations

---

# Notes for AI Coding Agents

The MVP is intentionally small.

Only one product contains fully populated data.

Other products, assemblies, and parts may exist as placeholders to demonstrate navigation.

Design the platform so that replacing demo JSON content with S1000D XML data in future versions requires minimal architectural changes.

Favor modular, scalable, and service-oriented design even though the current dataset is small.

---
# Dependencies

This document is the foundation for:

- 02_PROJECT_BRAIN.md
- 03_PRD.md
- 04_ARCHITECTURE.md
- 05_DATABASE.md
- 06_API_SPEC.md
- 07_REPOSITORY_STRUCTURE.md
- 08_IMPLEMENTATION_ROADMAP.md