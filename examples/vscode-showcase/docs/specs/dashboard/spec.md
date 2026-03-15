---
afx: true
type: SPEC
status: Approved
owner: '@rix'
priority: Medium
version: 1.0
created: 2026-03-10T09:00:00.000Z
tags: [dashboard, ui, mvp]
---

# Dashboard Specification

## Overview

Build a widget-based dashboard as the landing page after login. Users see key metrics (task counts, completion rates, recent activity) in a configurable grid layout. Widgets are server-rendered for fast first paint.

## User Stories

### US-1: Dashboard Overview

**As a** logged-in user
**I want to** see a summary of my tasks and project health
**So that** I can prioritize my work for the day

**Acceptance Criteria:**
- [x] Dashboard loads within 1 second after login
- [ ] Shows task completion widget (total, done, in-progress)
- [ ] Shows recent activity feed (last 10 actions)
- [ ] Shows project health score widget

### US-2: Widget Customization

**As a** user
**I want to** rearrange and resize dashboard widgets
**So that** I can focus on the information most relevant to me

**Acceptance Criteria:**
- [ ] Widgets can be dragged to reorder
- [ ] Layout persists across sessions
- [ ] Default layout provided for new users

## Functional Requirements

### FR-1: Widget API

The system shall provide `GET /api/dashboard/widgets` returning widget data for the authenticated user. Each widget includes its type, position, and data payload.

### FR-2: Layout Persistence

Widget layout (position, size, visibility) shall be stored per-user and loaded on dashboard mount.

## Non-Functional Requirements

### NFR-1: Performance

Dashboard must render above-the-fold content within 1 second (LCP).

## Out of Scope

- Custom widget creation (Phase 2)
- Shared/team dashboards (Phase 3)
