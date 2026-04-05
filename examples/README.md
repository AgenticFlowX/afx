# AFX Examples

Example projects that showcase AgenticFlowX spec-driven development.

> **Prerequisite:** Run `curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- .` first to install skills, then layer an example on top.

## Examples

| Example | Level        | Description                                                      |
| ------- | ------------ | ---------------------------------------------------------------- |
| starter | Beginner     | Filled-in sample spec — pure spec-driven setup                   |
| basic   | Beginner     | Starter + project README + src/index.html                        |
| full    | Intermediate | FuelSnap — complete SDD lifecycle with specs, code, traceability |

## Quick Start

```bash
# Step 1: Install AFX (skills, agent instructions)
mkdir my-project && cd my-project
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- .

# Step 2: Layer on example content
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- example basic .
```

## What's in each example?

### `starter/`

A filled-in sample feature spec (`docs/specs/landing-page/`) so you can see the pattern immediately. No source code, no README — just the spec. Start here if you want to understand what a spec looks like.

### `basic/`

Everything in starter, plus a project `README.md` and `src/index.html` — the implementation target that the landing-page spec drives. Start here if you want to build something.

### `full/`

**FuelSnap** — a personal fuel price tracker demonstrating the complete SDD lifecycle:

- 3 feature specs (price-dashboard, fill-log, spend-tracker) with approved specs, authored designs, and completed tasks
- Source code with `@see` traceability annotations
- ADR documenting the "API vs CSV" data source decision
- Kanban board, session notes, and journal entries
- Sample CSV data for offline usage

The user chooses their fuel data source: public API (NSW FuelCheck, EIA, TankerKoenig) or CSV file (MBIE NZ).

## Commands to explore

```bash
/afx-hello              # Verify setup
/afx-spec review        # Review the sample spec
/afx-design author      # Author a design from the spec
/afx-task plan          # Plan implementation tasks
/afx-check trace        # Verify @see traceability
```
