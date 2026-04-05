---
afx: true
type: TASKS
status: Living
owner: "@your-handle"
version: "1.0"
created_at: "2025-02-01T10:00:00.000Z"
updated_at: "2025-02-01T10:00:00.000Z"
tags: [example]
spec: spec.md
design: design.md
---

# Example Feature - Implementation Tasks

## Phase 1: Foundation

### 1.1 Project Setup {#11-project-setup}

- [ ] Create feature directory structure
- [ ] Add type definitions
- [ ] Configure test setup

### 1.2 Data Model {#12-data-model}

- [ ] Define TypeScript interfaces
- [ ] Create validation schemas (Zod)

## Phase 2: Core Implementation

### 2.1 Create Service {#21-create-service}

- [ ] Implement `getExampleService()` factory
- [ ] Add `createItem` method
- [ ] Add `getItem` method
- [ ] Add unit tests

### 2.2 Create Actions {#22-create-actions}

- [ ] Create server action for item creation
- [ ] Create server action for item retrieval
- [ ] Add form validation

## Phase 3: UI

### 3.1 Create Components {#31-create-components}

- [ ] Build item form component
- [ ] Build item display component
- [ ] Add loading states

### 3.2 Integration {#32-integration}

- [ ] Wire up form to server action
- [ ] Add error handling UI
- [ ] Test end-to-end flow

## Phase 4: Polish

### 4.1 Testing {#41-testing}

- [ ] Add integration tests
- [ ] Verify all acceptance criteria

### 4.2 Documentation {#42-documentation}

- [ ] Update README if needed
- [ ] Verify @see annotations

---

## Work Sessions

<!-- IMPORTANT: This section MUST remain the LAST section in tasks.md. Do not add content below it. -->
<!-- Task execution log — append-only, updated by /afx-task pick, /afx-task code, /afx-task complete -->

| Date       | Task | Action  | Files Modified               | Agent | Human |
| ---------- | ---- | ------- | ---------------------------- | ----- | ----- |
| 2025-02-01 | 1.1  | Picked  | -                            | [x]   | -     |
| 2025-02-01 | 1.1  | Coded   | spec.md, design.md, tasks.md | [x]   | -     |
