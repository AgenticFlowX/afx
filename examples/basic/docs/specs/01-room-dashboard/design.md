---
afx: true
type: DESIGN
status: Approved
owner: "@agenticflowx"
version: "1.0"
created_at: 2026-04-06T10:14:58.000Z
updated_at: 2026-04-06T10:14:58.000Z
tags: [roomledger, dashboard, example]
spec: spec.md
---

# RoomLedger — Room Dashboard Design

## [DES-LAYOUT] App Shell and Layout

The app uses a 2-column shell: a fixed `280px` sidebar on the left and a `1fr` flexible content area on the right.

```
┌──────────────────────┬────────────────────────────────────────────────────┐
│     SIDEBAR          │                MAIN CONTENT                       │
│     280px fixed      │                1fr flexible                       │
│                      │                                                   │
│  Brand               │  Top bar (title + actions)                        │
│  Login card          │  Hero section (2-col)                             │
│  Nav buttons         │  KPI row (4-col)                                  │
│  Notes               │  Content grid (2-col)                             │
│  Theme toggle        │                                                   │
└──────────────────────┴────────────────────────────────────────────────────┘
```

**CSS Grid:**

```css
.app-shell {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;
}
```

**Responsive breakpoints:**

| Breakpoint | Rule |
| --- | --- |
| `<= 900px` | App shell collapses to 1 column. Sidebar becomes a top section. |
| `<= 768px` | KPI row collapses from 4 columns to 2. Hero and content grid collapse to 1 column. |
| `<= 480px` | KPI row collapses to 1 column. All grids are single column. |

## [DES-HERO] Hero Section

Two-column grid inside a bordered panel: `grid-template-columns: 1.3fr 0.9fr`.

**Left card — Room identity:**

```
┌─────────────────────────────────────┐
│ [Room status: Occupied]  ← chip     │
│                                     │
│ Spare room #2 — Sandringham flat    │
│                                     │
│ This starter app focuses on one     │
│ room lifecycle: pre-check-in        │
│ evidence, in-stay issue history,    │
│ and exit comparison with owner      │
│ and renter approvals.               │
│                                     │
│ [Owner ✓] [Renter ✓] [Exit ⏳]     │
└─────────────────────────────────────┘
```

- Room status chip: `warning` color (orange) with `Occupied` text
- Approval chips: `success` color for approved, `warning` for pending
- Title: `h2`, `font-weight: 600`
- Description: `muted` text color, `font-size: 0.95rem`

**Right card — Workflow timeline:**

```
┌──────────────────────────────────┐
│ CURRENT WORKFLOW                 │
│                                  │
│ ● Before move-in captured        │
│   12 photos, signed by both      │
│                                  │
│ ● Window crack logged            │
│   Repair scheduled and attached  │
│                                  │
│ ● Move-out compare due           │
│   Retake matching angles...      │
└──────────────────────────────────┘
```

- Header: uppercase, `font-size: 0.75rem`, `letter-spacing: 0.05em`, `muted` color
- Each step: `accent` colored dot (`8px` circle), bold title, muted description below
- Vertical line connecting dots: `2px` solid `line` color

## [DES-KPI] KPI Row

Four equal-width cards in a single row: `grid-template-columns: repeat(4, 1fr)`.

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ BASELINE     │ ISSUES       │ REPAIRS      │ PENDING      │
│ PHOTOS       │ LOGGED       │ COMPLETED    │ APPROVALS    │
│     12       │     3        │     2        │     1        │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

- Label: uppercase, `font-size: 0.7rem`, `letter-spacing: 0.05em`, `muted` color
- Value: `font-size: 2rem`, `font-weight: 700`, `text` color
- Card: `surface` background, `line` border, `border-radius: 12px`, `padding: 1.25rem`
- Responsive: 2 columns at `<= 768px`, 1 column at `<= 480px`

## [DES-ROOM-CARD] Room Card

Inside the left column of the content grid. Contains a nested card with a 2-column internal layout: `grid-template-columns: 120px 1fr`.

```
┌─────────────────────────────────────────────┐
│ Rooms                                       │
│ Start with one room. You can later turn     │
│ this into a multi-property system.          │
│                                             │
│ ┌───────────────────────────────────────┐   │
│ │ ┌─────┬─────┐                        │   │
│ │ │Entry│Wndw │ [✓ In] [⏳ Out]        │   │
│ │ ├─────┼─────┤ Spare room #2          │   │
│ │ │Wrdb │Floor│                        │   │
│ │ └─────┴─────┘ Use the same named     │   │
│ │               photo angles...        │   │
│ │                                      │   │
│ │ [Open check-in] [Open compare]       │   │
│ └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

- Section header: `h3`, `font-weight: 600`
- Section description: `muted` color
- Thumbnail grid: `2x2` grid, each cell `56px x 56px`, `border-radius: 8px`, `surface-2` background, centered label text in `muted` color, `font-size: 0.7rem`
- Status chips: small rounded pills, `success` for complete, `warning` for waiting
- Room name: `font-weight: 600`
- Action buttons: secondary style (outlined), `border-radius: 8px`

## [DES-APPROVAL] Approval Snapshot

Inside the right column of the content grid.

```
┌──────────────────────────────────────────┐
│ Approval snapshot                        │
│ Different users see the same record      │
│ from different responsibility angles.    │
│                                          │
│ ┌──────────────────┬───────────────────┐ │
│ │ Owner            │ Renter            │ │
│ │ responsibility   │ responsibility    │ │
│ │                  │                   │ │
│ │ Prepare room,    │ Verify entry      │ │
│ │ capture baseline,│ condition, report │ │
│ │ log repairs,     │ damage during     │ │
│ │ approve          │ stay, approve     │ │
│ │ comparison.      │ exit result.      │ │
│ └──────────────────┴───────────────────┘ │
└──────────────────────────────────────────┘
```

- Section header: `h3`, `font-weight: 600`
- Notice boxes: `accent-2` background, `accent` left border (`3px` solid), `border-radius: 8px`, `padding: 1rem`
- Notice title: `font-weight: 600`, `accent` color
- Notice body: `text` color, `font-size: 0.9rem`
- Grid: `grid-template-columns: 1fr 1fr`, collapses to 1 column at `<= 768px`

## [DES-SIDEBAR] Sidebar

Four stacked zones, full height, `surface` background with `line` right border.

```
┌─────────────────────┐
│ 🏠 Room Rental       │  ← Brand header
│ Inspection           │
│ Starter UI for       │
│ owner + renter       │
├─────────────────────┤
│ SIMULATED LOGIN      │  ← Login card
│ ┌────────┬────────┐  │
│ │ Owner  │ Renter │  │
│ └────────┴────────┘  │
│ Owner: Maya          │
│ Renter: Jules        │
├─────────────────────┤
│ Dashboard         →  │  ← Nav stack
│ Check-in photos   →  │
│ Room history      →  │
│ Check-out compare →  │
├─────────────────────┤
│ PROTOTYPE NOTES      │  ← Notes
│ No database, no real │
│ auth, no uploads...  │
├─────────────────────┤
│ [Toggle theme]       │  ← Theme toggle
└─────────────────────┘
```

**Brand header:**
- Inline SVG logo: simple house icon, `24px`, `accent` color
- Product name: `font-weight: 700`, `font-size: 1rem`
- Subtitle: `muted` color, `font-size: 0.8rem`
- Padding: `1.5rem`

**Login card:**
- Background: `surface-2`
- Border-radius: `12px`
- Margin: `0 1rem`
- Padding: `1rem`
- Header: uppercase, `font-size: 0.7rem`, `letter-spacing: 0.05em`, `muted`
- Segmented control: 2 buttons, active uses `accent` background + white text, inactive uses `surface` background
- Identity chips: `owner` color for Owner, `renter` color for Renter, `font-size: 0.8rem`, `border-radius: 999px`, `padding: 0.25rem 0.75rem`

**Navigation stack:**
- Full-width buttons, `padding: 0.75rem 1rem`
- Active: `accent-2` background, `accent` text, `font-weight: 600`
- Inactive: transparent background, `text` color
- Arrow icon: `→` on the right side
- Border-radius: `8px`
- Margin: `0 0.75rem`, gap: `0.25rem`

**Prototype notes:**
- Background: `surface-2`
- Border-radius: `12px`
- Padding: `1rem`
- Header: uppercase, `font-size: 0.7rem`, `muted`
- Body: `muted` color, `font-size: 0.85rem`

**Theme toggle:**
- Full-width button, `padding: 0.75rem`
- `surface-2` background, `line` border
- `border-radius: 8px`
- Margin: `0.75rem 1rem 1.5rem`

## [DES-TOPBAR] Top Bar

Horizontal bar at the top of the main content area.

```
┌────────────────────────────────────────────────────────────────┐
│ Dashboard                    [Quick approve] [Add repair event]│
│ Viewing as owner. You can prepare the room...                  │
└────────────────────────────────────────────────────────────────┘
```

- Title: `h1`, `font-size: 1.75rem`, `font-weight: 700`
- Description: `muted` color, `font-size: 0.95rem`
- Layout: `display: flex; justify-content: space-between; align-items: flex-start`
- Action buttons container: `display: flex; gap: 0.5rem`
- "Quick approve": primary button (`accent` background, white text)
- "Add repair event": secondary button (`surface` background, `line` border, `text` color)
- Padding: `1.5rem 2rem`
- Responsive `<= 768px`: stack vertically, buttons below title

## [DES-THEME] Theme System

All colors are defined as CSS custom properties on `:root` (light) and `[data-theme="dark"]`.

```css
:root {
  --bg: #f5f3ef;
  --surface: #fcfbf8;
  --surface-2: #f0ede6;
  --line: #ddd8cf;
  --text: #1e1c18;
  --muted: #6c675d;
  --accent: #0f766e;
  --accent-2: #dff3ef;
  --warning: #b45309;
  --danger: #b42318;
  --success: #2f6f3e;
  --owner: #155eef;
  --renter: #7c3aed;
}

[data-theme="dark"] {
  --bg: #151412;
  --surface: #1d1b18;
  --surface-2: #26231f;
  --line: #36322c;
  --text: #f3efe6;
  --muted: #b3ac9d;
  --accent: #53b5aa;
  --accent-2: #203736;
  --warning: #f59e0b;
  --danger: #f97066;
  --success: #6fcf97;
  --owner: #7db0ff;
  --renter: #bf8bff;
}
```

**Toggle behavior:**
- Click "Toggle theme" button → toggle `data-theme` attribute on `<html>` between absent (light) and `"dark"`
- Persist to `localStorage` key `roomledger-theme`
- On page load, read from `localStorage` and apply before first paint

## [DES-COLOR] Color Tokens

### Light Theme

| Token | Value | Usage |
| --- | --- | --- |
| Background | `#f5f3ef` | Main page background |
| Surface | `#fcfbf8` | Cards, panels |
| Surface 2 | `#f0ede6` | Nested surfaces, subtle contrast |
| Line | `#ddd8cf` | Borders, dividers |
| Text | `#1e1c18` | Primary text |
| Muted | `#6c675d` | Secondary text, labels |
| Accent | `#0f766e` | CTAs, active states, teal |
| Accent 2 | `#dff3ef` | Accent-tinted backgrounds |
| Warning | `#b45309` | Pending states |
| Danger | `#b42318` | Disputes, damage alerts |
| Success | `#2f6f3e` | Approved, completed |
| Owner | `#155eef` | Owner identity chip |
| Renter | `#7c3aed` | Renter identity chip |

### Dark Theme

| Token | Value | Usage |
| --- | --- | --- |
| Background | `#151412` | Main page background |
| Surface | `#1d1b18` | Cards, panels |
| Surface 2 | `#26231f` | Nested surfaces |
| Line | `#36322c` | Borders, dividers |
| Text | `#f3efe6` | Primary text |
| Muted | `#b3ac9d` | Secondary text |
| Accent | `#53b5aa` | CTAs, active states |
| Accent 2 | `#203736` | Accent-tinted backgrounds |
| Warning | `#f59e0b` | Pending states |
| Danger | `#f97066` | Disputes, damage alerts |
| Success | `#6fcf97` | Approved, completed |
| Owner | `#7db0ff` | Owner identity chip |
| Renter | `#bf8bff` | Renter identity chip |

### Color Usage Rules

- Accent (teal) is reserved for CTAs, active navigation, and approval actions
- Owner and Renter colors are only used for identity chips and labels, not large surfaces
- Warning, Danger, Success are semantic-only — used for status chips, not decorative elements
- Neutral surfaces (`bg`, `surface`, `surface-2`) do the visual work; color directs attention

## [DES-TYPOGRAPHY] Typography and Spacing

**Font:** `Inter, system-ui, -apple-system, sans-serif`

| Element | Size | Weight | Color |
| --- | --- | --- | --- |
| Page title (h1) | `1.75rem` | 700 | `text` |
| Section header (h2) | `1.25rem` | 600 | `text` |
| Card title (h3) | `1.1rem` | 600 | `text` |
| Body text | `0.95rem` | 400 | `text` |
| Secondary text | `0.9rem` | 400 | `muted` |
| Label / uppercase | `0.7rem` | 600 | `muted` |
| KPI value | `2rem` | 700 | `text` |
| Chip text | `0.8rem` | 500 | varies |

**Spacing conventions:**

| Token | Value | Usage |
| --- | --- | --- |
| Card padding | `1.25rem` | Internal card padding |
| Card gap | `1rem` | Gap between cards |
| Section gap | `1.5rem` | Gap between major sections |
| Border radius (cards) | `12px` | All cards and panels |
| Border radius (buttons) | `8px` | Buttons and inputs |
| Border radius (chips) | `999px` | Fully rounded pills |
| Sidebar padding | `1.5rem` | Top/bottom sidebar padding |
| Content padding | `1.5rem 2rem` | Main content area padding |

## [DES-INTERACTION] Interaction Design

**Role switching:**
- Click Owner or Renter segment in the sidebar login card
- Active segment gets `accent` background + white text
- Top bar description updates: "Viewing as owner..." or "Viewing as renter..."
- Role stored in JS variable, used to determine which approval actions apply

**Theme toggle:**
- Click "Toggle theme" button in sidebar
- Toggles `data-theme="dark"` on `<html>`
- All CSS custom properties update instantly
- Preference saved to `localStorage`

**Navigation:**
- Click a nav button in sidebar to show the corresponding view
- Active button gets `accent-2` background + `accent` text
- All views are in the same DOM, toggled via `display: none` / `display: block`
- Only Dashboard view is implemented in the basic example; other nav buttons are visible but disabled

**"Quick approve" button:**
- Optimistic: immediately updates the next pending approval chip to success state
- No confirmation dialog (prototype behavior)

**"Add repair event" button:**
- Navigates to Room History view (or shows a message if that view is not yet implemented)

**General button states:**
- Primary: `accent` background, white text. Hover: slightly darker.
- Secondary: `surface` background, `line` border, `text` color. Hover: `surface-2` background.
- Disabled: `opacity: 0.5`, `cursor: not-allowed`
