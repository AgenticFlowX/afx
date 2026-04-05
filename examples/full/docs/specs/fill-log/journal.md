---
afx: true
type: JOURNAL
status: Living
owner: "@rix"
created_at: "2026-04-03T11:00:00.000Z"
updated_at: "2026-04-03T11:00:00.000Z"
tags: [fuelsnap, fill-log, journal]
---

# Fill Log — Journal

<!-- prefix: FL -->

## Captures

<!-- Quick notes during active sessions. Clear after recording. -->

## Discussions

<!-- Permanent discussion records with IDs -->

### FL-D001 — Storage Trade-off: localStorage vs IndexedDB

`status:closed` `2026-04-03T11:00:00.000Z` `[storage, localstorage, indexeddb]`

**Context**: Needed to decide on a client-side storage mechanism for fill-up entries. The two main candidates are `localStorage` (synchronous, simple key-value) and `IndexedDB` (async, indexed, larger capacity).

**Summary**: Personal fuel tracking generates roughly 1-2 entries per week, ~100 per year. At ~200 bytes per entry, even 10 years of data is ~200 KB — well within localStorage limits. Chose localStorage for v1.

**Progress**:

- [x] Reviewed localStorage vs IndexedDB trade-offs
- [x] Implemented FillLogService with localStorage
- [x] Documented migration path in design.md

**Decisions**:

- Chose **localStorage** for v1 — simplicity outweighs IndexedDB's capabilities given data volume
- Documented escape hatch: migration path to IndexedDB if attachments are added later

**Related Files**: design.md, src/services/fill-log.service.ts
**Participants**: @rix, Claude
