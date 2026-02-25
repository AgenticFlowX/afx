---
afx: true
type: COMMAND
status: Living
tags: [afx, command, quality, verification]
---

# /afx:check

Quality verification and compliance checking for AgenticFlowX.

## Source of Truth

**CRITICAL**: Follow the canonical command logic and output format defined in:

- `.claude/commands/afx-check.md`

## Gemini-Specific Guidance

When performing quality and verification checks, use your specialized tools:

1.  **Path Verification**: Use `grep_search` to find entry points, mock patterns, and Red Flags. Use `codebase_investigator` to trace execution paths across the codebase if the call chain is complex.
2.  **Linting**: Use `grep_search` to find orphaned annotations. Use `read_file` to understand the context around annotations and provide high-quality fix suggestions.
3.  **Link Integrity**: Use `grep_search` to identify all cross-references in `spec.md`, `design.md`, and `tasks.md`.
4.  **Schema Verification**: Use `grep_search` to extract database artifacts from `design.md` and verify consistency between migrations, types, and repository code.

## Usage

```bash
/afx:check path <feature-path>
/afx:check lint [path]
/afx:check links <spec-path>
/afx:check all <feature-path>
/afx:check schema <spec-path>
```
