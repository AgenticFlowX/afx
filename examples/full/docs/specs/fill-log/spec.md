---
afx: true
type: SPEC
status: Approved
owner: "@rix"
version: "1.0"
created_at: "2026-04-05T07:05:46.000Z"
updated_at: "2026-04-05T07:05:46.000Z"
tags: [fuelsnap, fill-log, fuel-tracking]
---

# Fill Log

## Overview

Allow users to log individual fill-ups with date, station name, litres filled, price per litre, and total cost. Entries are stored locally and can be edited or deleted. The fill log provides the raw data that powers the spend tracker.

## Functional Requirements

| ID   | Requirement                                                                                          | Priority |
| ---- | ---------------------------------------------------------------------------------------------------- | -------- |
| FR-1 | Add a new fill-up entry with: date, station name, litres, price per litre. Total cost is calculated. | Must     |
| FR-2 | Edit an existing fill-up entry (all fields except ID).                                               | Must     |
| FR-3 | Delete a fill-up entry with confirmation prompt.                                                     | Must     |
| FR-4 | List fill-up history in reverse chronological order with pagination (20 per page).                    | Must     |

## Non-Functional Requirements

| ID    | Requirement                                                                              | Priority |
| ----- | ---------------------------------------------------------------------------------------- | -------- |
| NFR-1 | Data must persist across browser sessions using localStorage.                            | Must     |
| NFR-2 | Fill-up list must render within 500ms for up to 1,000 entries.                           | Should   |

## Acceptance Criteria

- Given the user fills in date, station, litres, and price per litre, when they submit, then a new entry is saved with `totalCost = litres * pricePerLitre`.
- Given an existing entry, when the user edits the litres field, then `totalCost` is recalculated automatically.
- Given the user clicks delete on an entry, when they confirm, then the entry is removed from storage.
- Given 50 fill-up entries exist, when the user views the list, then the most recent 20 are shown with a "Load more" option.
