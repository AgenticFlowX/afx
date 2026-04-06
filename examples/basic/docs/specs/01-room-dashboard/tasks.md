---
afx: true
type: TASKS
status: Approved
owner: "@agenticflowx"
version: "1.0"
created_at: 2026-04-06T10:14:58.000Z
updated_at: 2026-04-06T10:14:58.000Z
tags: [roomledger, dashboard, example]
spec: spec.md
design: design.md
---

# RoomLedger — Room Dashboard Tasks

## Phase 1: Foundation — HTML Structure and Theme System

### 1.1 Create HTML document structure

- **Covers:** FR-5, FR-7, NFR-1
- **File:** `src/index.html`
- **What:** Replace the scaffold with a complete HTML document. Add `<!DOCTYPE html>`, `<html lang="en">`, `<head>` with meta viewport, page title "RoomLedger", and Inter font via `@import` in an embedded `<style>`. Add `<body>` with a single `.app-shell` div containing `.sidebar` and `.main-content` sections.
- **Spec:** `@see docs/specs/01-room-dashboard/spec.md [FR-5] [FR-7]`
- **Acceptance:**
  - [ ] Page loads with no external JS/CSS dependencies (Inter font is the only external resource)
  - [ ] `.app-shell` renders as a 2-column grid: `280px` sidebar + `1fr` content
  - [ ] At `<= 900px` viewport, layout collapses to single column

### 1.2 Implement CSS custom properties and theme system

- **Covers:** FR-6, DES-THEME, DES-COLOR
- **File:** `src/index.html` (embedded `<style>`)
- **What:** Define all 13 color tokens as CSS custom properties on `:root` (light theme values) and `[data-theme="dark"]` (dark theme values). See `design.md [DES-COLOR]` for exact hex values. Add base styles: `body { background: var(--bg); color: var(--text); font-family: Inter, system-ui, sans-serif; margin: 0; }`.
- **Acceptance:**
  - [ ] All color tokens from DES-COLOR are defined as CSS custom properties
  - [ ] Adding `data-theme="dark"` to `<html>` switches all colors
  - [ ] Body uses `--bg` background and `--text` foreground

### 1.3 Implement theme toggle JavaScript

- **Covers:** FR-6, DES-INTERACTION
- **File:** `src/index.html` (embedded `<script>`)
- **What:** Add a `<script>` at end of body. On load: read `localStorage.getItem('roomledger-theme')`, if `'dark'` set `document.documentElement.dataset.theme = 'dark'`. Add click handler to `.theme-toggle` button that toggles the attribute and saves to localStorage.
- **Acceptance:**
  - [ ] Clicking "Toggle theme" switches between light and dark
  - [ ] Preference persists across page refresh
  - [ ] Theme is applied before first paint (script runs synchronously)

## Phase 2: Sidebar

### 2.1 Build sidebar brand header

- **Covers:** FR-7, DES-SIDEBAR
- **File:** `src/index.html`
- **What:** Inside `.sidebar`, add a `.brand` div with an inline SVG house icon (24px, `var(--accent)` color) and a text block: "Room Rental Inspection" (bold) + "Starter UI for owner + renter" (muted). Style per DES-SIDEBAR brand header specs.
- **Acceptance:**
  - [ ] SVG icon renders in accent color
  - [ ] Product name is bold, subtitle is muted

### 2.2 Build simulated login card

- **Covers:** FR-7, FR-8, DES-SIDEBAR
- **File:** `src/index.html`
- **What:** Add a `.login-card` with "SIMULATED LOGIN" uppercase header, a `.segmented-control` with two buttons ("Owner" active, "Renter" inactive), and two identity chips: "Owner: Maya" in `--owner` color, "Renter: Jules" in `--renter` color. Style per DES-SIDEBAR login card specs.
- **Acceptance:**
  - [ ] Active segment shows accent background with white text
  - [ ] Identity chips use correct role colors
  - [ ] Card has `surface-2` background with `12px` border-radius

### 2.3 Build navigation stack

- **Covers:** FR-7, DES-SIDEBAR
- **File:** `src/index.html`
- **What:** Add 4 `.nav-btn` buttons: "Dashboard" (active), "Check-in photos", "Room history", "Check-out compare". Each has text on the left and `→` on the right. Active button uses `accent-2` background + `accent` text. Non-dashboard buttons are visually disabled (`opacity: 0.5`, `cursor: not-allowed`) since only the dashboard is implemented.
- **Acceptance:**
  - [ ] Dashboard button shows active styling
  - [ ] Other buttons are visually disabled
  - [ ] Buttons are full-width with arrow on right

### 2.4 Build prototype notes and theme toggle

- **Covers:** FR-7, FR-6, DES-SIDEBAR
- **File:** `src/index.html`
- **What:** Add a `.proto-notes` card with "PROTOTYPE NOTES" header and body text: "No database, no real auth, no uploads. Everything here is simulated so you can evolve the flows first." Add a `.theme-toggle` button below: "Toggle theme". Style per DES-SIDEBAR.
- **Acceptance:**
  - [ ] Notes card has `surface-2` background
  - [ ] Theme toggle button is full-width, styled as secondary button

## Phase 3: Top Bar and Hero

### 3.1 Build top bar

- **Covers:** FR-9, DES-TOPBAR
- **File:** `src/index.html`
- **What:** Inside `.main-content`, add a `.top-bar` with `h1` "Dashboard", a `.role-description` paragraph ("Viewing as owner. You can prepare the room, compare photos, approve states, and track damage history."), and two action buttons: "Quick approve current step" (primary) and "Add repair event" (secondary). Layout with flexbox per DES-TOPBAR.
- **Acceptance:**
  - [ ] Title and description display correctly
  - [ ] Primary button uses accent background, secondary uses surface background with border
  - [ ] At `<= 768px`, buttons stack below the title

### 3.2 Build hero section

- **Covers:** FR-1, DES-HERO
- **File:** `src/index.html`
- **What:** Add a `.hero` panel with 2-column grid (`1.3fr 0.9fr`). Left card: `.room-status` chip ("Room status: Occupied" in warning color), `h2` room name, description paragraph, 3 approval chips. Right card: "CURRENT WORKFLOW" uppercase header, 3 timeline steps each with accent-colored dot, bold title, and muted description. Style per DES-HERO.
- **Acceptance:**
  - [ ] Room status chip shows in warning/orange color
  - [ ] Two approved chips are green (success), exit chip is orange (warning)
  - [ ] Workflow timeline has vertical dots with connecting line
  - [ ] At `<= 768px`, hero collapses to single column

## Phase 4: KPI Row and Content Grid

### 4.1 Build KPI row

- **Covers:** FR-2, DES-KPI
- **File:** `src/index.html`
- **What:** Add a `.kpi-row` grid with 4 `.kpi-card` elements. Each card has an uppercase label and a large numeric value. Values: Baseline Photos = 12, Issues Logged = 3, Repairs Completed = 2, Pending Approvals = 1. Style per DES-KPI.
- **Acceptance:**
  - [ ] 4 cards render in a single row on desktop
  - [ ] Labels are uppercase, muted; values are large and bold
  - [ ] At `<= 768px`, 2 columns. At `<= 480px`, 1 column.

### 4.2 Build room card

- **Covers:** FR-3, DES-ROOM-CARD
- **File:** `src/index.html`
- **What:** Add the left column of `.content-grid` (grid `1.25fr 0.95fr`). Contains a "Rooms" section header, description, and a nested room card. The room card has a 2x2 thumbnail grid (each `56px` with labels: Entry wall, Window side, Wardrobe, Flooring), status chips, room name, guidance text, and 2 action buttons. Style per DES-ROOM-CARD.
- **Acceptance:**
  - [ ] Thumbnail grid renders as 2x2
  - [ ] Check-in chip is green (success), check-out chip is orange (warning)
  - [ ] Action buttons are secondary style

### 4.3 Build approval snapshot

- **Covers:** FR-4, DES-APPROVAL
- **File:** `src/index.html`
- **What:** Add the right column of `.content-grid`. Contains "Approval snapshot" header, description line, and 2 side-by-side `.notice-box` elements. Owner notice: title "Owner responsibility", body text. Renter notice: title "Renter responsibility", body text. Style per DES-APPROVAL.
- **Acceptance:**
  - [ ] Two notice boxes render side by side on desktop
  - [ ] Notice boxes use accent-2 background with accent left border
  - [ ] At `<= 768px`, notices stack vertically

## Phase 5: Role Switching and Polish

### 5.1 Implement role switching JavaScript

- **Covers:** FR-8, DES-INTERACTION
- **File:** `src/index.html` (embedded `<script>`)
- **What:** Add click handlers to the segmented control buttons. Clicking "Owner" or "Renter" updates the active segment styling and changes `.role-description` text. Owner text: "Viewing as owner. You can prepare the room, compare photos, approve states, and track damage history." Renter text: "Viewing as renter. You can verify room condition, report issues during your stay, and approve the exit comparison."
- **Acceptance:**
  - [ ] Clicking Owner/Renter toggles the active segment
  - [ ] Description text updates to match the selected role
  - [ ] Active segment has accent background, inactive has surface background

### 5.2 Final responsive and accessibility pass

- **Covers:** FR-5, NFR-2, NFR-3
- **File:** `src/index.html`
- **What:** Verify all responsive breakpoints work correctly. Ensure all interactive elements use `<button>` elements (not divs). Add `aria-label` to the theme toggle and SVG icon. Verify color contrast meets WCAG AA in both themes. Test at 320px, 768px, 900px, and 1440px widths.
- **Acceptance:**
  - [ ] No layout overflow at 320px
  - [ ] All buttons are keyboard-focusable
  - [ ] SVG has `aria-hidden="true"` and adjacent text provides meaning
  - [ ] Contrast ratio >= 4.5:1 for all text in both themes

## Work Sessions

| Date | Task | Agent | Human |
| ---- | ---- | ----- | ----- |
