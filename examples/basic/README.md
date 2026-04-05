<!-- @see docs/specs/landing-page/spec.md -->

# Basic Example

A spec-driven personal landing page built with [AgenticFlowX](https://github.com/agenticflowx/afx).

This example includes everything from the `starter/` example (the spec files) **plus** a skeleton `src/index.html` that the spec drives. It demonstrates the full loop: spec defines requirements, code implements them with `@see` traceability links back to the spec.

## Quick Start

```bash
# 1. Install AFX in this directory
afx-cli .

# 2. Read the spec to understand what you're building
/afx-spec review docs/specs/landing-page

# 3. Generate a design from the spec
/afx-design generate docs/specs/landing-page

# 4. Plan implementation tasks
/afx-task plan docs/specs/landing-page

# 5. Pick your first task and start coding
/afx-task pick docs/specs/landing-page
```

## File Structure

```
basic/
├── README.md                              # This file
├── src/
│   └── index.html                         # Landing page (implements the spec)
└── docs/
    └── specs/
        └── landing-page/
            ├── spec.md                    # Feature specification (FR/NFR tables)
            ├── design.md                  # Technical design (template)
            ├── tasks.md                   # Implementation tasks (template)
            └── journal.md                 # Session log
```

## What to Try

| Command | What it does |
| --- | --- |
| `/afx-spec review docs/specs/landing-page` | Review the spec for completeness |
| `/afx-design generate docs/specs/landing-page` | Generate a technical design from the spec |
| `/afx-task plan docs/specs/landing-page` | Create implementation tasks from the spec |
| `/afx-task pick docs/specs/landing-page` | Pick the next task to work on |
| `/afx-check trace` | Audit `@see` traceability links in the code |

## How It Works

1. **spec.md** defines the requirements (hero section, about section, social links, responsive layout)
2. **src/index.html** implements those requirements with `@see` comments linking back to specific FRs
3. AFX commands help you navigate, verify, and extend the implementation while staying aligned with the spec

Open `src/index.html` in a browser to see the landing page, then use AFX to iterate on it.
