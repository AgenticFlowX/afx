---
afx: true
type: COMMAND
status: Living
tags: [afx, command, help, reference]
---

# /afx:help

AFX (AgenticFlowX) command reference.

## Source of Truth

**CRITICAL**: Follow the canonical command logic and output format defined in:

- `.claude/commands/afx-help.md`

## Gemini-Specific Guidance

When providing help:

1.  **Reference Guidance**: Use `read_file` to access the canonical help and guides.
2.  **Contextual Help**: Tailor your help output based on the user's current role or task, as identified in your context analysis.

## Usage

```bash
/afx:help
/afx:help guides
```
