---
afx: true
type: COMMAND
status: Living
tags: [afx, command, workflow, state]
---

# /afx:work

Workflow state management for AgenticFlowX sessions.

## Source of Truth

**CRITICAL**: Follow the canonical command logic and output format defined in:

- `.claude/commands/afx-work.md`

## Gemini-Specific Guidance

When managing workflow state, use your specialized tools to ensure accuracy:

1.  **State Verification**: Use `run_shell_command` for all `git` and `gh` (GitHub CLI) operations.
2.  **Contextual Analysis**: If `/afx:work status` or `/afx:work plan` requires deep understanding of the codebase, invoke `codebase_investigator` to map out the relevant modules and dependencies.
3.  **Task Syncing**: Use `grep_search` and `read_file` to precisely identify and update session log entries in `journal.md` and task states in `tasks.md`.

## Usage

```bash
/afx:work status
/afx:work next <spec-path>
/afx:work resume [spec|num]
/afx:work sync [spec] [issue]
/afx:work plan [instruction]
/afx:work approve [feature] <task> "<note>"
/afx:work reopen [feature] <task> "<reason>"
/afx:work close [feature] <issue> "<summary>"
```
