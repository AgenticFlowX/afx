---
afx: true
type: DESIGN
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-03-09T14:00:00.000Z"
updated_at: "2026-03-09T14:00:00.000Z"
tags: [auth, security, mvp]
spec: spec.md
---

# User Authentication - Technical Design

## [DES-ARCH] Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Login Form │ ──▶ │  Auth Action │ ──▶ │ Auth Service│ ──▶ │  Database   │
│  (React)    │     │  (Server)    │     │  (Core)     │     │  (Postgres) │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ▼
                                        ┌─────────────┐
                                        │ JWT Utility  │
                                        │ (sign/verify)│
                                        └─────────────┘
```

## [DES-DATA] Data Model

### Entity: User

| Field          | Type     | Required | Description                  |
| -------------- | -------- | -------- | ---------------------------- |
| id             | uuid     | Yes      | Primary key                  |
| email          | string   | Yes      | Unique, indexed              |
| passwordHash   | string   | Yes      | bcrypt hash                  |
| displayName    | string   | Yes      | User's display name          |
| failedAttempts | integer  | Yes      | Login failure counter        |
| lockedUntil    | datetime | No       | Account lock expiry          |
| createdAt      | datetime | Yes      | Registration timestamp       |
| updatedAt      | datetime | Yes      | Last modification timestamp  |

### Entity: RefreshToken

| Field     | Type     | Required | Description                |
| --------- | -------- | -------- | -------------------------- |
| id        | uuid     | Yes      | Primary key                |
| userId    | uuid     | Yes      | Foreign key to User        |
| tokenHash | string   | Yes      | SHA-256 hash of token      |
| expiresAt | datetime | Yes      | Token expiration            |
| createdAt | datetime | Yes      | Token creation timestamp   |

## [DES-API] API Design

### Register

```typescript
async function register(data: {
  email: string;
  password: string;
  displayName: string;
}): Promise<{ user: UserProfile; accessToken: string; refreshToken: string }>
```

### Login

```typescript
async function login(data: {
  email: string;
  password: string;
}): Promise<{ user: UserProfile; accessToken: string; refreshToken: string }>
```

### Refresh

```typescript
async function refresh(data: {
  refreshToken: string;
}): Promise<{ accessToken: string; refreshToken: string }>
```

## [DES-SERVICE] Service Layer

### AuthService

Location: `src/services/auth.service.ts`

```typescript
/**
 * Authentication service — handles registration, login, and token management
 *
 * @see docs/specs/user-auth/design.md#service-layer
 * @see docs/specs/user-auth/tasks.md#21-create-auth-service
 */
export function getAuthService(db: Database) {
  return {
    register: async (data: RegisterInput) => { /* ... */ },
    login: async (data: LoginInput) => { /* ... */ },
    refresh: async (refreshToken: string) => { /* ... */ },
    logout: async (refreshToken: string) => { /* ... */ },
  };
}
```

## [DES-ERR] Error Handling

| Error Code       | Description              | HTTP Status |
| ---------------- | ------------------------ | ----------- |
| DUPLICATE_EMAIL  | Email already registered | 409         |
| INVALID_CREDS    | Wrong email or password  | 401         |
| ACCOUNT_LOCKED   | Too many failed attempts | 423         |
| TOKEN_EXPIRED    | Refresh token expired    | 401         |
| TOKEN_REVOKED    | Token already used       | 401         |
| VALIDATION_ERROR | Invalid input data       | 400         |
