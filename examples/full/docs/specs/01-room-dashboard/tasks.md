---
afx: true
type: TASKS
status: Approved
owner: "@agenticflowx"
version: "2.0"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:11:06.000Z"
tags: [roomledger, dashboard, example]
spec: spec.md
design: design.md
---

# RoomLedger — Room Dashboard Tasks

> Styles in `src/styles.css`, scripts in `src/app.js`, markup in `src/index.html`.

## Task Numbering Convention

- **1.x** - Foundation (HTML structure, CSS tokens, base styles)
- **2.x** - Sidebar (brand, login, nav, notes, theme toggle)
- **3.x** - Main Content (top bar, hero, KPI, room card, approval)
- **4.x** - Interactivity (theme, role switching, navigation, quick approve)
- **5.x** - Responsive Layout (breakpoints)

---

## Phase 1: Foundation

### 1.1 Create HTML document with external style/script links

<!-- files: src/index.html -->
<!-- @see docs/specs/01-room-dashboard/spec.md [NFR-1] | docs/specs/01-room-dashboard/design.md [DES-LAYOUT] -->

- [ ] Create `src/index.html` with doctype, charset, viewport meta
- [ ] Add `<link rel="stylesheet" href="styles.css">` and `<script src="app.js" defer></script>`
- [ ] Add `.app-shell` container with `.sidebar` and `.main-content` children
- [ ] Add 4 empty view containers inside `.main-content` (dashboard, check-in, room-history, check-out) — only dashboard visible by default

### 1.2 Define CSS custom properties and base reset

<!-- files: src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/design.md [DES-THEME] [DES-COLOR] [DES-TYPOGRAPHY] -->

- [ ] Define all 13 color tokens on `:root` (light theme) per DES-COLOR
- [ ] Define all 13 color tokens on `[data-theme="dark"]` per DES-COLOR
- [ ] Add base reset (box-sizing, margin, font-family: Inter/system-ui)
- [ ] Add typography scale per DES-TYPOGRAPHY
- [ ] Add spacing tokens per DES-TYPOGRAPHY
- [ ] Add app shell grid: `grid-template-columns: 280px 1fr; min-height: 100vh`

---

## Phase 2: Sidebar

### 2.1 Build brand header

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-7] | docs/specs/01-room-dashboard/design.md [DES-SIDEBAR] -->

- [ ] Add inline SVG house icon (24px, accent color)
- [ ] Add product name ("Room Rental Inspection") and subtitle
- [ ] Style with padding `1.5rem`, font-weight 700

### 2.2 Build simulated login card

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-7] [FR-8] | docs/specs/01-room-dashboard/design.md [DES-SIDEBAR] -->

- [ ] Add login card container (surface-2 background, 12px radius)
- [ ] Add uppercase "SIMULATED LOGIN" header
- [ ] Add Owner/Renter segmented toggle (2 buttons)
- [ ] Style active segment: accent background + white text
- [ ] Add identity chips: "Owner: Maya" (owner color), "Renter: Jules" (renter color)

### 2.3 Build navigation stack

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-7] | docs/specs/01-room-dashboard/design.md [DES-SIDEBAR] -->

- [ ] Add 4 full-width nav buttons: Dashboard, Check-in photos, Room history, Check-out compare
- [ ] Add arrow icon (→) on the right side of each button
- [ ] Style active button: accent-2 background, accent text, font-weight 600
- [ ] Style inactive: transparent background, text color
- [ ] Set "Dashboard" as active by default

### 2.4 Build prototype notes and theme toggle

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-6] [FR-7] | docs/specs/01-room-dashboard/design.md [DES-SIDEBAR] -->

- [ ] Add prototype notes card (surface-2 background, muted text)
- [ ] Add "Toggle theme" button (full-width, surface-2 background, line border, 8px radius)

---

## Phase 3: Main Content

### 3.1 Build top bar

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-9] | docs/specs/01-room-dashboard/design.md [DES-TOPBAR] -->

- [ ] Add top bar with flex layout (space-between)
- [ ] Add page title h1 ("Dashboard") and role-sensitive description line
- [ ] Add "Quick approve current step" button (primary style)
- [ ] Add "Add repair event" button (secondary style)
- [ ] Style with padding `1.5rem 2rem`

### 3.2 Build hero section

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-1] | docs/specs/01-room-dashboard/design.md [DES-HERO] -->

- [ ] Add hero panel with 2-column grid (`1.3fr 0.9fr`)
- [ ] Left card: room status chip ("Occupied", warning color), room name/address, description, 3 approval chips (Owner ✓, Renter ✓, Exit ⏳)
- [ ] Right card: "CURRENT WORKFLOW" header (uppercase, 0.75rem), 3 timeline steps with accent dots, vertical connecting line (2px solid)
- [ ] Style per DES-HERO: bold title, muted description, chip colors

### 3.3 Build KPI row

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-2] | docs/specs/01-room-dashboard/design.md [DES-KPI] -->

- [ ] Add 4 metric cards in `repeat(4, 1fr)` grid
- [ ] Cards: Baseline Photos (12), Issues Logged (3), Repairs Completed (2), Pending Approvals (1)
- [ ] Style labels: uppercase, 0.7rem, muted color
- [ ] Style values: 2rem, font-weight 700
- [ ] Style cards: surface background, line border, 12px radius, 1.25rem padding

### 3.4 Build room card

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-3] | docs/specs/01-room-dashboard/design.md [DES-ROOM-CARD] -->

- [ ] Add "Rooms" section header with description
- [ ] Add room card with 2-column internal layout (`120px 1fr`)
- [ ] Left: 2x2 thumbnail grid (Entry wall, Window side, Wardrobe, Flooring) — 56px cells, surface-2 background, centered labels
- [ ] Right: status chips (✓ In, ⏳ Out), room name, guidance note
- [ ] Add two action buttons: "Open check-in" and "Open compare" (secondary style)

### 3.5 Build approval snapshot

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-4] | docs/specs/01-room-dashboard/design.md [DES-APPROVAL] -->

- [ ] Add "Approval snapshot" section header with description
- [ ] Add 2-column grid (`1fr 1fr`) with Owner and Renter notice boxes
- [ ] Style notice boxes: accent-2 background, 3px solid accent left border, 8px radius
- [ ] Owner: "Prepare room, capture baseline, log repairs, approve comparison"
- [ ] Renter: "Verify entry condition, report damage during stay, approve exit result"

---

## Phase 4: Interactivity

### 4.1 Implement theme toggle

<!-- files: src/app.js -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-6] [NFR-4] | docs/specs/01-room-dashboard/design.md [DES-THEME] [DES-INTERACTION] -->

- [ ] On page load: read `localStorage` key `roomledger-theme`, apply `data-theme` before first paint
- [ ] Click handler: toggle `data-theme` on `<html>` between absent (light) and `"dark"`
- [ ] Persist preference to `localStorage`
- [ ] Fallback: if `localStorage` unavailable, default to light theme silently

### 4.2 Implement role switching

<!-- files: src/app.js -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-8] [NFR-4] | docs/specs/01-room-dashboard/design.md [DES-INTERACTION] -->

- [ ] Click handler on Owner/Renter segmented toggle
- [ ] Update active segment style (accent background + white text)
- [ ] Update top bar description: "Viewing as owner..." / "Viewing as renter..."
- [ ] Store active role in JS variable

### 4.3 Implement view navigation

<!-- files: src/app.js -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-7] | docs/specs/01-room-dashboard/design.md [DES-INTERACTION] -->

- [ ] Click handlers on 4 nav buttons
- [ ] Show/hide view containers via `display: none` / `display: block`
- [ ] Update active nav button styling (accent-2 background, accent text)
- [ ] Only one view visible at a time

### 4.4 Implement quick approve button

<!-- files: src/app.js -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-9] | docs/specs/01-room-dashboard/design.md [DES-INTERACTION] -->

- [ ] Click handler: update next pending approval chip to success state
- [ ] When no approvals pending: show brief visual feedback (no-op toast or chip flash)

---

## Phase 5: Responsive Layout

### 5.1 Add responsive breakpoints

<!-- files: src/styles.css -->
<!-- @see docs/specs/01-room-dashboard/spec.md [FR-5] [NFR-2] | docs/specs/01-room-dashboard/design.md [DES-LAYOUT] -->

- [ ] `<= 900px`: App shell collapses to 1 column, sidebar becomes top section
- [ ] `<= 768px`: KPI row to 2 columns, hero and content grid to 1 column, top bar stacks vertically
- [ ] `<= 480px`: KPI row to 1 column, all grids single column
- [ ] Below 320px: single-column layout maintained, horizontal scroll as last resort

---

## Implementation Flow

```
Phase 1: Foundation (HTML, CSS tokens, app shell)
    ↓
Phase 2: Sidebar (brand, login, nav, notes, theme)
    ↓
Phase 3: Main Content (top bar, hero, KPI, room card, approval)
    ↓
Phase 4: Interactivity (theme toggle, role switch, nav, quick approve)
    ↓
Phase 5: Responsive Layout (breakpoints)
```

---

## Cross-Reference Index

| Task | Spec Requirement | Design Section                           |
| ---- | ---------------- | ---------------------------------------- |
| 1.1  | [NFR-1]          | [DES-LAYOUT]                             |
| 1.2  | [NFR-1]          | [DES-THEME] [DES-COLOR] [DES-TYPOGRAPHY] |
| 2.1  | [FR-7]           | [DES-SIDEBAR]                            |
| 2.2  | [FR-7] [FR-8]    | [DES-SIDEBAR]                            |
| 2.3  | [FR-7]           | [DES-SIDEBAR]                            |
| 2.4  | [FR-6] [FR-7]    | [DES-SIDEBAR]                            |
| 3.1  | [FR-9]           | [DES-TOPBAR]                             |
| 3.2  | [FR-1]           | [DES-HERO]                               |
| 3.3  | [FR-2]           | [DES-KPI]                                |
| 3.4  | [FR-3]           | [DES-ROOM-CARD]                          |
| 3.5  | [FR-4]           | [DES-APPROVAL]                           |
| 4.1  | [FR-6] [NFR-4]   | [DES-THEME] [DES-INTERACTION]            |
| 4.2  | [FR-8] [NFR-4]   | [DES-INTERACTION]                        |
| 4.3  | [FR-7]           | [DES-INTERACTION]                        |
| 4.4  | [FR-9]           | [DES-INTERACTION]                        |
| 5.1  | [FR-5] [NFR-2]   | [DES-LAYOUT]                             |

---

## Work Sessions

<!-- IMPORTANT: This section MUST remain the LAST section in tasks.md. Do not add content below it. -->

| Date | Task | Action | Files Modified | Agent | Human |
| ---- | ---- | ------ | -------------- | ----- | ----- |
