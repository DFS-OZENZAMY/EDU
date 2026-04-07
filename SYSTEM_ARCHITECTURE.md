# SaaS EDU - System Architecture & API Design

This document details the high-level architecture and design of the SaaS EDU platform.

---

## 1. System Architecture

The platform follows a **Multi-tenant Cloud-Native** architecture.

### Data Isolation (Database Level)
We use a **Single Database, Shared Schema** approach with strict **Row-Level Filtering**.
- Every table (User, Class, Student, etc.) includes a `schoolId` column.
- Server-side middleware and Prisma middleware (mocked via server actions) ensure that queries are always scoped to the authenticated user's `schoolId`.

### Frontend Stack (Next.js 15)
- **App Router:** For optimized routing and server components.
- **Server Actions:** For secure, type-safe backend interaction without dedicated API endpoints.
- **Tailwind CSS:** For the high-density SaaS UI.
- **Framer Motion:** For fluid state transitions and animations.

### Backend Infrastructure
- **Authentication:** JWT-based sessions using HttpOnly cookies (via `jose`).
- **ORM:** Prisma for type-safe database access to PostgreSQL.
- **Storage:** AWS S3 (for student documents, school logos).
- **Caching:** Redis (future implementation for performance-heavy analytics).

---

## 2. Database Schema (Core Models)

### Multi-Tenancy Core
- `School`: Root entity for each tenant. Contains domain, logo, and subscription plan.
- `Subscription`: History of billing and tier status (Free, Premium, etc.).

### Role-Based Access Control (RBAC)
- `Role Enum`: SUPER_ADMIN, SCHOOL_ADMIN, TEACHER, STUDENT, PARENT, STAFF, ACCOUNTANT.

### Academic Core
- `User`: Shared profile with role-specific attributes.
- `Student`: Academic profile linked to a Class and Parent.
- `Class`: Grouping of students under a specific teacher and level.
- `Grade`: Student results with subject and teacher observations.
- `Attendance`: Presence/Absence logs with real-time parent notifications.

### Communication & Finance
- `Message`: Internal peer-to-peer messaging between users.
- `Notification`: Platform-wide alerts for grades, messages, and absences.
- `Fee`: Tuition management per parent, with payment status tracking.

---

## 3. API Design (Server Actions)

Instead of traditional REST, we use **Next.js Server Actions** for better DX and security.

### Auth Actions (`src/actions/auth.ts`)
- `login(formData)`: Validates credentials and sets a tenant-aware JWT cookie.
- `register(formData)`: Provisions a new `School` instance and its first `SCHOOL_ADMIN`.

### Super Admin Actions (`src/actions/super-admin.ts`)
- `getPlatformStats()`: Global KPIs (Total schools, active subs, server health).
- `getAllSchools()`: List all tenants for global monitoring.
- `updateSchoolPlan(schoolId, tier)`: Remote upgrade/downgrade of school instances.

### Admin/Finance Actions (`src/actions/finance.ts`)
- `getFinancialStats()`: Revenue stream analytics and tuition KPIs for a specific school.
- `markAsPaid(feeId)`: Securely update payment status.

---

## 4. MVP Roadmap

### Phase 1: SaaS Core (Completed)
- [x] Multi-tenant PostgreSQL Schema.
- [x] Secure JWT Session Management.
- [x] Super Admin & School Admin Dashboards.

### Phase 2: Academic Suite
- [x] Student SIS & Class Management.
- [x] Gradebook & Attendance.
- [x] internal Messaging & Notifications.

### Phase 3: Commercial & Expansion
- [ ] Stripe Integration for SaaS Subscriptions.
- [ ] SMS Gateway Integration for Moroccan operators.
- [ ] Whitelabeling (Custom domains for schools).
- [ ] Mobile App (React Native).

---

## 5. Deployment Architecture (Vercel + Supabase)

- **Vercel:** Hosts the Next.js application, handling edge middleware and global delivery.
- **Supabase (PostgreSQL):** Robust relational storage with connection pooling for high traffic.
- **Environment Management:** Strict separation of `JWT_SECRET`, `DATABASE_URL`, and `DIRECT_URL`.
