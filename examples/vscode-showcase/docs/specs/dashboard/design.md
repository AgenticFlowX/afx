---
afx: true
type: DESIGN
status: Approved
owner: '@rix'
version: 1.0
created: 2026-03-11T10:00:00.000Z
tags: [dashboard, ui, mvp]
spec: spec.md
---

# Dashboard - Technical Design

## Architecture Overview

```
┌─────────────────┐     ┌─────────────┐     ┌─────────────┐
│ Dashboard Page   │ ──▶ │ Widget API  │ ──▶ │  Database   │
│ (React Grid)     │     │ (Server)    │     │  (Postgres) │
└─────────────────┘     └─────────────┘     └─────────────┘
        │
        ▼
┌─────────────────┐
│ Widget Registry  │
│ (Component Map)  │
└─────────────────┘
```

## Data Model

### Entity: WidgetLayout

| Field      | Type    | Required | Description                  |
| ---------- | ------- | -------- | ---------------------------- |
| id         | uuid    | Yes      | Primary key                  |
| userId     | uuid    | Yes      | Foreign key to User          |
| widgetType | string  | Yes      | Widget type identifier       |
| position   | integer | Yes      | Order in grid                |
| width      | integer | Yes      | Grid columns (1-4)           |
| visible    | boolean | Yes      | Show/hide toggle             |

## Widget Types

| Type             | Data Source           | Refresh Interval |
| ---------------- | --------------------- | ---------------- |
| task-summary     | Tasks aggregate query | 30s              |
| recent-activity  | Activity log (last 10)| 15s              |
| project-health   | Computed from specs   | 60s              |

## API Design

### Get Widget Data

```typescript
async function getWidgets(userId: string): Promise<WidgetData[]>
```

### Update Layout

```typescript
async function updateLayout(userId: string, layout: LayoutUpdate[]): Promise<void>
```
