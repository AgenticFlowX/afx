---
afx: true
type: TASKS
status: Living
owner: '@rix'
version: 1.0
created: 2026-03-12T09:00:00.000Z
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
- [ ] Implement `updateLayout()` endpoint
- [ ] Add widget data aggregation queries
- [ ] Add unit tests

### 2.2 Dashboard Page {#22-dashboard-page}

- [ ] Create dashboard grid layout component
- [ ] Build task-summary widget
- [ ] Build recent-activity widget
- [ ] Build project-health widget
- [ ] Add drag-to-reorder functionality

### 2.3 Layout Persistence {#23-layout-persistence}

- [ ] Save layout on reorder
- [ ] Load saved layout on mount
- [ ] Fallback to default layout for new users

---

## Work Sessions

<!-- Task execution log - updated by /afx-work next, /afx-dev code -->

| Date       | Task | Action                                  | Files Modified                        | Agent | Human |
| ---------- | ---- | --------------------------------------- | ------------------------------------- | ----- | ----- |
| 2026-03-12 | 1.1  | Created feature directory and types     | widget.types.ts                       | [x]   | [x]   |
| 2026-03-13 | 1.2  | Created widget_layouts table migration  | 003_widget_layouts.sql                | [x]   | [ ]   |
