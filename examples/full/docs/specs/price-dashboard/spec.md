---
afx: true
type: SPEC
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-04-05T07:05:46.000Z"
updated_at: "2026-04-05T07:05:46.000Z"
tags: [fuelsnap, price-dashboard, fuel-prices]
---

# Price Dashboard

## Overview

Display current fuel prices by type (91, 95, Diesel) with a trend indicator, allowing users to filter by fuel type and region. The dashboard sources data via an adapter pattern, supporting both public REST APIs and CSV imports.

## Functional Requirements

| ID   | Requirement                                                                                                      | Priority |
| ---- | ---------------------------------------------------------------------------------------------------------------- | -------- |
| FR-1 | Display current fuel prices grouped by fuel type (91, 95, Diesel) from the configured data source (API or CSV). | Must     |
| FR-2 | Show a trend indicator (up/down/stable) comparing the latest price to the 7-day rolling average.                 | Must     |
| FR-3 | Allow the user to filter displayed prices by fuel type (91, 95, Diesel, or All).                                 | Must     |
| FR-4 | Allow the user to select a region to scope prices geographically.                                                | Should   |
| FR-5 | Display the last-updated timestamp so users know data freshness.                                                 | Should   |

## Non-Functional Requirements

| ID    | Requirement                                                                                  | Priority |
| ----- | -------------------------------------------------------------------------------------------- | -------- |
| NFR-1 | Dashboard must render within 2 seconds on a standard broadband connection.                   | Must     |
| NFR-2 | Data adapter must be swappable without changes to UI components (adapter pattern).            | Must     |
| NFR-3 | Price data must be cached locally for 15 minutes to reduce unnecessary API/file reads.        | Should   |

## Data Sources

The system uses an adapter pattern. The user configures one of the following:

| Source          | Type | Region       | Notes                              |
| --------------- | ---- | ------------ | ---------------------------------- |
| NSW FuelCheck   | API  | Australia    | Free, requires API key             |
| EIA             | API  | USA          | US Energy Information Admin        |
| TankerKoenig    | API  | Germany      | Real-time German fuel prices       |
| FuelWatch WA    | API  | Australia    | Western Australia only             |
| MBIE NZ         | CSV  | New Zealand  | Monthly CSV download from govt     |

## Acceptance Criteria

- Given the API adapter is configured, when the dashboard loads, then current prices for all fuel types are displayed.
- Given the CSV adapter is configured, when the dashboard loads, then the latest prices from the CSV file are displayed.
- Given a price has increased vs the 7-day average, when viewing the dashboard, then an upward trend indicator is shown.
- Given the user selects "95" in the fuel type filter, then only 95-octane prices are displayed.
