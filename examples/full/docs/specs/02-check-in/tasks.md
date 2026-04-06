---
afx: true
type: TASKS
status: Approved
owner: "@agenticflowx"
version: "2.0"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:23:53.000Z"
tags: [roomledger, check-in, example]
spec: spec.md
design: design.md
---

# RoomLedger — Check-In Inspection Tasks

> All code goes in shared files: markup in `src/index.html`, styles in `src/styles.css`, scripts in `src/app.js`.

## Task Numbering Convention

- **1.x** - Comparison Layout (HTML + CSS)
- **2.x** - Checklist (HTML + CSS)
- **3.x** - Interactions (JS)

---

## Phase 1: Comparison Layout

### 1.1 Build three-column photo comparison

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/02-check-in/spec.md [FR-1] [FR-5] | docs/specs/02-check-in/design.md [DES-COMPARE] -->

- [ ] Add `.check-in-view` container inside `.main-content` (hidden by default, shown via nav)
- [ ] Add `.photo-compare` grid with `repeat(3, 1fr)` and `gap: 1rem`
- [ ] Card 1: Owner Baseline — title, photo placeholder (4:3 aspect ratio, surface-2), "Captured" chip (success)
- [ ] Card 2: Renter Baseline — same structure as card 1
- [ ] Card 3: Comparison Result — summary text, "Flag mismatch" button (danger), "Approve baseline" button (success), status area
- [ ] Responsive: collapse to `1fr` at `<= 768px`

---

## Phase 2: Checklist

### 2.1 Build photo-angle checklist

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/02-check-in/spec.md [FR-4] | docs/specs/02-check-in/design.md [DES-CHECKLIST] -->

- [ ] Add checklist card below `.photo-compare`
- [ ] Add 6 chip buttons: Door view, Window view, Wardrobe, Floor corners, Ceiling, Power sockets
- [ ] Style chips: surface-2 background, line border, 999px radius, flex-wrap layout
- [ ] Active chip style: accent-2 background, accent text, accent border

---

## Phase 3: Interactions

### 3.1 Implement flag mismatch action

<!-- files: src/app.js -->
<!-- @see docs/specs/02-check-in/spec.md [FR-2] [NFR-4] | docs/specs/02-check-in/design.md [DES-INTERACTION-CHECKIN] -->

- [ ] Click "Flag mismatch" → set global `mismatchFlagged = true`
- [ ] Show "Mismatch flagged" chip (danger color) in result status area
- [ ] Show dispute notice text below status
- [ ] Disable both action buttons for all roles (flag is global)

### 3.2 Implement approve baseline action

<!-- files: src/app.js -->
<!-- @see docs/specs/02-check-in/spec.md [FR-3] [NFR-4] | docs/specs/02-check-in/design.md [DES-INTERACTION-CHECKIN] -->

- [ ] Click "Approve baseline" → set `ownerApproved` or `renterApproved` based on active role
- [ ] Show "Baseline approved" chip (success color) in result status area
- [ ] Disable both action buttons for the current role only
- [ ] On role switch: restore button state if the other role hasn't acted yet

### 3.3 Implement checklist chip toggle

<!-- files: src/app.js -->
<!-- @see docs/specs/02-check-in/spec.md [FR-4] | docs/specs/02-check-in/design.md [DES-CHECKLIST] -->

- [ ] Click handler on each chip: toggle between default and active state
- [ ] Visual only — no effect on approval logic

---

## Implementation Flow

```
Phase 1: Comparison Layout (3-column grid, photo cards, responsive)
    ↓
Phase 2: Checklist (6 photo-angle chips)
    ↓
Phase 3: Interactions (flag, approve, checklist toggle)
```

---

## Cross-Reference Index

| Task | Spec Requirement | Design Section            |
| ---- | ---------------- | ------------------------- |
| 1.1  | [FR-1] [FR-5]    | [DES-COMPARE]             |
| 2.1  | [FR-4]           | [DES-CHECKLIST]           |
| 3.1  | [FR-2] [NFR-4]   | [DES-INTERACTION-CHECKIN] |
| 3.2  | [FR-3] [NFR-4]   | [DES-INTERACTION-CHECKIN] |
| 3.3  | [FR-4]           | [DES-CHECKLIST]           |

---

## Work Sessions

<!-- IMPORTANT: This section MUST remain the LAST section in tasks.md. Do not add content below it. -->

| Date | Task | Action | Files Modified | Agent | Human |
| ---- | ---- | ------ | -------------- | ----- | ----- |
