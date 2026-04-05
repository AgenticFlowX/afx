---
afx: true
type: DESIGN
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-04-05T07:05:46.000Z"
updated_at: "2026-04-05T07:05:46.000Z"
tags: [fuelsnap, fill-log, design]
spec: spec.md
---

# Fill Log — Technical Design

## [DES-OVR] Overview

The fill log is a simple CRUD feature backed by `localStorage`. It stores an array of `FillUp` records and exposes them through `FillLogService`. Total cost is always derived (`litres * pricePerLitre`), never stored independently.

## [DES-DATA] Data Model — FillUp

```typescript
interface FillUp {
  id: string;          // UUID v4
  date: string;        // ISO 8601 date (YYYY-MM-DD)
  station: string;     // Station name (free text)
  litres: number;      // Litres filled
  pricePerLitre: number; // Price per litre in local currency
  totalCost: number;   // Computed: litres * pricePerLitre
}
```

## [DES-STORAGE] Storage

- **Engine:** `localStorage` under key `fuelsnap:fill-log`.
- **Format:** JSON-serialised `FillUp[]`.
- **Capacity:** localStorage typically allows 5-10 MB. At ~200 bytes per entry, this supports 25,000+ fill-ups — well beyond personal use.

### Why localStorage over IndexedDB

- **Simplicity** — No async API, no schema migrations, no cursor management.
- **Sufficient capacity** — Personal fuel tracking generates ~50-100 entries per year.
- **Portability** — Easy to export/import as JSON.

IndexedDB would be warranted if we added image attachments (receipts) or needed indexed queries across thousands of records. For v1, localStorage is the right trade-off.

## [DES-SERVICE] Service Layer

`FillLogService` provides:

- `addFillUp(data: Omit<FillUp, "id" | "totalCost">): FillUp` — Generates ID, computes total, saves.
- `updateFillUp(id: string, data: Partial<FillUp>): FillUp` — Merges changes, recomputes total if litres or price changed.
- `deleteFillUp(id: string): void` — Removes by ID.
- `listFillUps(page?: number, pageSize?: number): FillUp[]` — Returns sorted desc by date.

## [DES-VALIDATION] Input Validation

- `litres` must be > 0 and <= 200 (reasonable tank size).
- `pricePerLitre` must be > 0 and <= 10 (sanity check).
- `station` must be non-empty, max 100 characters.
- `date` must be a valid ISO date, not in the future.
