---
afx: true
type: DESIGN
status: Approved
owner: "@your-handle"
version: "1.0"
created_at: "2025-02-01T10:00:00.000Z"
updated_at: "2025-02-01T10:00:00.000Z"
tags: [example]
spec: spec.md
---

# Example Feature - Technical Design

## [DES-ARCH] Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   UI Layer  │ ──▶ │   Service   │ ──▶ │  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
```

## [DES-DATA] Data Model

### Entity: ExampleItem

| Field       | Type   | Required | Description      |
| ----------- | ------ | -------- | ---------------- |
| id          | string | Yes      | Unique identifier |
| name        | string | Yes      | Item name        |
| description | string | No       | Optional details |
| createdAt   | Date   | Yes      | Creation timestamp |

## [DES-API] API Design

### Create Item

```typescript
async function createItem(data: CreateItemInput): Promise<Item>
```

### Get Item

```typescript
async function getItem(id: string): Promise<Item | null>
```

## [DES-SERVICE] Service Layer

### ExampleService

Location: `src/services/example.service.ts`

```typescript
/**
 * Example service for demonstrating AFX patterns
 *
 * @see docs/specs/example-feature/design.md#service-layer
 * @see docs/specs/example-feature/tasks.md#21-create-service
 */
export function getExampleService() {
  return {
    createItem: async (data: CreateItemInput) => { /* ... */ },
    getItem: async (id: string) => { /* ... */ },
  };
}
```

## [DES-ERR] Error Handling

| Error Code | Description | HTTP Status |
| ---------- | ----------- | ----------- |
| NOT_FOUND  | Item not found | 404 |
| VALIDATION | Invalid input | 400 |
