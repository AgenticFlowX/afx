---
afx: true
type: TASKS
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-04-05T07:05:46.000Z"
updated_at: "2026-04-05T07:05:46.000Z"
tags: [fuelsnap, price-dashboard, tasks]
spec: spec.md
design: design.md
---

# Price Dashboard — Tasks

## Phase 1: Data Layer

- [x] 1.1 Define `FuelPrice` interface in `src/models/fuel-price.model.ts`
- [x] 1.2 Create `FuelDataAdapter` base interface in `src/adapters/fuel-data.adapter.ts`
- [x] 1.3 Implement `ApiAdapter` in `src/adapters/api.adapter.ts`
- [x] 1.4 Implement `CsvAdapter` in `src/adapters/csv.adapter.ts`

## Phase 2: Service Layer

- [x] 2.1 Create `PriceService` with adapter injection in `src/services/price.service.ts`
- [x] 2.2 Implement trend calculation (7-day rolling average comparison)
- [x] 2.3 Add 15-minute cache layer for API responses

## Phase 3: UI

- [x] 3.1 Build price card component with trend indicator
- [x] 3.2 Add fuel type filter dropdown
- [x] 3.3 Add region selector dropdown
- [x] 3.4 Display last-updated timestamp

---

## Work Sessions

<!-- IMPORTANT: This section MUST remain the LAST section in tasks.md. Do not add content below it. -->
<!-- Task execution log — append-only, updated by /afx-task pick, /afx-task code, /afx-task complete -->

| Date       | Task | Action    | Files Modified                                                                                          | Agent | Human |
| ---------- | ---- | --------- | ------------------------------------------------------------------------------------------------------- | ----- | ----- |
| 2026-04-02 | 1.1  | Coded     | src/models/fuel-price.model.ts                                                                          | [x]   | -     |
| 2026-04-02 | 1.2  | Coded     | src/adapters/fuel-data.adapter.ts                                                                       | [x]   | -     |
| 2026-04-02 | 1.3  | Coded     | src/adapters/api.adapter.ts                                                                             | [x]   | -     |
| 2026-04-02 | 1.4  | Coded     | src/adapters/csv.adapter.ts                                                                             | [x]   | -     |
| 2026-04-02 | 1.1  | Completed | src/models/fuel-price.model.ts                                                                          | [x]   | -     |
| 2026-04-02 | 1.2  | Completed | src/adapters/fuel-data.adapter.ts                                                                       | [x]   | -     |
| 2026-04-02 | 1.3  | Completed | src/adapters/api.adapter.ts                                                                             | [x]   | -     |
| 2026-04-02 | 1.4  | Completed | src/adapters/csv.adapter.ts                                                                             | [x]   | -     |
| 2026-04-03 | 2.1  | Coded     | src/services/price.service.ts                                                                           | [x]   | -     |
| 2026-04-03 | 2.2  | Coded     | src/services/price.service.ts                                                                           | [x]   | -     |
| 2026-04-03 | 2.3  | Coded     | src/services/price.service.ts                                                                           | [x]   | -     |
| 2026-04-03 | 2.1  | Completed | src/services/price.service.ts                                                                           | [x]   | -     |
| 2026-04-03 | 2.2  | Completed | src/services/price.service.ts                                                                           | [x]   | -     |
| 2026-04-03 | 2.3  | Completed | src/services/price.service.ts                                                                           | [x]   | -     |
| 2026-04-04 | 3.1  | Coded     | UI components                                                                                           | [x]   | -     |
| 2026-04-04 | 3.2  | Coded     | UI components                                                                                           | [x]   | -     |
| 2026-04-04 | 3.3  | Coded     | UI components                                                                                           | [x]   | -     |
| 2026-04-04 | 3.4  | Coded     | UI components                                                                                           | [x]   | -     |
| 2026-04-04 | 3.1  | Completed | UI components                                                                                           | [x]   | -     |
| 2026-04-04 | 3.2  | Completed | UI components                                                                                           | [x]   | -     |
| 2026-04-04 | 3.3  | Completed | UI components                                                                                           | [x]   | -     |
| 2026-04-04 | 3.4  | Completed | UI components                                                                                           | [x]   | -     |
