---
afx: true
type: DESIGN
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-04-05T07:05:46.000Z"
updated_at: "2026-04-05T07:05:46.000Z"
tags: [fuelsnap, spend-tracker, design]
spec: spec.md
---

# Spend Tracker — Technical Design

## [DES-OVR] Overview

The spend tracker is a read-only analytics view that aggregates fill-up data from `FillLogService` and regional price data from `PriceService`. It has no persistence of its own — all computations are derived on demand.

## [DES-ARCH] Architecture

```
FillLogService ──┐
                 ├──▶ SpendService ──▶ UI Components
PriceService ────┘
```

`SpendService` depends on both `FillLogService` (user's fill-up history) and `PriceService` (regional averages for comparison). It exposes pure computation methods with no side effects.

## [DES-DATA] Data Shapes

### MonthlySummary

```typescript
interface MonthlySummary {
  month: string;           // YYYY-MM
  totalLitres: number;
  totalCost: number;
  avgPricePerLitre: number;
  fillUpCount: number;
}
```

### CostPerKm

```typescript
interface CostPerKm {
  month: string;
  totalCost: number;
  kmDriven: number;
  costPerKm: number;
}
```

## [DES-SERVICE] Service Methods

- `getMonthlySummary(month: string): MonthlySummary` — Filters fill-ups by month, aggregates totals.
- `getCostPerKm(month: string, kmDriven: number): CostPerKm` — Divides monthly cost by km driven.
- `getComparisonData(months: string[]): ComparisonPoint[]` — Returns user avg vs regional avg for each month.

## [DES-CHART] Chart Strategy

- Use a simple line chart with two series: "Your Average" and "Regional Average".
- X-axis: months. Y-axis: price per litre.
- Chart library is left to UI implementation (Chart.js, Recharts, or vanilla SVG).
