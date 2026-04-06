---
afx: true
type: SPEC
status: Approved
owner: "@agenticflowx"
version: "1.1"
created_at: 2026-04-06T10:14:58.000Z
updated_at: 2026-04-06T10:32:47.000Z
tags: [roomledger, dashboard, example]
---

# RoomLedger — Room Dashboard

## Problem Statement

Owners and renters in informal room-rental arrangements lack a shared, structured way to view the current state of a room's inspection lifecycle. Without a central dashboard, both parties lose track of which steps are complete (check-in, issue logging, check-out) and who is responsible for the next action.

The Room Dashboard provides an at-a-glance summary of room condition, workflow progress, key metrics, and approval responsibilities — serving as the entry point for all other RoomLedger views.

## User Stories

| ID | Story |
| --- | --- |
| US-1 | As an **owner**, I want to see the room's current status and workflow progress so I know which step to complete next. |
| US-2 | As a **renter**, I want to see my approval responsibilities so I know what actions are pending from me. |
| US-3 | As either role, I want to quickly navigate to check-in, room history, or check-out views from the dashboard. |
| US-4 | As either role, I want to switch between light and dark themes for comfortable viewing in different environments. |

## User Personas

| Role | Goal |
| --- | --- |
| **Owner** | Prepare the room, capture baseline photos, log repairs, approve comparison results |
| **Renter** | Verify entry condition, report damage during stay, approve exit state |

## Functional Requirements

| ID | Requirement | Description |
| --- | --- | --- |
| FR-1 | Hero section | Display room identity (name, address), room status chip (e.g., "Occupied"), a short description of the app's purpose, and three status chips showing entry approval (owner, renter) and exit inspection state. The right side shows a vertical workflow timeline with 3 steps: move-in capture, issue logging, and move-out comparison. |
| FR-2 | KPI row | Show 4 metric cards in a single row: Baseline Photos (count), Issues Logged (count), Repairs Completed (count), Pending Approvals (count). Values are hardcoded sample data. |
| FR-3 | Room card | Display a room summary card with a 2x2 thumbnail grid (Entry wall, Window side, Wardrobe, Flooring), status chips (check-in complete, check-out waiting), room name, a guidance note about photo angles, and two action buttons: "Open check-in" and "Open compare". |
| FR-4 | Approval summary | Show an "Approval snapshot" panel with a description line and two side-by-side responsibility notice boxes — one for Owner (prepare, capture, approve) and one for Renter (verify, report, approve). |
| FR-5 | Responsive layout | Collapse from 2-column app shell (280px sidebar + 1fr content) to single column on tablet/mobile. KPI row collapses from 4 columns to 2 to 1. Hero and content grid collapse from 2 columns to 1. |
| FR-6 | Theme toggle | Provide a light/dark theme toggle in the sidebar. Switching themes updates all CSS custom properties. Persist preference in localStorage. |
| FR-7 | Sidebar | Fixed 280px sidebar with: brand header (logo + product name), simulated login card (Owner/Renter segmented toggle + identity chips), 4 navigation buttons (Dashboard, Check-in photos, Room history, Check-out compare), prototype notes card, and theme toggle button. |
| FR-8 | Role switching | Segmented Owner/Renter toggle changes the active role. The top bar description text updates to reflect the active role's perspective. Approval actions in other views operate under the selected role. |
| FR-9 | Top bar | Display current page title, a role-sensitive description line, and two global action buttons: "Quick approve current step" (primary) and "Add repair event" (secondary). |

## Non-Functional Requirements

| ID | Requirement | Description |
| --- | --- | --- |
| NFR-1 | No external dependencies | Plain HTML, CSS, and JavaScript only. No frameworks, no CDN imports, no build tools. |
| NFR-2 | Responsive range | Must be usable from 320px to 1440px viewport width. |
| NFR-3 | Accessibility | Semantic HTML elements (nav, main, section, button). Sufficient color contrast in both themes. Interactive elements are keyboard-navigable. |
| NFR-4 | In-memory state | All state (role, theme, view) is held in JavaScript variables. No database, no backend, no API calls. State resets on page refresh (except theme preference via localStorage). |

## Acceptance Criteria

- [ ] Dashboard loads with the hero section showing room identity, status, and workflow timeline
- [ ] 4 KPI cards display with hardcoded sample values
- [ ] Room card shows thumbnail grid, status chips, and action buttons
- [ ] Approval snapshot shows owner and renter responsibility panels
- [ ] Sidebar navigation highlights "Dashboard" as active
- [ ] Owner/Renter toggle switches role and updates top bar description
- [ ] Theme toggle switches between light and dark themes
- [ ] Layout collapses responsively at tablet and mobile breakpoints
- [ ] No external HTTP requests are made (fully offline-capable)

## Non-Goals (Out of Scope)

- Multi-room or multi-property support — this prototype covers a single room only
- Real user authentication or account management — simulated role switching only
- File uploads or real photo capture — placeholder thumbnails only
- Persistent storage or backend API — all state is in-memory
- Notification system or email alerts
- Print-friendly or PDF export layout

## Dependencies

None — the dashboard is the root feature and provides shared infrastructure (sidebar, theme, role switching, navigation) consumed by all other features.

## Open Questions

- Should the "Quick approve current step" button in the top bar be disabled when there are no pending approvals, or always enabled with a no-op?
- Should the KPI values update dynamically when events are added in Room History, or remain static sample data?
