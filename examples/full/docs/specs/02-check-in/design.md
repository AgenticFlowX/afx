---
afx: true
type: DESIGN
status: Approved
owner: "@agenticflowx"
version: "1.1"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:21:32.000Z"
tags: [roomledger, check-in, example]
spec: spec.md
---

# RoomLedger — Check-In Inspection Design

## [DES-COMPARE] Photo Comparison Layout

<!-- @see spec.md [FR-1] [FR-5] [NFR-2] -->

Three equal-width cards in a single row: `grid-template-columns: repeat(3, 1fr)`, `gap: 1rem`.

```
┌──────────────────┬──────────────────┬──────────────────┐
│ Owner Baseline   │ Renter Baseline  │ Comparison       │
│                  │                  │ Result           │
│ ┌──────────────┐ │ ┌──────────────┐ │                  │
│ │  Photo       │ │ │  Photo       │ │ Photos match.    │
│ │  placeholder │ │ │  placeholder │ │ Baseline looks   │
│ │              │ │ │              │ │ consistent.      │
│ └──────────────┘ │ └──────────────┘ │                  │
│ [Captured] ✓     │ [Captured] ✓     │ [Flag mismatch]  │
│                  │                  │ [Approve baseline]│
└──────────────────┴──────────────────┴──────────────────┘
```

**Photo card:**

- `surface` background, `line` border, `border-radius: 12px`, `padding: 1.25rem`
- Title: `h3`, `font-weight: 600`
- Image placeholder: `aspect-ratio: 4/3`, `surface-2` background, `border-radius: 8px`, centered icon or text "Photo placeholder"
- Status chip: `success` color when captured

**Comparison result card:**

- Same card styling
- Summary text: body text describing comparison outcome
- "Flag mismatch" button: `danger` background, white text
- "Approve baseline" button: `success` background, white text
- Result status area: shows "Baseline approved" (success chip) or "Mismatch flagged" (danger chip) after action

**Responsive:** At `<= 768px`, grid collapses to `grid-template-columns: 1fr` (single column, cards stack).

## [DES-CHECKLIST] Photo-Angle Checklist

<!-- @see spec.md [FR-4] -->

Below the comparison area. A card containing a horizontal wrap of chip buttons.

```
┌──────────────────────────────────────────────────────────┐
│ Photo Angle Checklist                                    │
│                                                          │
│ [Door view] [Window view] [Wardrobe] [Floor corners]     │
│ [Ceiling] [Power sockets]                                │
└──────────────────────────────────────────────────────────┘
```

- Card: same panel styling as other sections
- Chips: `surface-2` background, `line` border, `border-radius: 999px`, `padding: 0.4rem 1rem`
- Active/toggled chip: `accent-2` background, `accent` text, `accent` border
- Layout: `display: flex; flex-wrap: wrap; gap: 0.5rem`

## [DES-INTERACTION-CHECKIN] Interaction Design

<!-- @see spec.md [FR-2] [FR-3] [NFR-4] -->

**State model:** Two independent JS booleans per role (`ownerApproved`, `renterApproved`) plus a global `mismatchFlagged` flag. Flagging is global (blocks both roles); approval is per-role.

**Flag mismatch (global):**

- Click "Flag mismatch" → result status changes to "Mismatch flagged" chip (danger color)
- A dispute notice appears below: "A mismatch has been flagged. Both parties should review the photos and resolve before proceeding."
- Both action buttons disable for all roles (flag overrides approval)

**Approve baseline (per-role):**

- Click "Approve baseline" → result status changes to "Baseline approved" chip (success color)
- Sets the approval boolean for the current role only
- Both action buttons disable for the current role
- Switching roles shows buttons enabled again (if that role hasn't acted yet)

**Checklist toggle:**

- Click a chip to toggle between default and active states
- Visual only — no business logic, just tracks which angles have been photographed
