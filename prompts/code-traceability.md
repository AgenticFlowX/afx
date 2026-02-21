# Documentation References (Living Documentation Traceability)

> Add this section to your CLAUDE.md to enable @see annotation requirements.

```markdown
### Documentation References (Living Documentation Traceability)

> **AFX**: Bidirectional code↔spec linking ensures AI agents maintain alignment with specifications.

All spec-driven files MUST have a top-level JSDoc with `@see` references linking back to the relevant spec documents.

**Required for:**

| File Type         | Required Links                                            |
| ----------------- | --------------------------------------------------------- |
| `*.repository.ts` | design.md section + tasks.md task number                  |
| `*.service.ts`    | design.md section + tasks.md task number                  |
| `*.action.ts`     | design.md section + tasks.md task number (if spec-driven) |
| `*.model.ts`      | design.md section (if spec-driven)                        |
| `*.constants.ts`  | research doc or design.md (if decision-driven)            |

**Format:**

\`\`\`typescript
/**
 * [Brief description]
 *
 * @see docs/specs/[feature]/design.md#[section]
 * @see docs/specs/[feature]/tasks.md#[task-number]
 */
\`\`\`

**Example:**

\`\`\`typescript
/**
 * User Repository Interface
 *
 * @see docs/specs/user-auth/design.md#repository-implementation
 * @see docs/specs/user-auth/tasks.md#21-create-repository-interface
 */
\`\`\`

**Anchor Format:**

- **Section anchors:** Use kebab-case matching heading text (e.g., `#repository-implementation`)
- **Task anchors:** Use pattern `#XY-task-description` where X is phase, Y is task number (e.g., `#21-create-repository-interface`)
- **Research anchors:** Link directly to research file (e.g., `research/decision-name.md`)

**Inline Annotations:**

Use standard annotation format + `@see` link. **At least one link MUST point to a spec** (`docs/specs/`). External links are optional.

\`\`\`typescript
// ❌ BAD: Orphaned TODO
// TODO: implement pagination

// ❌ BAD: Only external link (no spec)
// FIXME #789: Race condition
// @see https://github.com/org/repo/issues/789

// ✅ GOOD: Spec link required
// TODO: Implement pagination for claim history
// @see docs/specs/feature/tasks.md#42-pagination

// ✅ GOOD: Spec + optional external link
// FIXME: Race condition in concurrent updates
// @see docs/specs/feature/design.md#concurrency
// @see https://github.com/org/repo/issues/789
\`\`\`

Standard annotations: `TODO`, `FIXME`, `XXX`, `HACK`, `NOTE`, `BUG`, `OPTIMIZE`, `REVIEW`
```
