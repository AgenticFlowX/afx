---
afx: true
type: TASKS
status: Approved
owner: "@agenticflowx"
version: "2.0"
created_at: "2026-04-06T10:14:58.000Z"
updated_at: "2026-04-06T11:34:19.000Z"
tags: [roomledger, room-history, example]
spec: spec.md
design: design.md
---

# RoomLedger — Room History Tasks

> All code goes in shared files: markup in `src/index.html`, styles in `src/styles.css`, scripts in `src/app.js`.

## Task Numbering Convention

- **1.x** - Timeline Layout (HTML + CSS)
- **2.x** - Entry Form (HTML + CSS)
- **3.x** - Interactions (JS)

---

## Phase 1: Timeline Layout

### 1.1 Build timeline with sample events

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/03-room-history/spec.md [FR-1] [FR-4] [FR-5] | docs/specs/03-room-history/design.md [DES-TIMELINE] [DES-EVENT-CARD] -->

- [ ] Add `.room-history-view` container inside `.main-content` (hidden by default)
- [ ] Add 2-column grid (`1.2fr 0.8fr`, `gap: 1.5rem`)
- [ ] Left column: `.timeline` with 3 pre-populated event cards using dot-and-card pattern
- [ ] Each event: accent dot (10px), vertical connecting line (2px), bordered card with title, date, status chip, description
- [ ] Status chips: "Reported" (warning), "In Progress" (accent), "Resolved" (success)
- [ ] Events in reverse chronological order (newest first)
- [ ] Responsive: collapse to 1 column at `<= 768px`, form stacks below timeline

---

## Phase 2: Entry Form

### 2.1 Build issue entry form

<!-- files: src/index.html, src/styles.css -->
<!-- @see docs/specs/03-room-history/spec.md [FR-2] | docs/specs/03-room-history/design.md [DES-EVENT-FORM] -->

- [ ] Right column: form card with "Add New Event" title
- [ ] Top row: 2-column grid (`1fr 1fr`) — title input (required) + status dropdown
- [ ] Status dropdown options: Reported, In Progress, Resolved
- [ ] Full-width notes textarea (`min-height: 100px`)
- [ ] Labels above each field (`font-size: 0.85rem`, `font-weight: 500`)
- [ ] "Add event" submit button: primary style, full width

---

## Phase 3: Interactions

### 3.1 Implement form submission and timeline prepend

<!-- files: src/app.js -->
<!-- @see docs/specs/03-room-history/spec.md [FR-3] [NFR-4] | docs/specs/03-room-history/design.md [DES-INTERACTION-HISTORY] -->

- [ ] Store events in a JS array (pre-populated with 3 sample events)
- [ ] On "Add event" click: read title, status, notes from form
- [ ] If title is empty (or whitespace-only), do nothing (silent, no error)
- [ ] Create new event with current date (`YYYY-MM-DD` format) and prepend to timeline
- [ ] Clear form fields after successful submission

---

## Implementation Flow

```
Phase 1: Timeline Layout (dot-and-card pattern, sample events, responsive)
    ↓
Phase 2: Entry Form (inputs, dropdown, labels, button)
    ↓
Phase 3: Interactions (submit, prepend, clear, validation)
```

---

## Cross-Reference Index

| Task | Spec Requirement     | Design Section                  |
| ---- | -------------------- | ------------------------------- |
| 1.1  | [FR-1] [FR-4] [FR-5] | [DES-TIMELINE] [DES-EVENT-CARD] |
| 2.1  | [FR-2]               | [DES-EVENT-FORM]                |
| 3.1  | [FR-3] [NFR-4]       | [DES-INTERACTION-HISTORY]       |

---

## Work Sessions

<!-- IMPORTANT: This section MUST remain the LAST section in tasks.md. Do not add content below it. -->

| Date | Task | Action | Files Modified | Agent | Human |
| ---- | ---- | ------ | -------------- | ----- | ----- |
