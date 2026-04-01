---
afx: true
type: TASKS
status: Living
owner: '@rix'
version: 1.0
created: 2026-03-09T15:00:00.000Z
tags: [auth, security, mvp]
spec: spec.md
design: design.md
---

# User Authentication - Implementation Tasks

## Phase 1: Foundation

### 1.1 Project Setup {#11-project-setup}

- [x] Create feature directory structure
- [x] Add TypeScript interfaces for User and RefreshToken
- [x] Configure test setup with vitest

### 1.2 Database Schema {#12-database-schema}

- [x] Create users table migration
- [x] Create refresh_tokens table migration
- [x] Add unique index on email column

## Phase 2: Core Implementation

### 2.1 Create Auth Service {#21-create-auth-service}

- [x] Implement `getAuthService()` factory
- [x] Add `register` method with bcrypt hashing
- [x] Add `login` method with attempt tracking
- [x] Add `refresh` method with token rotation
- [x] Add unit tests for all methods

### 2.2 Create JWT Utilities {#22-create-jwt-utilities}

- [x] Implement `signAccessToken()` with RS256
- [x] Implement `signRefreshToken()`
- [x] Implement `verifyToken()` with expiry check
- [x] Add key rotation support

## Phase 3: UI

### 3.1 Login Form {#31-login-form}

- [x] Build login form component with shadcn/ui
- [x] Add client-side validation (email format, password required)
- [ ] Add inline error display for failed login
- [ ] Add loading spinner during auth request

### 3.2 Integration {#32-integration}

- [ ] Wire login form to auth server action
- [ ] Implement silent token refresh on the client
- [ ] Add auth state provider (React context)
- [ ] Test end-to-end login flow

## Phase 4: Polish

### 4.1 Security Hardening {#41-security-hardening}

- [ ] Add rate limiting middleware to auth endpoints
- [ ] Add CSRF protection
- [ ] Security audit of token storage

### 4.2 Testing & Docs {#42-testing-docs}

- [ ] Add integration tests for full auth flow
- [ ] Verify all @see annotations
- [ ] Update API documentation

---

## Work Sessions

<!-- Task execution log - updated by /afx-task pick, /afx-dev code -->

| Date       | Task | Action                                    | Files Modified                              | Agent | Human |
| ---------- | ---- | ----------------------------------------- | ------------------------------------------- | ----- | ----- |
| 2026-03-09 | 1.1  | Created feature structure and interfaces   | types.ts, tsconfig.json                     | [x]   | [x]   |
| 2026-03-10 | 1.2  | Created database migrations                | 001_users.sql, 002_refresh_tokens.sql       | [x]   | [x]   |
| 2026-03-11 | 2.1  | Implemented auth service with all methods  | auth.service.ts, auth.service.test.ts       | [x]   | [x]   |
| 2026-03-12 | 2.2  | Built JWT sign/verify utilities            | jwt.ts, jwt.test.ts                         | [x]   | [ ]   |
| 2026-03-13 | 3.1  | Built login form with validation           | LoginForm.tsx, login.action.ts              | [x]   | [ ]   |
| 2026-03-15 | 3.1  | Added client-side validation rules         | LoginForm.tsx, validation.ts                | [x]   | [ ]   |
