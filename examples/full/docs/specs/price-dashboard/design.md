---
afx: true
type: DESIGN
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-04-05T07:05:46.000Z"
updated_at: "2026-04-05T07:05:46.000Z"
tags: [fuelsnap, price-dashboard, design]
spec: spec.md
---

# Price Dashboard — Technical Design

## [DES-OVR] Overview

The price dashboard is the primary view of FuelSnap. It fetches fuel price data through a pluggable adapter, normalises it into a common `FuelPrice` shape, and renders price cards with trend indicators.

## [DES-ARCH] Architecture — Adapter Pattern

The data layer uses the **Adapter pattern** to abstract the fuel price source. All adapters implement a common `FuelDataAdapter` interface:

```typescript
interface FuelDataAdapter {
  fetchPrices(region: string): Promise<FuelPrice[]>;
  getSupportedRegions(): string[];
  getSourceName(): string;
}
```

Two concrete adapters are provided:

- **ApiAdapter** — Calls a REST endpoint (NSW FuelCheck, EIA, TankerKoenig, FuelWatch WA). Configurable via `apiUrl` and `apiKey`.
- **CsvAdapter** — Reads a local CSV file (e.g., MBIE NZ data). Parses rows into `FuelPrice[]`.

The active adapter is selected at startup based on user configuration. The dashboard component receives prices through `PriceService`, which delegates to whichever adapter is configured.

## [DES-DATA] Data Model — FuelPrice

```typescript
interface FuelPrice {
  fuelType: "91" | "95" | "Diesel";
  price: number;
  currency: string;
  station?: string;
  region: string;
  timestamp: string; // ISO 8601
}
```

Trend is computed by `PriceService.getTrend()` which compares the latest price to the 7-day rolling average for the same fuel type and region.

## [DES-UI] UI Composition

```
┌──────────────────────────────────────┐
│  FuelSnap — Price Dashboard          │
├──────────────────────────────────────┤
│  [Fuel Type ▼]  [Region ▼]          │
├──────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ 91       │ │ 95       │ │Diesel│ │
│  │ $2.34 ▲  │ │ $2.51 ▼  │ │$1.89 │ │
│  │ +0.03    │ │ -0.02    │ │ ─    │ │
│  └──────────┘ └──────────┘ └──────┘ │
│  Last updated: 2026-04-05 07:00 UTC │
└──────────────────────────────────────┘
```

Each price card shows: fuel type label, current price, trend arrow (▲ up, ▼ down, ─ stable), and delta from 7-day average.

## [DES-DEC] Decision — API vs CSV

The decision to support both API and CSV was driven by:

1. **NZ has no public REST API** — MBIE publishes monthly CSVs only.
2. **API availability varies** — Some APIs require keys, rate-limit, or cover limited regions.
3. **Offline-first** — CSV allows fully offline usage for personal tracking.

See also: `docs/adr/ADR-001-data-source.md`

## [DES-CACHE] Caching Strategy

- API responses are cached in memory for 15 minutes (`NFR-3`).
- CSV data is read once at startup and refreshed on explicit user action.
- Cache key: `${adapterName}:${region}`.
