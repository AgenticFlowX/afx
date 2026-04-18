---
afx: true
type: GUIDE
status: Living
tags: [afx, quickstart, onboarding]
---

# AFX Quick Start

> From zero to your first implemented task in under 5 minutes.

---

## Step 1 — Install

From your project directory:

```bash
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- .
```

Or if you have AFX cloned locally:

```bash
./path/to/afx/afx-cli /path/to/your/project
```

The installer will ask which AI agents you use (Claude Code, Codex, Copilot, Gemini) and set up:

- Skills in `.claude/skills/` and/or `.agents/skills/`
- Config: `.afx.yaml`
- Docs: `docs/agenticflowx/`
- Context files: `CLAUDE.md`, `AGENTS.md` (optionally `GEMINI.md`)
- Directory structure: `docs/specs/`, `docs/adr/`

> **OS note**: Tested on macOS and Linux/WSL. Windows users: use **Git Bash** — tested and working. Native Windows cmd/PowerShell is not supported.

---

## Step 2 — Create your first spec

Open Claude Code (or your preferred agent) and run:

```bash
/afx-spec create my-feature "brief description of what you want to build"
```

Example:

```bash
/afx-spec create saas-landing "single-page marketing site, static HTML/CSS/JS, no frameworks"
```

The agent will ask 1–3 clarifying questions, wait for your answers, then author `spec.md` with your requirements. The folder structure is created automatically:

```
docs/specs/my-feature/
├── spec.md      ← requirements authored now (WHAT)
├── design.md    ← template only — authored after spec approval
├── tasks.md     ← template only — authored after design approval
└── journal.md   ← session log (WHY)
```

When done, review `spec.md` and approve:

```bash
/afx-spec approve my-feature
```

---

## Step 3 — Author design and plan tasks

```bash
/afx-design author my-feature    # author design.md from approved spec
/afx-design approve my-feature

/afx-task plan my-feature        # generate tasks.md from approved design
/afx-task pick                   # assign the first unchecked task
```

The agent reads the approved spec and design, generates an implementation checklist in `tasks.md`, then picks the first task for you.

---

## Step 4 — Implement with traceability

```bash
/afx-task code
```

The agent writes code with `@see` links back to spec requirements:

```typescript
/**
 * @see docs/specs/your-feature/spec.md [FR-1]
 * @see docs/specs/your-feature/design.md [DES-API]
 */
export async function createFeature() { ... }
```

---

## Step 5 — Verify and complete

```bash
/afx-check path   # trace execution from UI → DB
/afx-task complete
```

---

## Resume tomorrow

```bash
/afx-next         # "what do I do now?"
/afx-context load # restore prior agent's mental state
```

---

## Fast-mode alternative

Working on something small and exploratory? Use sprint mode — one document, same discipline:

```bash
/afx-sprint new my-feature
/afx-sprint spec my-feature --approve
/afx-sprint design my-feature --approve
/afx-sprint task my-feature --approve
/afx-sprint code my-feature
```

Graduate to four files when scope grows: `/afx-sprint graduate my-feature`

---

## Next steps

- [agenticflowx.md](agenticflowx.md) — full framework reference
- [cheatsheet.md](cheatsheet.md) — one-page command reference
- [why-afx.md](why-afx.md) — the philosophy behind the workflow
