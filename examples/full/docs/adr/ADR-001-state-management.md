---
afx: true
type: ADR
status: Approved
owner: "@agenticflowx"
version: "1.0"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T10:14:58.000Z"
tags: [roomledger, architecture, state-management]
---

# ADR-001: In-Memory State Management

## Status

Approved

## Context

RoomLedger is a prototype app for validating the room rental inspection workflow. We need to decide how to manage application state — the current role (Owner/Renter), theme preference, approval states, and room history events.

Options considered:

1. **In-memory JavaScript variables** — state lives in JS, resets on refresh
2. **localStorage** — state persists across sessions in the browser
3. **IndexedDB** — structured persistent storage
4. **Backend API** — server-side persistence

## Decision

Use **in-memory JavaScript variables** for all application state except theme preference.

- Role, view, approval states, and timeline events: JS variables (reset on refresh)
- Theme preference only: `localStorage` (persists across sessions)

## Rationale

- The goal is to validate the **interaction model**, not build persistence infrastructure
- In-memory state keeps the codebase simple — no serialization, no storage APIs, no async
- Refresh-to-reset is actually useful during prototyping — easy to return to initial state
- Theme is the exception because losing dark mode preference on every refresh is genuinely annoying
- This decision can be revisited when the app moves beyond prototype stage

## Consequences

- All form submissions, approvals, and timeline events disappear on page refresh
- No multi-tab synchronization
- No data export or backup
- Simple to reason about — one source of truth per variable
- Easy to migrate later — replace variable reads/writes with storage API calls
