---
afx: true
type: COMMAND
status: Living
tags: [afx, command, context, session]
---

# /afx:context

Session Context protocol for seamless context transfer between AI sessions.

## Source of Truth

**CRITICAL**: Follow the canonical command logic and output format defined in:

- `.claude/commands/afx-context.md`

## Gemini-Specific Guidance

To ensure high-fidelity context preservation:

1.  **Comprehensive Bundle**: Use `grep_search`, `read_file`, and `run_shell_command` to gather all necessary session state (tasks, journal entries, decisions, uncommitted files).
2.  **Next Agent Instructions**: When generating the context bundle, be explicit and detailed. Use your ability to synthesize complex information to provide high-quality instructions for the next session.
3.  **Traceability Analysis**: For `/afx:context impact`, use `grep_search` to find all `@see` references and `codebase_investigator` to determine the breadth of the impact.

## Usage

```bash
/afx:context save [feature]
/afx:context load
/afx:context history [feature]
/afx:context impact <change>
```
