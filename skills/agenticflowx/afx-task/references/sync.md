# sync [spec] [issue]

**Purpose:** Bidirectional GitHub sync.

**Implementation:**

1. **Tasks → GitHub**: For each uncompleted task in `tasks.md`, ensure a corresponding GitHub issue or checklist item exists
2. **GitHub → Tasks**: For each closed GitHub issue, check if corresponding task checkbox is marked
3. **Reconcile**: Report discrepancies (task done in code but issue open, or issue closed but task unchecked)
4. Uses `gh` CLI for GitHub operations
