# pick {id}

**Purpose:** Check out a task as active.

**Implementation:**

1. Read `tasks.md`, find task `{id}`
2. Verify task is not already marked complete (`[x]`)
3. **Check dependencies**: If the task has a `<!-- depends: X.Y -->` comment, verify that task X.Y is marked complete. If not, warn the user and suggest picking the dependency first.
4. **Locate `## Work Sessions`** — it must be the last section. If missing, create it at the bottom. If misplaced, move it to the bottom.
5. Append a row to the Work Sessions table:

   ```markdown
   | 2026-04-01 | {id} | Picked | - | [x] | [] |
   ```

6. Update `updated_at` in `tasks.md` frontmatter
7. Output task description and acceptance criteria for context
