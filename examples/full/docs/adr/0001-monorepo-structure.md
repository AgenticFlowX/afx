---
afx: true
type: ADR
status: Accepted
owner: "@rix"
version: "1.0"
created_at: "2026-03-08T09:00:00.000Z"
updated_at: "2026-03-08T09:00:00.000Z"
tags: [adr, architecture, infrastructure]
---

# ADR 0001: Monorepo with Turborepo

## Context

The project has three deployable units — API server, web app, and a shared types package. We need to decide whether to use separate repositories or a monorepo, and which monorepo tool to adopt if so.

## Decision

We will use a **monorepo managed by Turborepo** with pnpm workspaces.

## Rationale

1. **Shared types**: The API and web app share TypeScript interfaces (User, Notification, etc.). A monorepo makes these importable without publishing to npm.
2. **Atomic changes**: Auth changes often touch both API and web app. A single PR is easier to review than coordinated PRs across repos.
3. **Turborepo**: Lightweight, fast task caching, and good integration with Vercel for the web app deployment.

## Consequences

**Positive:**

- Single PR for cross-cutting changes
- Shared TypeScript types without npm publish overhead
- Turborepo caching speeds up CI by 40-60%

**Negative:**

- Larger git clone size over time
- CI pipeline needs to be monorepo-aware (affected packages only)
- New contributors need to understand pnpm workspace conventions

## Alternatives Considered

- **Separate repos with npm packages**: Rejected. Publishing shared types to npm adds friction for every interface change.
- **Nx**: Rejected. More powerful but heavier than needed — Turborepo covers our use case with less configuration.
