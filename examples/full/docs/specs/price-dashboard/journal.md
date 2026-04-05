---
afx: true
type: JOURNAL
status: Living
owner: "@rix"
created_at: "2026-04-01T16:30:00.000Z"
updated_at: "2026-04-01T16:30:00.000Z"
tags: [fuelsnap, price-dashboard, journal]
---

# Price Dashboard — Journal

<!-- prefix: PD -->

## Captures

<!-- Quick notes during active sessions. Clear after recording. -->

## Discussions

<!-- Permanent discussion records with IDs -->

### PD-D001 — API Research and Adapter Decision

`status:closed` `2026-04-01T16:30:00.000Z` `[api, adapter, data-source]`

**Context**: Investigated available fuel price APIs for New Zealand. Found that MBIE publishes fuel price data only as monthly CSV downloads — there is no public REST API for NZ fuel prices.

**Summary**: Checked MBIE website, looked at Australian alternatives (NSW FuelCheck REST API), rejected scraping. Decided on adapter pattern so users can pick their data source. NZ users use CSV, AU/US/DE users use API.

**Progress**:

- [x] Researched MBIE data availability
- [x] Evaluated Australian API alternatives
- [x] Created ADR for data source decision
- [x] Defined adapter interface
- [x] Implemented both adapters

**Decisions**:

- Adopted adapter pattern with `FuelDataAdapter` interface
- Two implementations: `ApiAdapter` and `CsvAdapter`
- See `docs/adr/ADR-001-data-source.md` for formal decision record

**Related Files**: design.md, docs/adr/ADR-001-data-source.md, src/adapters/fuel-data.adapter.ts
**Participants**: @rix, Claude
