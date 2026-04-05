---
afx: true
type: JOURNAL
status: Living
owner: "@rix"
created_at: "2026-04-04T08:30:00.000Z"
updated_at: "2026-04-04T08:30:00.000Z"
tags: [fuelsnap, spend-tracker, journal]
---

# Spend Tracker — Journal

<!-- prefix: ST -->

## Captures

<!-- Quick notes during active sessions. Clear after recording. -->

## Discussions

<!-- Permanent discussion records with IDs -->

### ST-D001 — Cost-per-km Input Strategy

`status:closed` `2026-04-04T08:30:00.000Z` `[cost-per-km, odometer, ux]`

**Context**: To calculate cost-per-km, we need to know how many kilometres the user drove in a given month. Two approaches were considered.

**Summary**: Evaluated odometer readings (accurate but adds friction) vs estimated km per tank (less accurate but zero friction). Decided to support both: odometer is optional on fill-up form, with fallback estimate configurable in settings.

**Progress**:

- [x] Evaluated odometer vs estimated km approaches
- [x] Added optional odometer field to FillUp model consideration (deferred to v2)
- [x] Implemented cost-per-km with manual km input for v1

**Decisions**:

- Made odometer an optional field on the fill-up form
- If odometer readings are present, cost-per-km uses actual km; otherwise falls back to estimated km per tank from user settings
- Keeps the happy path friction-free while rewarding accuracy for users who track odometer

**Related Files**: design.md, src/services/spend.service.ts
**Participants**: @rix, Claude
