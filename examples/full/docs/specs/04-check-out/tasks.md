---
afx: true
type: TASKS
status: Approved
owner: "@agenticflowx"
version: "2.0"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:46:13.000Z"
tags: [roomledger, check-out, example]
spec: spec.md
design: design.md
---

# RoomLedger — Check-Out Comparison Tasks

> All code goes in shared files: markup in `src/index.html`, styles in `src/styles.css`, scripts in `src/app.js`.

## Task Numbering Convention

- **1.x** - Comparison Layout (HTML + CSS)
- **2.x** - Sign-Off Ledger (HTML + CSS)
- **3.x** - Interactions (JS)

---

## Phase 1: Comparison Layout

### 1.1 Build three-column check-out comparison

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/04-check-out/spec.md [FR-1] [FR-6] | docs/specs/04-check-out/design.md [DES-CHECKOUT-COMPARE] -->

- [ ] Add `.check-out-view` container inside `.main-content` (hidden by default, shown via nav)
- [ ] Add `.photo-compare` grid with `repeat(3, 1fr)` and `gap: 1rem`
- [ ] Card 1: Approved Baseline — photo placeholder, "Approved" chip (success)
- [ ] Card 2: Move-Out Retake — photo placeholder, "Captured" chip
- [ ] Card 3: Review Notes — summary text, "Raise dispute" button (danger), "Approve exit" button (success), status area
- [ ] Responsive: collapse to `1fr` at `<= 768px`

---

## Phase 2: Sign-Off Ledger

### 2.1 Build bilateral sign-off panels

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/04-check-out/spec.md [FR-4] [FR-6] | docs/specs/04-check-out/design.md [DES-SIGNOFF] -->

- [ ] Add 2-column grid (`1fr 1fr`, `gap: 1rem`) below comparison area
- [ ] Owner Sign-Off panel: title, status line ("Not yet signed"), body text, `3px` left border
- [ ] Renter Sign-Off panel: same structure
- [ ] Style 3 states: muted (not yet), success + checkmark (signed), danger + warning (disputed)
- [ ] Left border color matches state (muted/success/danger)
- [ ] Responsive: single column at `<= 768px`

### 2.2 Build completion message area

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/04-check-out/spec.md [FR-5] | docs/specs/04-check-out/design.md [DES-SIGNOFF] -->

- [ ] Add completion message container below sign-off panels (hidden by default)
- [ ] Text: "Both parties have signed off. Rental inspection complete."
- [ ] Style: accent-2 background, accent text, checkmark icon

---

## Phase 3: Interactions

### 3.1 Implement dispute action

<!-- files: src/app.js -->
<!-- @see docs/specs/04-check-out/spec.md [FR-2] [NFR-4] | docs/specs/04-check-out/design.md [DES-INTERACTION-CHECKOUT] -->

- [ ] State model: `ownerSignoff` and `renterSignoff` variables (null / "approved" / "disputed")
- [ ] Click "Raise dispute" → set current role's signoff to `"disputed"`
- [ ] Update review card: show "Dispute raised" chip (danger)
- [ ] Update current role's sign-off panel to "Disputed" state (danger border, warning icon)
- [ ] Disable both action buttons for the current role

### 3.2 Implement approve exit action

<!-- files: src/app.js -->
<!-- @see docs/specs/04-check-out/spec.md [FR-3] [NFR-4] | docs/specs/04-check-out/design.md [DES-INTERACTION-CHECKOUT] -->

- [ ] Click "Approve exit" → set current role's signoff to `"approved"`
- [ ] Update review card: show "Exit approved" chip (success)
- [ ] Update current role's sign-off panel to "Signed off" state (success border, checkmark)
- [ ] Disable both action buttons for the current role
- [ ] On role switch: restore button state if other role hasn't acted yet

### 3.3 Implement completion detection

<!-- files: src/app.js -->
<!-- @see docs/specs/04-check-out/spec.md [FR-5] [NFR-4] | docs/specs/04-check-out/design.md [DES-INTERACTION-CHECKOUT] -->

- [ ] After each signoff action: check if both roles show "approved"
- [ ] If both approved: show completion message
- [ ] If either disputed: no completion message (panels show the state)

---

## Implementation Flow

```
Phase 1: Comparison Layout (3-column grid, photo cards, responsive)
    ↓
Phase 2: Sign-Off Ledger (2-panel grid, 3 states, completion message)
    ↓
Phase 3: Interactions (dispute, approve, completion detection)
```

---

## Cross-Reference Index

| Task | Spec Requirement | Design Section             |
| ---- | ---------------- | -------------------------- |
| 1.1  | [FR-1] [FR-6]    | [DES-CHECKOUT-COMPARE]     |
| 2.1  | [FR-4] [FR-6]    | [DES-SIGNOFF]              |
| 2.2  | [FR-5]           | [DES-SIGNOFF]              |
| 3.1  | [FR-2] [NFR-4]   | [DES-INTERACTION-CHECKOUT] |
| 3.2  | [FR-3] [NFR-4]   | [DES-INTERACTION-CHECKOUT] |
| 3.3  | [FR-5] [NFR-4]   | [DES-INTERACTION-CHECKOUT] |

---

## Work Sessions

<!-- IMPORTANT: This section MUST remain the LAST section in tasks.md. Do not add content below it. -->

| Date | Task | Action | Files Modified | Agent | Human |
| ---- | ---- | ------ | -------------- | ----- | ----- |
