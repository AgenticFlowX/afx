---
afx: true
type: RES
status: Accepted
owner: "@rix"
version: "1.0"
created_at: "2026-03-08T11:00:00.000Z"
updated_at: "2026-03-08T11:00:00.000Z"
tags: [research, testing, quality]
---

# Research: Testing Strategy

## Question

What testing approach should we adopt — unit-heavy with mocks, integration-first with a real database, or E2E-first?

## Options Evaluated

### Option A: Unit-heavy with mocks

- Fast test execution, isolated components
- Mock database, external APIs, and service dependencies
- **Concern**: Mocks can diverge from real behavior — false confidence

### Option B: Integration-first with test database

- Tests hit a real Postgres instance (Docker-based)
- Test service methods end-to-end within the API boundary
- **Concern**: Slower test execution, Docker dependency for CI

### Option C: E2E-first with Playwright

- Test full user flows through the browser
- Highest confidence that features work as users experience them
- **Concern**: Slow, flaky, expensive to maintain as the sole testing layer

## Decision

**Layered approach**: Integration tests as the primary layer, unit tests for pure logic, E2E tests for critical user journeys.

## Testing Pyramid

```
        ╱╲
       ╱ E2E ╲           3-5 critical flows (login, task CRUD)
      ╱────────╲
     ╱Integration╲       Service + DB tests (real Postgres via Docker)
    ╱──────────────╲
   ╱   Unit Tests    ╲   Pure functions (validation, formatting, utils)
  ╱────────────────────╲
```

## Rationale

- Integration tests catch real database issues (constraints, migrations, query bugs)
- Unit tests stay fast for pure logic — no mocking database
- E2E tests cover only the critical paths to keep the suite maintainable
- Docker Compose provides a consistent Postgres instance for local and CI

## Tools

| Layer       | Tool        | Target                        |
| ----------- | ----------- | ----------------------------- |
| Unit        | Vitest      | Validation, formatting, utils |
| Integration | Vitest      | Services with real Postgres   |
| E2E         | Playwright  | Login flow, dashboard, tasks  |
