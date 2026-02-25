---
afx: true
type: TASKS
status: Draft
owner: "@rix"
version: 1.0
tags: [afx-update, tasks]
---

# Tasks: afx-update

## Phase 1: PRD Finalization

- [x] 1.1 Draft `spec.md` requirements (FR/NFR)
- [x] 1.2 Draft `design.md` command behavior and safety model
- [x] 1.3 Review and approve PRDs (spec/design/tasks)

## Phase 2: Command Implementation

- [x] 2.1 Create runtime command file `.claude/commands/afx-update.md` (`check`, `apply`)
- [x] 2.2 Implement `check` execution steps in command markdown (bash + curl, read-only)
- [x] 2.3 Implement `apply` execution steps in command markdown (installer update flow + flags)
- [x] 2.4 Add Codex skill wrapper `.codex/skills/afx-update/SKILL.md` delegating to `.claude/commands/afx-update.md`
- [x] 2.5 Add skill metadata `.codex/skills/afx-update/agents/openai.yaml`

## Phase 3: Ecosystem Parity

- [x] 3.1 Update command references in `.claude/commands/afx-help.md`
- [x] 3.2 Update Codex parity docs (`docs/agenticflowx/codex.md`)
- [x] 3.3 Update repo guidance (`AGENTS.md`, `prompts/agents.md`, `README.md`, `CLAUDE.md`, `docs/_index.md`)

## Phase 4: Validation

- [x] 4.1 Validate command markdown syntax and examples
- [x] 4.2 Run `/afx:update check` in a test project and verify status outputs
- [x] 4.3 Run `/afx:update apply --dry-run` in a test project and verify installer invocation
- [x] 4.4 Confirm Claude/Codex parity and next-command suggestions
