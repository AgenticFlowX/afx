# GEMINI.md - Project Context

## Project Overview

**AFX (AgenticFlowX)** is a spec-driven development framework designed to keep AI coding agents (like Claude Code and Codex) on track. It prevents context loss, scope creep, and orphaned code by maintaining bidirectional traceability between specifications and implementation.

- **Main Technologies:** Bash (Installer/Init), Markdown (Specifications, Commands, Documentation), JSDoc/Annotations (`@see` links).
- **Architecture:** A decentralized four-file structure for every feature (`spec.md`, `design.md`, `tasks.md`, `journal.md`), global Architecture Decision Records (ADRs), and a set of custom slash commands for AI agents.
- **Key Files:**
  - `install.sh`: The primary installer and updater for the framework.
  - `.claude/commands/`: Definitions for slash commands used by Claude Code.
  - `.codex/skills/`: Skills for Codex that delegate to the Claude commands.
  - `templates/`: Base templates for features and ADRs.
  - `.afx.yaml.template`: Configuration schema for projects using AFX.

## Building and Running

Since AFX is primarily a framework of documentation and instructions, there is no "build" step in the traditional sense.

- **Installation/Update:**
  ```bash
  ./install.sh /path/to/target-project      # Install to a project
  ./install.sh --update /path/to/target-project  # Update an existing installation
  ```
- **Development/Testing:**
  - To test changes to commands, copy the modified `.md` files from `.claude/commands/` into a test project's `.claude/commands/` directory and run them using Claude Code.
- **Validation:**
  - AFX commands are self-validating through `/afx:check` subcommands (e.g., `/afx:check links`, `/afx:check lint`).

## Development Conventions

- **Spec-Driven Development (SDD):** Always write or update the specification (`spec.md` and `design.md`) before implementation.
- **Bidirectional Traceability:**
  - Every function or significant code block MUST include an `@see` annotation linking back to the relevant section in the specification or task.
  - Example: `/** @see docs/specs/auth/design.md#2.1-token-generation */`
- **Quality Gates:** Implementation is not complete until both `[Agent OK]` and `[Human OK]` markers are present in `tasks.md` and `/afx:check path` has verified the execution flow.
- **State vs. Event Separation:**
  - `spec.md` and `design.md` reflect the **current factual state**.
  - `journal.md` and `tasks.md` record **events and history**.
- **Command Structure:** All custom commands follow a standard Markdown format with YAML frontmatter and specific sections (`Usage`, `Agent Instructions`, `Execution Script`).

## Git Commit Attribution

When committing to this repository, append the following co-author trailer to every commit message:

```
Co-authored-by: gemini-code-assist <noreply@gemini.google.com>
```

## TODO / Known Gaps

- **Global ADR Command Awareness:** The `global-adr` feature has implemented scaffolding (`/afx:init adr`), but Phase 2 (Command Awareness) is incomplete. The following commands need to be updated to be ADR-aware:
  - `/afx:next`: Should surface Proposed ADRs needing review.
  - `/afx:context`: Should include ADRs in handoff bundles.
  - `/afx:discover`: Should report ADR counts and recent decisions.
