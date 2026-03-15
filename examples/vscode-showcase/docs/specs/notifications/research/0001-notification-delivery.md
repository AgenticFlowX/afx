---
afx: true
type: RES
status: Draft
version: 1.0
created: 2026-03-10T15:00:00.000Z
owner: '@rix'
tags: [research, notifications, architecture]
---

# Research: Notification Delivery Strategy

## Question

How should notifications be delivered to the client — polling, SSE (Server-Sent Events), or WebSockets?

## Options Evaluated

### Option A: Short Polling (HTTP)

- Client polls `GET /api/notifications` every 15 seconds
- Simplest to implement, works everywhere
- **Concern**: Wasteful when no new notifications, adds server load at scale

### Option B: Server-Sent Events (SSE)

- Server pushes notification events over a persistent HTTP connection
- Native browser support (`EventSource`), auto-reconnect built in
- Unidirectional (server → client), which is exactly what we need
- **Concern**: One persistent connection per tab

### Option C: WebSockets

- Full-duplex communication channel
- Most flexible — supports any message pattern
- **Concern**: Overkill for unidirectional notification delivery, adds infrastructure complexity (sticky sessions, WebSocket-aware load balancer)

## Recommendation (Pending)

Leaning toward **Option A (polling)** for MVP simplicity, with a plan to migrate to **Option B (SSE)** in Phase 2 when we add real-time features.

## Open Questions

- What's our expected notification volume per user per hour?
- Do we need sub-second delivery or is 15-second polling acceptable for MVP?
- Should we batch multiple notification events into a single SSE message?

## Status

Draft — waiting for spec approval before finalizing this decision.
