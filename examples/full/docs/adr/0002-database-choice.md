---
afx: true
type: ADR
status: Accepted
owner: "@rix"
version: "1.0"
created_at: "2026-03-08T10:30:00.000Z"
updated_at: "2026-03-08T10:30:00.000Z"
tags: [adr, database, infrastructure]
---

# ADR 0002: PostgreSQL with Drizzle ORM

## Context

The app needs a relational database for users, tasks, notifications, and widget layouts. We also need an ORM or query builder for type-safe database access from TypeScript.

## Decision

We will use **PostgreSQL** as the database and **Drizzle ORM** as the TypeScript query layer.

## Rationale

1. **PostgreSQL**: Battle-tested, excellent JSON support for flexible widget data, strong indexing for query performance.
2. **Drizzle**: Type-safe SQL-like syntax, zero runtime overhead (compiles to plain SQL), excellent migration tooling with `drizzle-kit`.

## Consequences

**Positive:**

- Full type safety from schema definition to query result
- Drizzle migrations are plain SQL files — easy to review and version
- No runtime query builder overhead

**Negative:**

- Drizzle is newer than Prisma — smaller community and fewer examples
- Requires manual relation definitions (no automatic inference like Prisma)

## Alternatives Considered

- **Prisma**: Rejected. Runtime query engine adds cold start latency. Schema-first approach doesn't align with our SQL-first philosophy.
- **Kysely**: Considered. Excellent type safety but lacks built-in migration tooling.
- **MongoDB**: Rejected. Relational data model (users → tasks → notifications) fits better in SQL.
