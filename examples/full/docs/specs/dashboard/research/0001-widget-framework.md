---
afx: true
type: RES
status: Accepted
owner: "@rix"
version: "1.0"
created_at: "2026-03-11T11:00:00.000Z"
updated_at: "2026-03-11T11:00:00.000Z"
tags: [research, dashboard, ui, widgets]
---

# Research: Widget Framework Evaluation

## Question

Which approach should we use for the dashboard widget system — a third-party grid library or a custom CSS Grid implementation?

## Options Evaluated

### Option A: react-grid-layout

- Mature library with drag-and-drop, resize, and responsive breakpoints
- 2.5KB gzipped, actively maintained
- Used by Grafana, Netlify
- **Concern**: Adds a dependency for something achievable with CSS Grid + a small drag handler

### Option B: Custom CSS Grid + dnd-kit

- CSS Grid for layout (native, zero dependencies)
- dnd-kit for drag-and-drop (already used in the Board feature)
- Full control over rendering, no layout library constraints
- **Concern**: More implementation effort upfront

### Option C: Tailwind CSS Grid only (no drag)

- Simplest approach — static grid, no reordering
- Ship faster, add drag later
- **Concern**: Doesn't meet the "widget customization" user story

## Decision

**Option B** — Custom CSS Grid + dnd-kit.

## Rationale

- We already depend on dnd-kit for the kanban Board feature, so no new dependency
- CSS Grid gives us exact control over responsive breakpoints and column spans
- Avoids react-grid-layout's opinionated DOM structure which conflicts with our shadcn/ui components
- The implementation effort is manageable since dnd-kit handles the hard parts (drag preview, collision detection, keyboard support)

## Follow-up

- Implement widget registry pattern (see design.md#widget-types)
- Use CSS Grid `grid-template-columns: repeat(4, 1fr)` for the 4-column layout
