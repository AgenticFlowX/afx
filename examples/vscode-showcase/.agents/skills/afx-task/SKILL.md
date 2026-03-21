---
name: afx-task
description: Task verification — verify implementation vs spec and generate implementation briefs
license: MIT
metadata:
  afx-owner: "@rix"
  afx-status: Living
  afx-tags: "workflow,task,verification,verify,progress"
  afx-argument-hint: "verify | brief"
---

# /afx-task

Verify and summarize task implementation status.

## Configuration

**Read config** using two-tier resolution: `.afx/.afx.yaml` (managed defaults) + `.afx.yaml` (user overrides).

- `paths.specs` - Where spec files live (default: `docs/specs`)

If neither file exists, use defaults.

## Usage

```bash
/afx-task verify <task-id>              # Verify task implementation
/afx-task verify <spec>#<task-id>       # Explicit spec (e.g., user-auth#7.1)
/afx-task verify <task-id> <tasks.md>   # Explicit path to tasks.md

/afx-task brief <task-id>             # Get implementation summary
```

> **Note:** Task listing and phase progress are available in the VSCode AFX extension (Tasks Tab, Pipeline Tab). These subcommands focus on operations that require agent reasoning.

## Purpose

Close the loop between "task marked done" and "task actually implemented correctly". Unlike `/afx-check path` (execution path) which verifies **runtime integrity**, this verifies if a **specific task matches its spec** (static verification).

## Context Resolution

When task ID alone is provided (e.g., `7.1`), resolve spec in this order:

1. **Conversation context** - Recently discussed spec (file reads, GitHub issues, prior commands)
2. **Branch name** - Extract from `feat/{feature-name}` pattern
3. **Open GitHub issues** - If only one feature has open issues
4. **Fallback** - Require explicit: `/afx-task verify user-auth#7.1`

---

## Execution Contract (STRICT)

### Allowed

- Read/list/search files anywhere in workspace
- Analyze task completion status against spec requirements
- Append to `docs/specs/**/journal.md` (Captures only, via Proactive Capture Protocol)

### Forbidden

- Create/modify/delete any files (except journal captures above)
- Run build/test/deploy/migration commands

If implementation is requested, respond with:

```text
Out of scope for /afx-task (read-only verification mode). Use /afx-dev code to implement or /afx-work pick to assign.
```

### Proactive Journal Capture

When this skill detects a high-impact context change, auto-capture to `journal.md` per the [Proactive Capture Protocol](../afx-session/SKILL.md#proactive-capture-protocol-mandatory).

**Triggers for `/afx-task`**: Spec-implementation mismatch that requires decision.

---

## Agent Instructions

### Next Command Suggestion (MANDATORY)

**CRITICAL**: After EVERY `/afx-task` action, suggest the most appropriate next command based on context:

| Context                               | Suggested Next Command                         |
| ------------------------------------- | ---------------------------------------------- |
| After `verify` ([OK] Implemented)      | `/afx-work pick <spec>` for next task          |
| After `verify` ([PARTIAL])             | `/afx-dev code` to complete implementation     |
| After `verify` ([MISSING])             | `/afx-dev code` to implement                   |
| After `brief` (understanding task)  | `/afx-dev code` or `/afx-work pick`            |

**Suggestion Format** (top 3 context-driven, bottom 2 static):

```
Next (ranked):
  1. /afx-dev code                               # Context-driven: Implement if task incomplete
  2. /afx-work pick docs/specs/{feature}          # Context-driven: Move to next task
  3. /afx-check path <path>                      # Context-driven: Verify execution path
  ──
  4. /afx-session note "<note>"                   # Note findings before switching
  5. /afx-work status                             # Re-orient after verification
```

---

### 1. Parse Arguments

```bash
/afx-task verify 7.1                    # Infer spec
/afx-task verify user-auth#7.1    # Explicit spec#task
/afx-task verify 7.1 docs/specs/user-auth/tasks.md  # Explicit path
```

Extract:

- `subcommand`: verify | brief
- `task_id`: e.g., "7.1"
- `spec_name`: e.g., "user-auth" (optional)
- `tasks_path`: e.g., "docs/specs/user-auth/tasks.md" (optional)

---

### 2. Resolve Spec Context

If spec not explicit:

```bash
# 1. Check conversation - look for recent tasks.md reads or GitHub issues
# 2. Check branch
git branch --show-current
# feat/user-auth → spec = "user-auth"

# 3. Check open issues
gh issue list --state open --json title | grep -i "feature\|claims"

# 4. If ambiguous, error:
Error: Ambiguous spec. Use: /afx-task verify user-auth#7.1
```

---

### 3. Verify Mode

**Usage**: `/afx-task verify <task-id>`

Steps:

1. **Read tasks.md** - Find task definition

   ```bash
   # Look for "7.1" or "### 7.1" or "#### 7.1" in tasks.md
   ```

   ```bash
   # Look in GitHub issue or journal.md for task entries
   ```

2. **Check files exist** - Verify files mentioned in task exist

   ```bash
   # For each file in task description, check existence
   ls -la <file-path>
   ```

3. **Scan for incomplete markers**

   ```bash
   # In files related to this task:
   grep -r "TODO.*7.1\|FIXME.*7.1" --include="*.ts"
   grep -r "// TODO" <task-files>  # General incomplete markers
   ```

4. **Output verification result**:

```markdown
## Task 7.1 Verify

**Spec**: user-auth
**Task**: Create supplier constants
**Status**: [OK] Implemented | [PARTIAL] Partial | [MISSING] Missing

### Task Definition (from tasks.md)

> {task description from spec}

### Implementation Evidence

| Check                 | Status | Details                                |
| --------------------- | ------ | -------------------------------------- |
| Files exist           | [OK]   | feature-claim-supplier.constants.ts    |
| @see backlinks        | [OK]   | 2 files reference this task            |
| Session log entry     | [OK]   | 2025-12-13: Created supplier constants |
| No incomplete markers | [OK]   | No TODO/FIXME for 7.1                  |

### Files Modified

- `packages/db/src/core/constants/feature-claim-supplier.constants.ts`

### Backlinks Found

- feature-claim-supplier.constants.ts:1 → @see tasks.md#71-create-supplier-constants

### Verdict

[OK] **Task 7.1 is fully implemented**

Next: /afx-work pick docs/specs/{feature} # Proceed to next task
```

---

### 4. Brief Mode

**Usage**: `/afx-task brief <task-id>`

Generate concise summary of what was built:

1. Read task definition from tasks.md
2. Find session log entries
3. Find files modified
4. Summarize implementation

**Output**:

```markdown
## Task 7.1 Brief

**Task**: Create supplier constants
**Completed**: 2025-12-13

**What was built**:
Created hardcoded supplier list with UUID-format IDs for Phase 1
implementation. Includes manufacturer-to-supplier mapping and helper
functions for dropdown population.

**Files**:

- `packages/db/src/core/constants/feature-claim-supplier.constants.ts`

**Key additions**:

- `SUPPLIERS` constant with 3 suppliers
- `getSupplierOptions()` for dropdowns
- `getSupplierByManufacturer()` for auto-suggestion

**Related**:

- @see docs/specs/user-auth/research/supplier-assignment.md

Next: /afx-dev code # Continue with related work
```

---

## Verification Status Definitions

| Status            | Meaning                     | Criteria                                 |
| ----------------- | --------------------------- | ---------------------------------------- |
| [OK] Implemented  | Task fully complete         | Files exist, backlinks present, no TODOs |
| [PARTIAL] Partial | Task started but incomplete | Some files exist, or TODOs remain        |
| [MISSING] Missing | Task not started            | No files, no session log, no backlinks   |

---

## Integration with Other Commands

| Command        | Relationship                                            |
| -------------- | ------------------------------------------------------- |
| `/afx-check`   | Checks execution path; `/afx-task` verifies spec usage    |
| `/afx-work`    | Shows workflow state; `/afx-task` shows task completion |
| `/afx-session` | Captures discussions; `/afx-task` reads session logs    |
| `/afx-dev`     | Implements code; `/afx-task` validates implementation   |

---

## Examples

### Verify task with inferred context

```bash
# On branch feat/user-auth
/afx-task verify 7.1
# → Checks user-auth task 7.1
```

### Verify with explicit spec

```bash
/afx-task verify user-auth#7.1
# → Explicitly checks user-auth task 7.1
```

### Get summary of completed task

```bash
/afx-task brief 7.1
# → Shows what was built for task 7.1
```

---

## Error Handling

**Task not found**:

```
Error: Task 7.5 not found in docs/specs/user-auth/tasks.md
Available tasks in Phase 7: 7.1, 7.2, 7.3, 7.4
```

**Ambiguous spec**:

```
Error: Cannot determine spec context.
Recent activity spans multiple specs: user-auth, users-permissions

Specify explicitly:
  /afx-task verify user-auth#7.1
  /afx-task verify users-permissions#3.2
```

**No tasks.md found**:

```
Error: No tasks.md found at docs/specs/user-auth/tasks.md

Check:
  1. Spec name is correct
  2. tasks.md exists in spec folder
  3. Use explicit path: /afx-task verify 7.1 path/to/tasks.md
```
