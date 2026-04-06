---
afx: true
type: SPEC
status: Approved
owner: "@agenticflowx"
version: "1.2"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:27:43.000Z"
tags: [roomledger, room-history, example]
depends_on: [01-room-dashboard]
---

# RoomLedger — Room History

## Problem Statement

During occupancy, damage, wear, and repairs happen but often go undocumented. When disputes arise at move-out, there is no shared record of what occurred between check-in and check-out. The room history timeline provides a chronological log of incidents and repairs that both parties can reference.

## User Stories

| ID   | Story                                                                                                                              |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| US-1 | As an **owner**, I want to log repair events so there is a record that maintenance was performed during the rental period.         |
| US-2 | As a **renter**, I want to report damage or issues so the owner is aware and the event is on record before check-out.              |
| US-3 | As either role, I want to see all room events in chronological order so I can understand the room's condition history at a glance. |

## Functional Requirements

| ID   | Requirement       | Description                                                                                                                                                                                                                                                                                                                  |
| ---- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-1 | Vertical timeline | Display a vertical timeline of room events using a dot-and-card pattern. Each event has an accent-colored dot marker, a bordered card with title, date, status chip, and a short description. Events are displayed in reverse chronological order (newest first).                                                            |
| FR-2 | Issue entry form  | A data-entry card on the right side with: title input (required), status dropdown (Reported, In Progress, Resolved), multiline notes textarea (optional), and a primary "Add event" submit button. The form top row uses a 2-column grid (title + status), with full-width notes below. All form fields have visible labels. |
| FR-3 | Dynamic insertion | Submitting the form prepends a new event card to the timeline. The event uses the current date in `YYYY-MM-DD` format. The form clears after submission. If the title field is empty, the submit button does nothing (no error message, no submission). New events disappear on page refresh (in-memory only).               |
| FR-4 | Status indicators | Each timeline event displays a status chip: "Reported" (warning color), "In Progress" (accent color), "Resolved" (success color).                                                                                                                                                                                            |
| FR-5 | Responsive layout | 2-column layout (timeline + form) collapses to 1 column on mobile. Form stacks below the timeline.                                                                                                                                                                                                                           |

## Non-Functional Requirements

| ID    | Requirement              | Description                                                                          |
| ----- | ------------------------ | ------------------------------------------------------------------------------------ |
| NFR-1 | No external dependencies | Plain HTML, CSS, and JavaScript only. No frameworks, no CDN imports, no build tools. |
| NFR-2 | Responsive range         | 320px to 1440px viewport width.                                                      |
| NFR-3 | Accessibility            | Semantic HTML, form labels associated with inputs, keyboard-navigable.               |
| NFR-4 | In-memory state          | Timeline events stored in a JS array. No persistence.                                |

## Acceptance Criteria

- [ ] Timeline renders with 3 pre-populated sample events
- [ ] Each event shows dot marker, title, date, status chip, and description
- [ ] Form submits and prepends a new event to the timeline
- [ ] Form clears after successful submission
- [ ] Empty title prevents submission (silent, no error)
- [ ] New events use `YYYY-MM-DD` date format
- [ ] Status chips show correct semantic colors (warning, accent, success)
- [ ] 2-column layout (timeline + form) collapses to 1 column on mobile

## Sample Data

The timeline is pre-populated with 3 events demonstrating a repair lifecycle:

| Title               | Date       | Status      | Description                                        |
| ------------------- | ---------- | ----------- | -------------------------------------------------- |
| Wall crack reported | 2026-03-15 | Reported    | Crack found near window frame during routine check |
| Repair scheduled    | 2026-03-18 | In Progress | Contractor booked for next week                    |
| Repair completed    | 2026-03-25 | Resolved    | Window frame repaired and photographed             |

## Non-Goals (Out of Scope)

- Photo attachment on timeline events — text-only events
- Editing or deleting existing timeline events — append-only
- Filtering or searching the timeline
- Event attribution (which role added the event) — not tracked in this version
- Notification when a new event is added

## Dependencies

- **01-room-dashboard**: Provides the app shell (sidebar, navigation, role switching, theme system). The room history view is rendered inside the dashboard's main content area.

## Open Questions
