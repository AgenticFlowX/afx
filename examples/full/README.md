# RoomLedger — Full Example

A room rental condition evidence and approval workflow app demonstrating the complete AFX spec-driven development lifecycle.

## Features

4 spec-driven features covering the full rental inspection lifecycle:

| # | Feature | Spec |
| --- | --- | --- |
| 01 | Room Dashboard | `docs/specs/01-room-dashboard/` |
| 02 | Check-In Inspection | `docs/specs/02-check-in/` |
| 03 | Room History | `docs/specs/03-room-history/` |
| 04 | Check-Out Comparison | `docs/specs/04-check-out/` |

## Getting Started

```bash
# 1. Install AFX
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- .

# 2. Install this example
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- example full .

# 3. Review the specs
/afx-spec review docs/specs/01-room-dashboard

# 4. Start building
/afx-task pick docs/specs/01-room-dashboard
```

## Architecture Decision

See `docs/adr/ADR-001-state-management.md` for the decision to use in-memory state.

## Tech Stack

- Plain HTML, CSS, JavaScript — no frameworks, no build tools
- `src/index.html` — HTML structure for all 4 views
- `src/styles.css` — Design tokens, layout, components, themes
- `src/app.js` — State management, navigation, interactions

<!-- @see docs/specs/01-room-dashboard/spec.md -->
