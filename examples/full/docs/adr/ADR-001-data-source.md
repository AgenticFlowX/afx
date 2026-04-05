---
afx: true
type: ADR
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-04-05T07:05:46.000Z"
updated_at: "2026-04-05T07:05:46.000Z"
tags: [fuelsnap, adr, data-source, adapter]
---

# ADR-001: Data Source Strategy — Adapter Pattern for Fuel Prices

## Status

Accepted

## Context

FuelSnap needs to display current fuel prices from external sources. The available sources vary by country and format:

- **Australia (NSW FuelCheck, FuelWatch WA)** — REST APIs with JSON responses.
- **USA (EIA)** — REST API with JSON responses.
- **Germany (TankerKoenig)** — REST API with JSON responses.
- **New Zealand (MBIE)** — Monthly CSV downloads only; no public REST API.

We need a data layer that can work with both real-time APIs and static file imports, and that allows users to choose their preferred source based on their region.

## Decision

We will use the **Adapter pattern** with a common `FuelDataAdapter` interface. Two concrete implementations will be provided:

1. **ApiAdapter** — Configurable REST client that works with any of the supported API sources.
2. **CsvAdapter** — File reader that parses CSV data into the standard `FuelPrice` shape.

The active adapter is selected at startup based on user configuration. The service and UI layers depend only on the `FuelDataAdapter` interface, never on concrete implementations.

## Consequences

### Positive

- **Flexibility** — New data sources can be added by implementing the adapter interface.
- **Testability** — Services can be tested with mock adapters.
- **Offline support** — CSV adapter enables fully offline usage.
- **Regional coverage** — Supports users in AU, NZ, US, and DE without code changes.

### Negative

- **Configuration burden** — Users must configure their adapter (API URL, key, or file path).
- **Data freshness varies** — API sources are near real-time; CSV may be weeks old.
- **Normalisation complexity** — Each API returns different shapes; mapping logic lives in each adapter.

### Neutral

- API adapters may need per-source mapping functions as APIs evolve.
- CSV format changes from MBIE would require parser updates.
