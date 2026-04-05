# FuelSnap — Full SDD Example

A personal fuel price tracker built with AgenticFlowX spec-driven development. This example demonstrates the complete AFX workflow: specs, designs, tasks, journals, ADRs, traceability, and session continuity.

## Domain

FuelSnap helps users track fuel prices and personal fuel spending. It has three features:

1. **Price Dashboard** — Display current fuel prices by type (91, 95, Diesel) with trend indicators.
2. **Fill Log** — Log fill-ups with date, station, litres, price paid, and total cost.
3. **Spend Tracker** — Monthly spend summary, cost-per-km, and price-vs-average comparison.

## Architecture

The data layer uses an **adapter pattern** so users can choose their fuel price source:

| Source          | Type | Region       | URL / Notes                                        |
| --------------- | ---- | ------------ | -------------------------------------------------- |
| NSW FuelCheck   | API  | Australia    | `api.nsw.gov.au/v1/fuel` — Free, requires API key |
| EIA             | API  | USA          | `api.eia.gov` — US Energy Information Admin        |
| TankerKoenig    | API  | Germany      | `creativecommons.tankerkoenig.de` — Real-time      |
| FuelWatch WA    | API  | Australia    | `fuelwatch.wa.gov.au` — Western Australia only     |
| MBIE NZ         | CSV  | New Zealand  | Monthly CSV from `mbie.govt.nz`                    |

See `docs/adr/ADR-001-data-source.md` for the decision record.

## Project Structure

```
docs/
  specs/
    price-dashboard/   # Spec, design, tasks, journal
    fill-log/          # Spec, design, tasks, journal
    spend-tracker/     # Spec, design, tasks, journal
  adr/
    ADR-001-data-source.md
src/
  adapters/
    fuel-data.adapter.ts   # Base interface
    api.adapter.ts         # REST API adapter
    csv.adapter.ts         # CSV file adapter
  models/
    fuel-price.model.ts    # FuelPrice, PriceTrend
    fill-up.model.ts       # FillUp, FillUpInput
  services/
    price.service.ts       # Price fetching + trend
    fill-log.service.ts    # Fill-up CRUD
    spend.service.ts       # Spend aggregation
data/
  sample-prices.csv        # Sample NZ fuel price data
.afx/
  kanban/backlog.md        # Work progression
  notes/session-notes.md   # Development notes
```

## Traceability

All source files include `@see` annotations linking back to their spec and design documents:

```typescript
/**
 * PriceService — orchestrates fuel price fetching and trend calculation.
 *
 * @see docs/specs/price-dashboard/spec.md [FR-1] [FR-2]
 * @see docs/specs/price-dashboard/design.md [DES-ARCH] [DES-CACHE]
 */
```

## Getting Started

This is a reference example — it demonstrates AFX structure and conventions rather than a runnable application. To explore:

1. Start with the specs in `docs/specs/*/spec.md` to understand requirements.
2. Read the designs in `docs/specs/*/design.md` for architecture decisions.
3. Check the source in `src/` to see traceability annotations in action.
4. Review `docs/adr/ADR-001-data-source.md` for the adapter pattern rationale.
5. Look at `.afx/kanban/backlog.md` for work progression history.
