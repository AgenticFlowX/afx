# CLAUDE.md - VSCode Showcase Project

This is an example project demonstrating the AFX VSCode extension features. It includes pre-populated data for all sidebar views and bottom panel tabs.

## Project Overview

A task management app used to showcase every AFX VSCode extension feature — sidebar views (Specs, Library, Toolbox, Project), bottom panel tabs (Pipeline, Tasks, Documents, Analytics, Architecture, Board, Journal, Notes), and status bar.

## Documentation References (Living Documentation Traceability)

All spec-driven files MUST have a top-level JSDoc with `@see` references linking back to the relevant spec documents.

**Required for:**

| File Type      | Required Links                           |
| -------------- | ---------------------------------------- |
| `*.service.ts` | design.md section + tasks.md task number |
| `*.action.ts`  | design.md section + tasks.md task number |

**Format:**

```typescript
/**
 * [Brief description]
 *
 * @see docs/specs/[feature]/design.md#[section]
 * @see docs/specs/[feature]/tasks.md#[task-number]
 */
```

**Anchor Format:**

- **Section anchors:** Use kebab-case matching heading text (e.g., `#data-model`)
- **Task anchors:** Use pattern `#XY-task-description` (e.g., `#21-create-service`)

Standard annotations: `TODO`, `FIXME`, `XXX`, `HACK`, `NOTE`, `BUG`, `OPTIMIZE`, `REVIEW`

## AgenticFlowX - Session Continuity

This project uses **AgenticFlowX (AFX)** for spec-driven development.

### Core Principle

The spec tells you _what_ to build. The GitHub ticket tells you _where you left off_.

### Commands

- `/afx-next` - Context-aware guidance
- `/afx-work status` - Quick state check
- `/afx-work next <spec-path>` - Pick next task from spec
- `/afx-dev code [instruction]` - Implement with @see traceability
- `/afx-check path <feature-path>` - Trace execution path (BLOCKING gate)
- `/afx-session save [feature]` - Save session to journal
- `/afx-help` - Show all commands
