---
afx: true
type: ADR
status: Accepted
owner: "@rix"
version: "1.0"
created_at: "2026-03-09T11:00:00.000Z"
updated_at: "2026-03-09T11:00:00.000Z"
tags: [adr, auth, security]
---

# ADR 0001: JWT-Based Authentication Over Session Cookies

## Context

The task management app needs user authentication. Two primary approaches were evaluated: traditional server-side session cookies and stateless JWT tokens. The decision must account for the current web app and a planned mobile app in Phase 2.

## Decision

We will use **JWT-based authentication** with short-lived access tokens (15 minutes) and long-lived refresh tokens (7 days) with rotation.

## Rationale

1. **Mobile compatibility**: JWTs work natively with mobile apps without cookie management complexity. Session cookies require additional handling for native HTTP clients.
2. **Stateless verification**: Access tokens can be verified without a database lookup on every request, reducing latency for authenticated endpoints.
3. **Scalability**: No server-side session store needed for access token verification. Refresh tokens are stored in the database for revocation support.

## Consequences

**Positive:**

- Clean API for both web and future mobile clients
- No session store infrastructure needed for access tokens
- Token-based auth is well-understood and widely supported

**Negative:**

- Access tokens cannot be revoked before expiry (mitigated by short 15-minute lifespan)
- Slightly more complex client-side logic for token refresh
- Must securely store refresh tokens (httpOnly cookies for web, secure storage for mobile)

## Alternatives Considered

- **Session cookies**: Rejected. While simpler for web-only apps, requires additional infrastructure (Redis session store) and doesn't translate cleanly to mobile clients.
- **OAuth 2.0 with external provider**: Deferred to Phase 2. Adds complexity that isn't justified for the MVP with only email/password auth.
