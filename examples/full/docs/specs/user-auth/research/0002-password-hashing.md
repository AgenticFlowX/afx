---
afx: true
type: RES
status: Accepted
owner: "@rix"
version: "1.0"
created_at: "2026-03-09T12:00:00.000Z"
updated_at: "2026-03-09T12:00:00.000Z"
tags: [research, auth, security]
---

# Research: Password Hashing Algorithm

## Question

Which password hashing algorithm should we use — bcrypt, scrypt, or Argon2?

## Options Evaluated

### Option A: bcrypt

- Industry standard for 20+ years
- Well-understood cost factor tuning (we use 12)
- Available in every language, mature Node.js bindings (`bcryptjs`, `bcrypt`)
- **Concern**: Fixed memory cost — not as resistant to GPU attacks as Argon2

### Option B: scrypt

- Memory-hard — better GPU resistance than bcrypt
- Built into Node.js `crypto` module (no external dependency)
- **Concern**: Less common in web apps, fewer developer resources/guides

### Option C: Argon2

- Winner of the Password Hashing Competition (2015)
- Configurable time, memory, and parallelism costs
- Best theoretical resistance to GPU/ASIC attacks
- **Concern**: Requires native module (`argon2` npm package), complicates Docker builds

## Decision

**Option A** — bcrypt with cost factor 12.

## Rationale

- Our threat model doesn't require Argon2-level GPU resistance for MVP
- bcrypt is universally understood by security auditors — no questions during compliance review
- Cost factor 12 provides ~250ms hash time, well within our 200ms p95 budget when combined with other operations
- Upgrading to Argon2 later is straightforward — just hash new passwords with Argon2 and verify old ones with bcrypt during migration

## References

- OWASP Password Storage Cheat Sheet
- Node.js `bcryptjs` benchmarks at various cost factors
