---
afx: true
type: COMMAND
status: Living
tags: [afx, command, init, scaffolding]
---

# /afx:init

Feature spec scaffolding for AgenticFlowX projects.

## Source of Truth

**CRITICAL**: Follow the canonical command logic and output format defined in:

- `.claude/commands/afx-init.md`

## Gemini-Specific Guidance

During the "Smart Init Protocol":

1.  **Context Scan**: Leverage `codebase_investigator` to search the codebase for existing patterns, collisions, and dependencies before scaffolding new features.
2.  **Scaffolding**: Use `write_file` to create the feature directory structure and files as defined in the canonical command's execution script.
3.  **ADR Creation**: When using `/afx:init adr <title>`, ensure you generate real, meaningful content for each section as instructed in the canonical spec.

## Usage

```bash
/afx:init feature <name>
/afx:init feature <name> --from <template>
/afx:init adr <title>
/afx:init template <name>
/afx:init prefix <feature> <prefix>
/afx:init config <action> <key> [value]
```
