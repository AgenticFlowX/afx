# AFX Examples

Example projects that showcase AgenticFlowX spec-driven development.

## Examples

| Example   | Level        | Description                                                      |
| --------- | ------------ | ---------------------------------------------------------------- |
| `starter` | Beginner     | Filled-in sample spec — pure spec-driven setup                   |
| `basic`   | Beginner     | Starter + project README + src/index.html                        |
| `full`    | Intermediate | FuelSnap — complete SDD lifecycle with specs, code, traceability |

## Quick Start

```bash
# Step 1: Install AFX (skills, agent instructions)
mkdir my-project && cd my-project
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- .

# Step 2: Layer on example content
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- example basic .
```

Both steps work from a remote `curl | bash` invocation — no local AFX checkout required. The CLI automatically downloads examples from GitHub when needed.

## Install Modes

### Remote (recommended)

Works anywhere — the CLI downloads examples from GitHub automatically:

```bash
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- example basic .
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- example full ./demo
```

### Local (from a cloned AFX repo)

If you've cloned the AFX repo, run the CLI directly:

```bash
./afx-cli example basic .
./afx-cli example full ./demo
```

Or use `--source` to point at a local checkout from anywhere:

```bash
afx-cli --source /path/to/afx example basic .
```

### Specific branch or version

```bash
# Branch
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- --branch develop example full .

# Version tag
./afx-cli --version 2.5.2 example basic .
```

## Behavior

| Scenario                  | What happens                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| Fresh install             | All example files are copied into the target directory                                             |
| Re-install (no `--force`) | Existing files are skipped, new files are added                                                    |
| Re-install with `--force` | All files are overwritten with the example content                                                 |
| Layer examples            | Install one example, then another — non-overlapping files are added, overlapping files are skipped |
| Layer with `--force`      | Overlapping files are overwritten by the newer example                                             |
| After `afx-cli install`   | Example files coexist with skills — no conflicts                                                   |
| After `afx-cli --update`  | Example files (user content) are preserved untouched                                               |

> **Note:** `--force` overwrites files but never deletes files. If you layer `basic` then `full`, the basic-only files (`src/index.html`) remain even after a `--force` full install.

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
