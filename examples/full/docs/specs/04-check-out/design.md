---
afx: true
type: DESIGN
status: Approved
owner: "@agenticflowx"
version: "1.1"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:41:17.000Z"
tags: [roomledger, check-out, example]
spec: spec.md
---

# RoomLedger — Check-Out Comparison Design

## [DES-CHECKOUT-COMPARE] Comparison Layout

<!-- @see spec.md [FR-1] [FR-6] [NFR-2] -->

Mirrors the check-in comparison structure. Three equal-width cards: `grid-template-columns: repeat(3, 1fr)`, `gap: 1rem`.

```
┌──────────────────┬──────────────────┬──────────────────┐
│ Approved         │ Move-Out         │ Review Notes     │
│ Baseline         │ Retake           │                  │
│                  │                  │                  │
│ ┌──────────────┐ │ ┌──────────────┐ │ Compare the      │
│ │  Baseline    │ │ │  Move-out    │ │ baseline with    │
│ │  photo       │ │ │  photo       │ │ the retake.      │
│ └──────────────┘ │ └──────────────┘ │                  │
│ [Approved] ✓     │ [Captured] ✓     │ [Raise dispute]  │
│                  │                  │ [Approve exit]   │
└──────────────────┴──────────────────┴──────────────────┘
```

**Card styling:** Same as check-in photo cards (see `02-check-in/design.md [DES-COMPARE]`).

- "Raise dispute" button: `danger` background, white text
- "Approve exit" button: `success` background, white text
- Result status: shows "Exit approved" (success) or "Dispute raised" (danger) after action

**Responsive:** Same as check-in — single column at `<= 768px`.

## [DES-SIGNOFF] Bilateral Sign-Off Ledger

<!-- @see spec.md [FR-4] [FR-5] [FR-6] -->

Below the comparison area. Two equal-width notice panels: `grid-template-columns: 1fr 1fr`, `gap: 1rem`.

```
┌──────────────────────────┬──────────────────────────┐
│ Owner Sign-Off           │ Renter Sign-Off          │
│                          │                          │
│ Status: Not yet signed   │ Status: Not yet signed   │
│                          │                          │
│ The owner must review    │ The renter must review   │
│ the comparison and       │ the comparison and       │
│ approve or dispute.      │ approve or dispute.      │
└──────────────────────────┴──────────────────────────┘
```

**Panel states** — each panel renders one of 3 visual states:

```
State: Not yet signed
┌─────────────────────────┐
│▌ Owner Sign-Off         │   ← muted left border (3px)
│▌                        │
│▌ Status: Not yet signed │   ← muted color
│▌                        │
│▌ The owner must review  │   ← muted body text
│▌ the comparison and     │
│▌ approve or dispute.    │
└─────────────────────────┘

State: Signed off
┌─────────────────────────┐
│▊ Owner Sign-Off         │   ← success left border (3px)
│▊                        │
│▊ ✓ Signed off           │   ← success color + checkmark
│▊                        │
│▊ The owner has reviewed │
│▊ and approved the exit  │
│▊ comparison.            │
└─────────────────────────┘

State: Disputed
┌─────────────────────────┐
│▊ Owner Sign-Off         │   ← danger left border (3px)
│▊                        │
│▊ ⚠ Disputed             │   ← danger color + warning icon
│▊                        │
│▊ The owner has raised a │
│▊ dispute on the exit    │
│▊ comparison.            │
└─────────────────────────┘
```

**Styling:**

- Panel: `surface` background, `line` border, `border-radius: 12px`, `padding: 1.25rem`
- Title: `font-weight: 600`
- Status line: `font-weight: 500`
- Body text: `muted` color, `font-size: 0.9rem`
- Left border: `3px` solid — `muted` (unsigned), `success` (signed), `danger` (disputed)
- Responsive: single column at `<= 768px`

## [DES-INTERACTION-CHECKOUT] Interaction Design

<!-- @see spec.md [FR-2] [FR-3] [FR-5] [NFR-4] -->

**State model:** Two independent JS variables per role (`ownerSignoff`, `renterSignoff`) each holding one of 3 states: `null` (not yet), `"approved"`, or `"disputed"`.

**Raise dispute** — active role clicks "Raise dispute":

```
Before:                              After:
┌──────────────────┐                 ┌──────────────────┐
│ Review Notes     │                 │ Review Notes     │
│                  │                 │                  │
│ Compare the      │                 │ [Dispute raised] │  ← danger chip
│ baseline with    │                 │                  │
│ the retake.      │                 │ Compare the      │
│                  │                 │ baseline with    │
│ [Raise dispute]  │  ← enabled      │ the retake.      │
│ [Approve exit]   │  ← enabled      │                  │
│                  │                 │ [Raise dispute]  │  ← disabled
└──────────────────┘                 │ [Approve exit]   │  ← disabled
                                     └──────────────────┘
```

- Updates the current role's sign-off panel to "Disputed"
- Both action buttons disable for the current role

**Approve exit** — active role clicks "Approve exit":

```
Before:                              After:
┌──────────────────┐                 ┌──────────────────┐
│ Review Notes     │                 │ Review Notes     │
│                  │                 │                  │
│ Compare the      │                 │ [Exit approved]  │  ← success chip
│ baseline with    │                 │                  │
│ the retake.      │                 │ Compare the      │
│                  │                 │ baseline with    │
│ [Raise dispute]  │  ← enabled      │ the retake.      │
│ [Approve exit]   │  ← enabled      │                  │
│                  │                 │ [Raise dispute]  │  ← disabled
└──────────────────┘                 │ [Approve exit]   │  ← disabled
                                     └──────────────────┘
```

- Updates only the current role's sign-off panel to "Signed off"
- Both action buttons disable for the current role
- Switching roles shows buttons enabled again (if that role hasn't acted yet)

**Completion — both roles signed off:**

```
┌──────────────────────────┬──────────────────────────┐
│▊ Owner Sign-Off          │▊ Renter Sign-Off         │
│▊ ✓ Signed off            │▊ ✓ Signed off            │
└──────────────────────────┴──────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ ✓ Both parties have signed off.                        │  ← success background
│   Rental inspection complete.                          │     (accent-2 bg, accent text)
└────────────────────────────────────────────────────────┘
```

**Mixed state — one approves, one disputes:**

```
┌──────────────────────────┬──────────────────────────┐
│▊ Owner Sign-Off          │▊ Renter Sign-Off         │
│▊ ✓ Signed off            │▊ ⚠ Disputed              │
└──────────────────────────┴──────────────────────────┘

(no completion message — panels show the state)
```

**Role independence walkthrough:**

```
Step 1: Owner clicks "Approve exit"
  Owner panel  → ✓ Signed off
  Renter panel → Not yet signed
  Buttons      → disabled (owner view)

Step 2: Switch to Renter role
  Buttons      → enabled (renter hasn't acted)

Step 3: Renter clicks "Approve exit"
  Renter panel → ✓ Signed off
  Buttons      → disabled (renter view)
  Completion   → "Both parties have signed off..."
```
