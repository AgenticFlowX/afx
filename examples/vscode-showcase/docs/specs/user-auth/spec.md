---
afx: true
type: SPEC
status: Approved
owner: '@rix'
priority: High
version: 1.0
created: 2026-03-08T10:00:00.000Z
tags: [auth, security, mvp]
---

# User Authentication Specification

## Overview

Implement JWT-based authentication for the task management app. Users can register, log in, and manage sessions. Tokens are stored client-side and refreshed automatically before expiry.

## User Stories

### US-1: User Registration

**As a** new user
**I want to** create an account with email and password
**So that** I can access the application

**Acceptance Criteria:**
- [x] Email must be unique and validated
- [x] Password must meet strength requirements (8+ chars, 1 uppercase, 1 number)
- [x] Confirmation email is sent after registration
- [ ] Rate limiting on registration endpoint (5 attempts per minute)

### US-2: User Login

**As a** registered user
**I want to** log in with my credentials
**So that** I can access my tasks and dashboard

**Acceptance Criteria:**
- [x] Returns JWT access token (15min expiry) and refresh token (7d expiry)
- [x] Failed login increments attempt counter
- [x] Account locks after 5 consecutive failures
- [ ] Login form shows inline validation errors

### US-3: Token Refresh

**As a** logged-in user
**I want to** have my session automatically extended
**So that** I don't get logged out while actively using the app

**Acceptance Criteria:**
- [x] Refresh token endpoint returns new access token
- [x] Refresh token rotation (old token invalidated)
- [ ] Silent refresh triggered 1 minute before access token expiry

## Functional Requirements

### FR-1: Registration Endpoint

The system shall accept `POST /api/auth/register` with email, password, and display name. Returns 201 with user profile on success, 409 on duplicate email.

### FR-2: Login Endpoint

The system shall accept `POST /api/auth/login` with email and password. Returns 200 with access and refresh tokens on success, 401 on invalid credentials, 423 on locked account.

### FR-3: Token Refresh Endpoint

The system shall accept `POST /api/auth/refresh` with a valid refresh token. Returns 200 with new access token and rotated refresh token.

### FR-4: Logout Endpoint

The system shall accept `POST /api/auth/logout` and invalidate the current refresh token.

## Non-Functional Requirements

### NFR-1: Performance

Authentication endpoints must respond within 200ms (p95).

### NFR-2: Security

- Passwords hashed with bcrypt (cost factor 12)
- Tokens signed with RS256
- Refresh tokens stored hashed in database
- HTTPS required for all auth endpoints

## Out of Scope

- OAuth / social login (planned for Phase 2)
- Multi-factor authentication (planned for Phase 2)
- Password reset flow (separate feature)
