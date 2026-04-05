---
afx: true
type: SPEC
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-04-05T07:05:46.000Z"
updated_at: "2026-04-05T07:05:46.000Z"
tags: [fuelsnap, spend-tracker, analytics]
---

# Spend Tracker

## Overview

Provide users with a monthly spend summary, cost-per-km calculation, and a comparison chart showing their actual price paid versus regional average prices. This feature aggregates data from the fill log and price dashboard.

## Functional Requirements

| ID   | Requirement                                                                                                           | Priority |
| ---- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| FR-1 | Display a monthly spend summary showing total litres, total cost, and average price per litre for the selected month. | Must     |
| FR-2 | Calculate and display cost-per-km based on user-entered odometer readings or estimated km per tank.                   | Should   |
| FR-3 | Show a comparison chart plotting the user's average price paid against the regional average price over time.          | Should   |

## Non-Functional Requirements

| ID    | Requirement                                                                         | Priority |
| ----- | ----------------------------------------------------------------------------------- | -------- |
| NFR-1 | Aggregation must complete within 1 second for up to 1,000 fill-up entries.          | Must     |
| NFR-2 | Charts must be responsive and readable on mobile viewports (320px+).                | Should   |

## Acceptance Criteria

- Given fill-up entries exist for March 2026, when the user selects March 2026, then total litres, total cost, and average price are displayed.
- Given the user has entered odometer readings, when viewing the monthly summary, then cost-per-km is calculated as `totalCost / kmDriven`.
- Given fill-up and regional price data exist, when viewing the comparison chart, then both lines (user avg vs regional avg) are plotted month-by-month.
