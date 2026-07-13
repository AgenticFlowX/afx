# complete {id}

**Purpose:** Mark task as done.

**Implementation:**

1. Read `tasks.md`, find task `{id}`
2. Verify task checkbox is marked `[x]` (should be done by `code`)
3. If not marked, mark it now
4. **Locate `## Work Sessions`** at the bottom of `tasks.md`. Append a row:

   ```markdown
   | 2026-03-31 | {id} | Completed | auth.service.ts, auth.action.ts | [x] | [] |
   ```

5. Update `updated_at` in `tasks.md` frontmatter
6. Output confirmation and suggest next task
