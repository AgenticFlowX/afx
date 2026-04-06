---
afx: true
type: SPEC
status: Approved
owner: "@agenticflowx"
version: "1.2"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:17:23.000Z"
tags: [roomledger, check-in, example]
depends_on: [01-room-dashboard]
---

# RoomLedger — Check-In Inspection

## Problem Statement

When a renter moves into a room, both parties need a shared record of the room's initial condition. Without structured photo comparison, disputes about pre-existing damage at move-out become difficult to resolve. The check-in inspection provides a side-by-side comparison of owner and renter baseline photos, with explicit approval or mismatch flagging.

## User Stories

| ID   | Story                                                                                                                            |
| ---- | -------------------------------------------------------------------------------------------------------------------------------- |
| US-1 | As an **owner**, I want to present my baseline photos alongside the renter's so we can agree on the room's initial condition.    |
| US-2 | As a **renter**, I want to flag mismatches between my photos and the owner's baseline so disputes are recorded before I move in. |
| US-3 | As either role, I want a photo-angle checklist so I know which angles to capture for consistent comparison.                      |

## Functional Requirements

| ID   | Requirement                   | Description                                                                                                                                                                                                                                                                                                                       |
| ---- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-1 | Three-column photo comparison | Display 3 equal-width cards: (1) Owner baseline photos with title, image placeholder, and "Captured" status chip; (2) Renter baseline photos with title, image placeholder, and "Captured" status chip; (3) Comparison result card with summary text and action buttons.                                                          |
| FR-2 | Flag mismatch action          | A "Flag mismatch" button in the comparison result card. Clicking it changes the result status to "Mismatch flagged" (danger color), displays a dispute notice ("A mismatch has been flagged. Both parties should review the photos and resolve before proceeding."), and disables both action buttons.                            |
| FR-3 | Approve baseline action       | An "Approve baseline" button in the comparison result card. Clicking it changes the result status to "Baseline approved" (success color), updates the check-in approval state for the current role, and disables both action buttons. Switching roles and clicking again records the other role's approval independently.         |
| FR-4 | Photo-angle checklist         | Below the comparison area, display a checklist card with 6 photo-angle chips: Door view, Window view, Wardrobe, Floor corners, Ceiling, Power sockets. All chips start unchecked. Clicking a chip toggles it between default (unchecked) and active (checked) state. Toggling is visual only — it does not affect approval logic. |
| FR-5 | Responsive collapse           | 3-column comparison collapses to 1 column on mobile. Checklist chips wrap naturally.                                                                                                                                                                                                                                              |

## Non-Functional Requirements

| ID    | Requirement              | Description                                                                          |
| ----- | ------------------------ | ------------------------------------------------------------------------------------ |
| NFR-1 | No external dependencies | Plain HTML, CSS, and JavaScript only. No frameworks, no CDN imports, no build tools. |
| NFR-2 | Responsive range         | 320px to 1440px viewport width.                                                      |
| NFR-3 | Accessibility            | Semantic HTML, keyboard-navigable actions, sufficient contrast.                      |
| NFR-4 | In-memory state          | Approval states are held in JS variables. No persistence.                            |

## Acceptance Criteria

- [ ] Three photo cards render side by side on desktop
- [ ] "Flag mismatch" changes status to danger state with dispute notice text
- [ ] "Approve baseline" changes status to success state for the active role
- [ ] Switching roles and approving again records an independent approval per role
- [ ] Both action buttons disable after either is clicked (mutually exclusive per role per session)
- [ ] Photo-angle chips start unchecked, toggle on click, and are visual-only
- [ ] Layout collapses to single column on mobile

## Non-Goals (Out of Scope)

- Real photo upload or camera capture — placeholders only
- Image comparison or diff algorithm — human visual comparison only
- Multiple comparison rounds — one comparison per session
- Undo/reset after flagging or approving — refresh to reset

## Dependencies

- **01-room-dashboard**: Provides the app shell (sidebar, navigation, role switching, theme system). The check-in view is rendered inside the dashboard's main content area and relies on the active role state for approval attribution.

## Open Questions
