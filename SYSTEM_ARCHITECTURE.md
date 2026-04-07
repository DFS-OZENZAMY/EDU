# SaaS EDU - System Architecture & API Design

This document details the high-level architecture and design of the SaaS EDU platform.

---

## 1. System Architecture

The platform follows a **Multi-tenant Cloud-Native** architecture.

### Data Isolation (Database Level)
We use a **Single Database, Shared Schema** approach with strict **Row-Level Filtering**.
- Every table (User, Class, Student, etc.) includes a `schoolId` column.
- Server-side middleware and Prisma ensure that queries are always scoped to the authenticated user's `schoolId`.
- **Active Status Check:** Both user and school-level `isActive` flags are checked during session validation to allow instant platform-wide deactivation.

### Frontend Stack (Next.js 15)
- **App Router:** For optimized routing and server components.
- **Server Actions:** For secure, type-safe backend interaction without dedicated API endpoints.
- **Dynamic Workspaces:** Sidebar and dashboards render modules conditionally based on school-level settings (`enabledModules` JSON).

---

## 2. Database Schema (Core Models)

### Multi-Tenancy Core
- `School`: Root entity for each tenant. Contains owner contact info (Email, Phone), `enabledModules` configuration, and `isActive` status.
- `Subscription`: Detailed history of billing and tier status.

### User & Academic Profile
- `User`: Enhanced with `phone`, `cin` (ID Card), and `isActive`.
- `Student`: Linked to a Parent and Class; includes `birthday` and academic history.

---

## 3. Advanced Workflows

### Unified Enrollment (`src/actions/enrollment.ts`)
An atomic operation that creates a Parent account (if it doesn't exist) and registers multiple students in a single transaction. Captures critical data: CIN, Phone, Birthdays.

### Modular Control
- **Super Admin Level:** Remote activation/deactivation of modules (SIS, LMS, Finance, Analytics, Canteen) for any school instance.
- **School Admin Level:** Local configuration of workspace modules to customize the dashboard for their specific needs.

---

## 4. MVP Roadmap

### Phase 1: SaaS Core (Completed)
- [x] Multi-tenant PostgreSQL Schema with owner tracking.
- [x] Secure JWT Session Management with deactivation support.
- [x] Unified Parent/Student Enrollment workflow.
- [x] Modular Workspace toggles for School Admins.
- [x] Platform-wide monitoring for Super Admins.

### Phase 2: Commercial & Expansion
- [ ] Stripe Integration for automated SaaS billing.
- [ ] Fine-grained Role Permissions (Role-Module mapping).
- [ ] Mobile App (React Native).
