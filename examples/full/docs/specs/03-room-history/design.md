---
afx: true
type: DESIGN
status: Approved
owner: "@agenticflowx"
version: "1.1"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:32:44.000Z"
tags: [roomledger, room-history, example]
spec: spec.md
---

# RoomLedger — Room History Design

## [DES-TIMELINE] Timeline Layout

<!-- @see spec.md [FR-1] [FR-5] [NFR-2] -->

Two-column layout: `grid-template-columns: 1.2fr 0.8fr`, `gap: 1.5rem`.

```
┌──────────────────────────────┬─────────────────────────┐
│ Room History Timeline        │ Add New Event           │
│                              │                         │
│ ● Wall crack reported        │ ┌─────────┬───────────┐ │
│ │ 2026-03-15 [Reported]      │ │ Title   │ Status    │ │
│ │ Crack found near window    │ └─────────┴───────────┘ │
│ │ frame during routine check │                         │
│ │                            │ ┌───────────────────┐   │
│ ● Repair scheduled           │ │ Notes             │   │
│ │ 2026-03-18 [In Progress]   │ │                   │   │
│ │ Contractor booked for      │ └───────────────────┘   │
│ │ next week                  │                         │
│ │                            │ [Add event]             │
│ ● Repair completed           │                         │
│   2026-03-25 [Resolved]      │                         │
│   Window frame repaired and  │                         │
│   photographed               │                         │
└──────────────────────────────┴─────────────────────────┘
```

**Responsive:** At `<= 768px`, collapses to single column. Form stacks below the timeline.

## [DES-EVENT-CARD] Timeline Event

<!-- @see spec.md [FR-1] [FR-4] -->

Each event uses a dot-and-card pattern connected by a vertical line.

- Dot: `10px` circle, `accent` color, `position: absolute` on the left
- Vertical line: `2px` solid `line` color, connects dots
- Event card: `surface` background, `line` border, `border-radius: 12px`, `padding: 1rem`
- Title: `font-weight: 600`, `font-size: 1rem`
- Date/status line: `muted` color, `font-size: 0.85rem`, with inline status chip
- Description: `font-size: 0.9rem`, `text` color
- Status chips: "Reported" → `warning`, "In Progress" → `accent`, "Resolved" → `success`

## [DES-EVENT-FORM] Issue Entry Form

<!-- @see spec.md [FR-2] -->

Card with form fields.

- Card: `surface` background, `line` border, `border-radius: 12px`, `padding: 1.25rem`
- Title: `h3`, "Add New Event", `font-weight: 600`
- Form top row: `grid-template-columns: 1fr 1fr`, `gap: 1rem`
  - Title input: `width: 100%`, `padding: 0.6rem`, `border: 1px solid var(--line)`, `border-radius: 8px`, `background: var(--surface-2)`
  - Status select: same styling, options: "Reported", "In Progress", "Resolved"
- Notes textarea: full width, `min-height: 100px`, same input styling
- Submit button: primary style (`accent` background, white text), full width, `margin-top: 1rem`
- Labels: `font-size: 0.85rem`, `font-weight: 500`, `margin-bottom: 0.4rem`

## [DES-INTERACTION-HISTORY] Interaction Design

<!-- @see spec.md [FR-3] [NFR-4] -->

**Add event:**

- Fill in title (required), select status, optionally add notes
- Click "Add event" → new event prepends to timeline with entered data and current date in `YYYY-MM-DD` format
- Form fields clear after submission
- If title is empty, button does nothing (no error message, prototype behavior)

**Sample data (pre-populated):**

1. "Wall crack reported" — 2026-03-15 — Reported — "Crack found near window frame during routine check"
2. "Repair scheduled" — 2026-03-18 — In Progress — "Contractor booked for next week"
3. "Repair completed" — 2026-03-25 — Resolved — "Window frame repaired and photographed"

Events are stored in a JS array and rendered to DOM on page load. New events prepend to the array and DOM.
