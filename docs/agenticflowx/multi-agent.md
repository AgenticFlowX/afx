---
afx: true
type: GUIDE
status: Living
tags: [afx, codex, skills, commands]
---

# AFX Multi-Agent Commands

AFX supports multiple AI agents through platform-specific command implementations.

## Naming & Execution

| Agent          | Command Format             | Implementation Location     |
| -------------- | -------------------------- | --------------------------- |
| **Claude**     | `/afx:work next user-auth` | `.claude/commands/afx-*.md` |
| **Gemini CLI** | `/afx:work next user-auth` | `.gemini/commands/afx-*.md` |
| **Codex**      | `afx-work next user-auth`  | `.codex/skills/afx-*`       |

## Parity Map

| Claude Slash Command | Gemini Command  | Codex Skill    |
| -------------------- | --------------- | -------------- |
| `/afx:next`          | `/afx:next`     | `afx-next`     |
| `/afx:discover`      | `/afx:discover` | `afx-discover` |
| `/afx:work`          | `/afx:work`     | `afx-work`     |
| `/afx:dev`           | `/afx:dev`      | `afx-dev`      |
| `/afx:check`         | `/afx:check`    | `afx-check`    |
| `/afx:task`          | `/afx:task`     | `afx-task`     |
| `/afx:session`       | `/afx:session`  | `afx-session`  |
| `/afx:init`          | `/afx:init`     | `afx-init`     |
| `/afx:context`       | `/afx:context`  | `afx-context`  |
| `/afx:spec`          | `/afx:spec`     | `afx-spec`     |
| `/afx:report`        | `/afx:report`   | `afx-report`   |
| `/afx:help`          | `/afx:help`     | `afx-help`     |
| `/afx:update`        | `/afx:update`   | `afx-update`   |

## Behavior Contract

All agent-specific implementations (Codex skills, Gemini proxies) delegate to the canonical command specs in `.claude/commands/afx-*.md`. This ensures consistent behavior, traceability requirements, and quality gates across all AI assistants.
