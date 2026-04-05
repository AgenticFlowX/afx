---
afx: true
type: TASKS
status: Living
owner: "@rix"
version: "1.0"
created_at: "2026-03-12T09:00:00.000Z"
updated_at: "2026-03-13T09:00:00.000Z"
tags: [dashboard, ui, mvp]
spec: spec.md
design: design.md
---

# Dashboard - Implementation Tasks

## Phase 1: Foundation

### 1.1 Project Setup {#11-project-setup}

- [x] Create dashboard feature directory
- [x] Add TypeScript interfaces for WidgetLayout and WidgetData
- [x] Configure test setup

### 1.2 Database Schema {#12-database-schema}

- [x] Create widget_layouts table migration
- [ ] Add seed data for default widget layout

## Phase 2: Core Implementation

### 2.1 Widget API {#21-widget-api}

- [ ] Implement `getWidgets()` endpoint
- [x] Implement `updateLayout()` endpoint
- [x] Add widget data aggregation queries
- [x] Add unit tests

### 2.2 Dashboard Page {#22-dashboard-page}

- [x] Create dashboard grid layout component
- [x] Build task-summary widget
- [x] Build recent-activity widget
- [x] Build project-health widget
- [x] Add drag-to-reorder functionality

### 2.3 Layout Persistence {#23-layout-persistence}

- [x] Save layout on reorder
- [x] Load saved layout on mount
- [x] Fallback to default layout for new users

---

## Work Sessions

<!-- IMPORTANT: This section MUST remain the LAST section in tasks.md. Do not add content below it. -->
<!-- Task execution log — append-only, updated by /afx-task pick, /afx-task code, /afx-task complete -->

| Date       | Task | Action    | Files Modified         | Agent | Human |
| ---------- | ---- | --------- | ---------------------- | ----- | ----- |
| 2026-03-12 | 1.1  | Picked    | -                      | [x]   | -     |
| 2026-03-12 | 1.1  | Coded     | widget.types.ts        | [x]   | [x]   |
| 2026-03-12 | 1.1  | Completed | widget.types.ts        | [x]   | [x]   |
| 2026-03-13 | 1.2  | Picked    | -                      | [x]   | -     |
| 2026-03-13 | 1.2  | Coded     | 003_widget_layouts.sql | [x]   | -     |
