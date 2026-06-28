# 09_UI_UX.md

# Atlas – User Interface & User Experience Specification

---

# Document Purpose

This document defines the complete user interface and user experience standards for the Atlas platform.

Unlike the PRD, Architecture, or API Specification, this document focuses on **how users experience the product**.

It establishes a consistent visual language, interaction model, navigation system, layout philosophy, and design principles that every frontend implementation must follow.

This document is the single source of truth for all UI and UX decisions.

---

# Design Philosophy

Atlas is not a marketing website.

Atlas is not an analytics dashboard.

Atlas is not an AI demonstration.

Atlas is engineering software.

The interface should communicate precision, clarity, confidence, and professionalism.

Every visual element must exist because it improves the user's ability to complete a task.

Decoration should never compete with information.

---

# Atlas Design Language

The guiding principle of Atlas is:

> **Engineering information should always be easier to read than to decorate.**

The interface should feel calm, organized, and predictable.

Users should immediately understand:

* Where they are.
* What they are looking at.
* What they can do next.

Navigation should never require guesswork.

---

# Design Goals

Atlas should:

* Feel like modern enterprise software.
* Minimize cognitive load.
* Prioritize information over decoration.
* Present technical information clearly.
* Scale naturally as new modules are added.
* Remain approachable for first-time users.

---

# Design Inspirations

Atlas should draw inspiration from modern enterprise applications rather than traditional admin templates.

Visual influences include:

* Linear
* GitHub
* Notion
* Stripe Dashboard
* Atlassian
* Siemens Teamcenter
* IBM Maximo

The goal is not to imitate these products but to achieve the same level of clarity, consistency, and usability.

---

# User Experience Principles

## Clarity First

Every screen should have one obvious purpose.

Users should never wonder what the page is trying to accomplish.

---

## Information Before Decoration

Data is the primary visual element.

Large illustrations, decorative graphics, and unnecessary animations should be avoided.

---

## Progressive Disclosure

Only show the information required for the current task.

Additional details should appear only when requested.

---

## Consistency

Buttons, navigation, forms, spacing, typography, and interactions should behave consistently throughout the platform.

---

## Predictability

Users should always know:

* what will happen,
* where they will go,
* and how to return.

---

## Efficiency

Common tasks should require as few clicks as possible.

---

# Product Experience

The Atlas workflow should always feel linear and intuitive.

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

↓

Documentation

↓

Training
```

The interface should guide users naturally through this hierarchy.

---

# Information Architecture

The application navigation follows the engineering hierarchy.

```
Dashboard

Products
    └── Product Details
            └── Assemblies
                    └── Assembly Details
                            └── Parts
                                    └── Part Details

Documents

Training

Search

Administration
```

Every page should clearly indicate its position within this hierarchy.

---

# Navigation Philosophy

Navigation should be:

* Persistent
* Simple
* Predictable

Users should never lose context while navigating.

Every page should include:

* Sidebar navigation
* Page title
* Breadcrumb navigation
* Primary content area

---

# Prototype Scope

This version of Atlas is an engineering prototype.

The application intentionally contains a single engineering hierarchy.

```
Radar System

↓

Power Supply Unit

↓

Cooling Fan
```

The interface should be designed so that additional products, assemblies, and parts can be introduced later without redesigning the layout.

---

# What Atlas Is Not

Atlas should never resemble:

* Generic admin dashboards.
* Marketing websites.
* Cryptocurrency dashboards.
* AI chat applications.
* Analytics-heavy business intelligence tools.
* Mobile-first social applications.

The emphasis is engineering information management.

---

# Visual Personality

The product should feel:

* Professional
* Calm
* Precise
* Clean
* Spacious
* Modern
* Trustworthy

It should never feel:

* Flashy
* Playful
* Over-designed
* Futuristic
* Experimental

The interface should age well and remain visually relevant for years.

---

# AI Design Rules

AI coding agents must follow these rules:

Never generate fake analytics.

Never invent charts or graphs.

Never add decorative KPI cards unless explicitly required.

Never use glassmorphism.

Never use neumorphism.

Never generate floating widgets.

Never use oversized icons.

Never use excessive gradients.

Never create unnecessary animations.

Never prioritize visual effects over usability.

Every component must support the engineering workflow.

---

# Success Criteria

The UI is successful when:

* Users immediately understand the application.
* Navigation requires little or no explanation.
* Engineering data is easy to locate.
* Visual clutter is minimized.
* The interface feels like a production enterprise application rather than a prototype.

This philosophy should guide every future frontend implementation.

---

# Layout System

Atlas follows a traditional enterprise desktop application layout.

The application should prioritize readability and navigation over visual effects.

Every authenticated page should follow the same layout structure.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Header                                                                       │
├──────────────┬───────────────────────────────────────────────────────────────┤
│              │                                                               │
│              │ Breadcrumb                                                    │
│              │                                                               │
│ Sidebar      ├───────────────────────────────────────────────────────────────┤
│ Navigation   │                                                               │
│              │                                                               │
│              │ Main Content Area                                             │
│              │                                                               │
│              │                                                               │
│              │                                                               │
│              │                                                               │
├──────────────┴───────────────────────────────────────────────────────────────┤
│ Footer (optional)                                                            │
└──────────────────────────────────────────────────────────────────────────────┘
```

The layout should remain identical throughout the application.

Users should never feel that they have entered a different application.

---

# Layout Principles

The layout should:

* maximize readable space
* minimize unnecessary scrolling
* keep navigation visible
* separate navigation from content
* support future expansion

The layout should never feel crowded.

---

# Sidebar Navigation

The sidebar is the primary navigation component.

It should always remain visible on desktop.

Width:

```
260px
```

Collapsed Width:

```
72px
```

The sidebar contains:

* Atlas Logo
* Navigation Menu
* User Section
* Logout

---

## Sidebar Order

Exactly this order.

```
Dashboard

Products

Documents

Training

Search

Administration
```

No additional navigation items should appear.

---

## Sidebar Behaviour

Current page

↓

Highlighted.

Parent section

↓

Expanded.

Hover

↓

Subtle background.

Icons

↓

Lucide Icons only.

No animated icons.

No colorful icons.

---

# Header

Every page contains a fixed header.

Header Height

```
64px
```

The header includes:

Left

* Page Title

Right

* User Name
* User Role
* Avatar
* Logout Menu

The header should remain minimal.

No search bar.

No notifications.

No analytics.

These may be introduced in future releases.

---

# Breadcrumb Navigation

Every page below Dashboard should display breadcrumbs.

Example

```
Dashboard

>

Products

>

Radar System

>

Power Supply Unit

>

Cooling Fan
```

Breadcrumbs should be:

* subtle
* lightweight
* clickable

The final item is not clickable.

---

# Dashboard

The Dashboard serves as the landing page after login.

Its purpose is orientation, not analytics.

The Dashboard should answer one question:

> "Where should I go next?"

---

## Dashboard Layout

```
Welcome

↓

Quick Navigation

↓

Engineering Overview

↓

Recent Activity (future)
```

---

## Welcome Section

Display:

```
Good Morning,

Atlas Administrator
```

Below:

```
Engineering Documentation Platform
```

No motivational text.

No marketing copy.

---

# Quick Navigation

Display six navigation cards.

```
Products

Documents

Training

Search

Administration

Profile
```

Each card contains:

* Icon
* Title
* Short description

Example

```
Products

Browse engineering products,
assemblies and parts.
```

Cards should navigate directly to the corresponding module.

---

# Engineering Overview

Display only three statistics.

```
Products

Assemblies

Parts
```

Use simple numeric counters.

No charts.

No graphs.

No pie charts.

No trend indicators.

For the prototype:

```
Products

1

Assemblies

1

Parts

1
```

Later releases will populate these dynamically.

---

# Product Explorer

The Products page is the heart of Atlas.

The layout should prioritize the engineering hierarchy.

---

## Product List

Display products as a clean list or compact cards.

Each item shows:

* Product Name
* Product Code
* Short Description

Example

```
Radar System

PRD-RADAR-001

Airborne Radar Platform
```

---

## Product Details

Selecting a product opens its detail page.

Display:

```
Product Header

↓

Assemblies

↓

Product Information
```

The product header includes:

* Name
* Product Code
* Description

---

# Assembly Section

Assemblies should appear directly beneath the Product.

Example

```
Assemblies

Power Supply Unit
```

Selecting an assembly loads its details.

---

# Assembly Details

Display:

```
Assembly Header

↓

Parts

↓

Assembly Information
```

---

# Parts Section

Display a simple list.

Example

```
Cooling Fan

PRT-FAN-001
```

Selecting a part opens the Part Details page.

---

# Part Details

Display:

* Part Number
* Part Name
* Description

Future releases will extend this page with:

* Documentation
* Procedures
* Training
* Media

No placeholders should be shown for these future modules.

---

# Content Width

Maximum content width:

```
1440px
```

Content should remain centered on ultra-wide displays.

---

# Page Padding

Desktop

```
32px
```

Tablet

```
24px
```

Mobile

```
16px
```

Maintain consistent spacing throughout the application.

---

# Scrolling

Only the main content area should scroll.

Sidebar and header remain fixed.

Users should never lose navigation while scrolling.

---

# AI Layout Rules

AI coding agents must:

* Reuse the same layout across every page.
* Never redesign individual pages independently.
* Never move navigation.
* Never create floating panels.
* Never generate hidden sidebars on desktop.
* Never replace breadcrumbs with tabs.
* Keep hierarchy visible at all times.

Layout consistency is more important than visual experimentation.

---

# Design System

Atlas follows a restrained enterprise design system.

The visual hierarchy should be established through:

* Typography
* Spacing
* Alignment
* Borders
* Contrast

—not through excessive colors or visual effects.

The interface should appear clean, modern, and timeless.

---

# Color Philosophy

Colors communicate meaning.

They should never be used simply for decoration.

Neutral colors should dominate the interface.

Accent colors should only indicate actions or system state.

---

# Primary Palette

Primary

```
#2563EB
```

Used for:

* Primary buttons
* Active navigation
* Links
* Selected items

---

Primary Hover

```
#1D4ED8
```

---

Primary Light

```
#DBEAFE
```

Used for:

* Selected backgrounds
* Active chips
* Information highlights

---

# Neutral Palette

Application Background

```
#F8FAFC
```

Surface

```
#FFFFFF
```

Sidebar Background

```
#FFFFFF
```

Header Background

```
#FFFFFF
```

Border

```
#E5E7EB
```

Divider

```
#F1F5F9
```

---

# Typography Colors

Primary Text

```
#111827
```

Secondary Text

```
#6B7280
```

Muted Text

```
#9CA3AF
```

Disabled

```
#D1D5DB
```

---

# Semantic Colors

Success

```
#16A34A
```

Warning

```
#F59E0B
```

Danger

```
#DC2626
```

Information

```
#2563EB
```

These colors should only communicate system status.

---

# Typography

Typography is the primary method of creating hierarchy.

Avoid oversized text.

Readable interfaces are more important than dramatic ones.

---

## Font Family

Primary

```
Inter
```

Fallback

```
system-ui
```

---

# Heading Scale

H1

32px

Weight

700

---

H2

24px

Weight

600

---

H3

20px

Weight

600

---

H4

18px

Weight

600

---

Body Large

16px

Weight

400

---

Body

14px

Weight

400

---

Small

13px

Weight

400

---

Caption

12px

Weight

400

---

# Line Height

Heading

```
1.2
```

Body

```
1.5
```

---

# Icons

Use only:

Lucide Icons

Rules

* Outline icons
* 20–24px
* Single color
* Never multi-color

Icons support text.

They never replace text.

---

# Spacing System

Atlas follows an 8-point spacing system.

Allowed spacing values

```
4
8
12
16
24
32
40
48
64
```

Avoid arbitrary spacing values.

---

# Border Radius

Buttons

```
8px
```

Cards

```
12px
```

Inputs

```
8px
```

Dialogs

```
12px
```

Avoid pill-shaped components.

---

# Shadows

Only two shadow levels are permitted.

Small

```
shadow-sm
```

Cards

Large

```
shadow-md
```

Dialogs

Avoid dramatic shadows.

---

# Buttons

Atlas supports three button styles.

---

Primary

Blue background

White text

Used for:

* Save
* Create
* Login

---

Secondary

White background

Gray border

Dark text

Used for:

* Cancel
* Back
* View

---

Danger

Red background

White text

Used for:

* Delete
* Remove

---

Button Height

```
40px
```

---

Button Padding

```
16px
```

---

# Inputs

Inputs should be simple.

No decorative borders.

No glow effects.

States

Normal

Focused

Disabled

Error

---

Input Height

```
40px
```

---

Border

```
1px
```

---

Focus

Primary Blue border

Subtle shadow

---

# Forms

Forms should follow a vertical layout.

```
Label

↓

Input

↓

Helper Text
```

Avoid horizontal alignment unless necessary.

---

Required Fields

Indicate using

```
*
```

Only.

Do not write

"Required"

after every label.

---

# Cards

Cards group related information.

Cards should never become decorative containers.

Each card should have:

* Title
* Optional description
* Content

Padding

```
24px
```

Border

```
1px
```

Radius

```
12px
```

---

# Tables

Tables are the preferred way to display engineering information.

Tables should be:

* Dense
* Readable
* Responsive

Avoid excessive spacing.

---

Table Header

Light gray background

Medium font weight

---

Row Height

```
48px
```

---

Hover

Subtle background highlight.

---

Clickable rows

Entire row should be clickable.

---

# Badges

Badges communicate status.

Supported badge colors

Blue

Green

Yellow

Red

Gray

Never use gradients.

---

# Chips

Use chips sparingly.

Example

```
ADMINISTRATOR
```

```
ACTIVE
```

```
PRODUCT
```

---

# Dividers

Use simple 1px dividers.

Never use decorative separators.

---

# Empty States

Every empty state should include:

* Icon
* Title
* One sentence

Example

```
No Products

Products will appear here once they are created.
```

No illustrations.

---

# Loading States

Prefer skeleton loading.

Avoid large spinners.

Skeletons should resemble final content.

---

# Dialogs

Dialogs should only interrupt the user for important actions.

Maximum width

```
520px
```

Primary action

Bottom right.

Cancel

Left of primary.

---

# Notifications

Toast notifications only.

Position

Top Right

Duration

```
4 seconds
```

Success

Green

Warning

Yellow

Error

Red

---

# AI Component Rules

AI coding agents must:

Never invent new button styles.

Never invent new card layouts.

Never create colorful statistics cards.

Never use gradients.

Never use glassmorphism.

Never use neumorphism.

Never use animated backgrounds.

Never introduce inconsistent spacing.

Always reuse existing components before creating new ones.

Every component should appear to belong to the same design system.

---

# Design Consistency Rule

If a component already exists elsewhere in Atlas, reuse it.

Consistency is more important than originality.

Users should feel they are interacting with one cohesive application rather than a collection of unrelated pages.

---

# Loading States

The interface should always provide immediate feedback when data is being loaded.

Users should never wonder whether the application is working.

---

## Skeleton Loading

Atlas should prefer skeleton loaders over animated spinners.

Skeletons should closely resemble the final layout.

Example:

```
────────────────────────

██████████████████

████████████

────────────

██████████████████████

███████████
```

Avoid full-page loading whenever possible.

---

## Progress Indicators

Use progress indicators only for long-running operations.

Examples:

* File Upload
* Data Import
* Export Generation

Normal page navigation should not display progress bars.

---

# Empty States

Empty states should educate users.

Every empty state must include:

* Icon
* Clear title
* Short explanation
* Optional action button

Example

```
No Products Found

Products will appear here after they are created.

[Create Product]
```

Do not use illustrations.

Do not use humorous messages.

---

# Error States

Errors should always explain:

* What happened
* Why it happened (when appropriate)
* What the user can do next

Example

```
Unable to load Products.

Please refresh the page or try again later.
```

Avoid technical stack traces.

Avoid exposing backend exception messages.

---

# Form Validation

Validation should occur as early as possible.

Validation hierarchy:

1. Required fields
2. Format validation
3. Business rule validation
4. Server validation

Validation messages should appear directly below the affected field.

Example

```
Email

admin@

Please enter a valid email address.
```

---

# Authentication Experience

Login should feel simple.

Workflow

```
Login

↓

Dashboard
```

If authentication fails

↓

Remain on Login page

↓

Display inline error message

↓

Preserve entered email

↓

Clear password field

---

# Logout Experience

Logout should always:

* Clear session
* Remove JWT
* Clear cached user information
* Redirect to Login

No confirmation dialog is required.

---

# Search Experience

Search should prioritize engineering data.

Search results should be grouped by:

* Products
* Assemblies
* Parts
* Documents
* Training

Results should display enough context to identify the item before opening it.

---

# Navigation Behaviour

The application should never lose user context.

When navigating:

Current location

↓

Visible in Sidebar

↓

Visible in Breadcrumb

↓

Visible in Page Title

---

# Responsive Design

Atlas is a desktop-first application.

Priority:

1. Desktop
2. Laptop
3. Tablet
4. Mobile

---

## Desktop

Minimum Width

```
1280px
```

Optimized Width

```
1440px
```

---

## Tablet

Sidebar collapses automatically.

Content fills available width.

Navigation remains accessible.

---

## Mobile

Only essential functionality should be available.

Sidebar becomes a drawer.

Tables may become stacked cards.

No desktop layout should simply shrink.

---

# Motion Guidelines

Motion should improve usability.

Allowed animations:

* Fade
* Slide
* Expand
* Collapse

Maximum duration

```
200ms
```

Animation easing

```
ease-out
```

Avoid:

* Bounce
* Zoom
* Elastic
* Rotation
* Flip
* Floating animations

The interface should feel stable.

---

# Accessibility

Atlas should follow WCAG 2.1 AA where practical.

Requirements:

* Keyboard navigation
* Visible focus indicators
* Proper contrast ratios
* Semantic HTML
* Screen-reader labels
* ARIA attributes where required

Interactive elements must always be reachable without a mouse.

---

# Performance Guidelines

Pages should load quickly.

Avoid unnecessary network requests.

Prefer lazy loading where appropriate.

Cache authenticated user information during the session.

Reuse components rather than recreating them.

---

# Frontend Engineering Rules

The frontend must remain modular.

Each feature owns:

* Pages
* Components
* Services
* Types
* Hooks (if required)

Business logic belongs in services.

Components should remain primarily responsible for rendering.

---

# Component Reuse Policy

Before creating a new component, verify whether an existing one can be reused.

Duplicate components should not exist.

Shared UI belongs inside the common component library.

---

# AI Implementation Rules

AI coding agents must follow these rules without exception.

Never redesign existing layouts.

Never invent new navigation structures.

Never replace the sidebar.

Never change typography.

Never introduce new colors.

Never add gradients.

Never use glassmorphism.

Never use neumorphism.

Never generate fake analytics.

Never generate fake KPI cards.

Never generate fake charts.

Never invent placeholder business data.

Never redesign existing components unless explicitly instructed.

Always reuse:

* Layout
* Buttons
* Cards
* Tables
* Forms
* Dialogs
* Typography
* Colors

Consistency is always preferred over creativity.

---

# Future UI Evolution

Future releases may introduce:

* Dark Mode
* Advanced Search
* Notifications
* Activity Timeline
* File Preview
* Rich Dashboards
* Analytics
* AI Assistant
* Multi-language Support

These features must integrate with the existing design system without requiring a redesign.

---

# UI Review Checklist

Before any frontend implementation is considered complete, verify:

□ Layout matches this specification.

□ Navigation remains consistent.

□ Sidebar behaves correctly.

□ Breadcrumbs are present.

□ Typography follows the defined scale.

□ Colors match the design tokens.

□ Buttons use approved styles.

□ Tables follow enterprise layout.

□ Forms validate correctly.

□ Loading states use skeletons.

□ Empty states are meaningful.

□ Error messages are user-friendly.

□ Responsive behavior is correct.

□ Authentication flow is consistent.

□ Accessibility requirements are satisfied.

□ No AI-generated dashboard patterns are present.

---

# Success Criteria

The Atlas interface is considered successful when:

* Users immediately understand the application.
* Navigation requires little explanation.
* Engineering information is easy to locate.
* The interface feels cohesive across every module.
* Visual clutter is minimized.
* Every page follows the same design language.
* The product resembles modern enterprise engineering software rather than a generic admin template.

The UI should communicate confidence, clarity, and professionalism.

It should feel like software that could be deployed inside a real engineering organization tomorrow.

---

# Final Principle

Every future UI decision should answer one question:

> **Does this make engineering information easier to understand?**

If the answer is no, the feature should be redesigned.

This principle takes precedence over aesthetics.

---

# Document Status

Version: 1.0

Status: Approved

Owner: Atlas Product & Architecture Team

Applies To:

* All frontend implementations
* Future UI refactoring
* AI coding agents
* Human contributors

This document is the definitive UI and UX specification for the Atlas platform.