# AFX Examples — RoomLedger

Example projects showcasing **AgenticFlowX spec-driven development**, built around a single cohesive app: **RoomLedger**.

## What is RoomLedger?

RoomLedger is a room rental condition evidence and approval workflow app. It solves one narrow trust problem: proving room condition at check-in, maintaining a repair and damage history during occupancy, and closing the rental with a side-by-side approval flow.

The app is designed for informal room-rental arrangements where an owner and a renter need a shared record of what the room looked like before, during, and after occupancy.

### The Rental Lifecycle

```
 PRE-MOVE-IN          CHECK-IN             OCCUPIED              CHECK-OUT
┌──────────────┐   ┌──────────────┐   ┌──────────────────┐   ┌──────────────┐
│ Owner takes  │──>│ Compare      │──>│ Log issues       │──>│ Compare      │
│ baseline     │   │ owner vs     │   │ Track repairs    │   │ baseline vs  │
│ photos       │   │ renter photos│   │ Record events    │   │ move-out     │
└──────────────┘   └──────┬───────┘   └──────────────────┘   └──────┬───────┘
                          │                                         │
                   ┌──────v───────┐                          ┌──────v───────┐
                   │ Owner  ✓     │                          │ Owner  ✓     │
                   │ Renter ✓     │                          │ Renter ✓     │
                   │ Baseline     │                          │ Exit         │
                   │ approved     │                          │ approved     │
                   └──────────────┘                          └──────────────┘
```

### Features (4 views)

| #   | Feature                  | What it does                                                                                                                                  |
| --- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | **Room Dashboard**       | At-a-glance summary: room status, workflow progress, KPI metrics, approval responsibilities, sidebar navigation, role switching, theme toggle |
| 02  | **Check-In Inspection**  | Side-by-side owner vs renter photo comparison, flag mismatch or approve baseline, photo-angle checklist                                       |
| 03  | **Room History**         | Vertical timeline of incidents and repairs during occupancy, form to add new events, status tracking (Reported / In Progress / Resolved)      |
| 04  | **Check-Out Comparison** | Baseline vs move-out photo comparison, dispute or approve exit, bilateral owner + renter sign-off ledger                                      |

### Design

- **Two roles**: Owner and Renter, switched via a simulated login toggle
- **Light and dark themes**: warm neutral base with teal accent, CSS custom properties
- **Responsive**: 2-column desktop shell (280px sidebar + content), collapses to single column on mobile
- **No external dependencies**: plain HTML, CSS, and JavaScript — no frameworks, no build tools
- **In-memory state**: all state resets on refresh (except theme preference)

### Color Palette

| Token         | Light     | Dark      |
| ------------- | --------- | --------- |
| Background    | `#f5f3ef` | `#151412` |
| Surface       | `#fcfbf8` | `#1d1b18` |
| Accent (teal) | `#0f766e` | `#53b5aa` |
| Warning       | `#b45309` | `#f59e0b` |
| Danger        | `#b42318` | `#f97066` |
| Success       | `#2f6f3e` | `#6fcf97` |
| Owner         | `#155eef` | `#7db0ff` |
| Renter        | `#7c3aed` | `#bf8bff` |

---

## How the Examples are Structured

Three progressive tiers of the **same app**, each at a different stage of the AFX spec-driven workflow:

```
afx/examples/
├── README.md
├── starter/         <-- Spec only (Draft design)
├── basic/           <-- Spec + Approved design + tasks + scaffold
└── full/            <-- Complete project: 4 features + ADR + scaffolds
```

### `starter/` — What does a spec look like?

A single feature spec (`01-room-dashboard`) showing the AFX 4-file structure before any design or implementation work begins.

```
starter/
└── docs/specs/01-room-dashboard/
    ├── spec.md       # Approved — FR/NFR tables, user stories, acceptance criteria
    ├── design.md     # Draft — section anchors only, not yet filled in
    ├── tasks.md      # Empty template — waiting for design approval
    └── journal.md    # One discussion entry
```

**What you learn:** The spec.md is the entry point. It defines _what_ to build — requirements, constraints, and acceptance criteria — before any design decisions are made.

**Next step:** Run `/afx-design author` to fill in the design from the approved spec.

### `basic/` — Ready to build

The same dashboard feature, but the design is fully authored and the tasks are detailed enough for deterministic code generation. Includes an empty scaffold file.

```
basic/
├── src/
│   └── index.html                # Empty scaffold (doctype + @see links)
└── docs/specs/01-room-dashboard/
    ├── spec.md                    # Approved
    ├── design.md                  # Approved — full design: layout, tokens, components
    ├── tasks.md                   # Detailed phased tasks with acceptance criteria
    └── journal.md                 # Session log
```

**What you learn:** The design.md is the blueprint — color tokens, grid rules, component specs, interaction behavior. The tasks.md breaks implementation into ordered steps that reference specific FRs and DES sections. An AI agent can pick up any task and produce consistent output.

**Next step:** Run `/afx-task pick docs/specs/01-room-dashboard` to start building.

### `full/` — Complete project (source of truth)

All 4 features with approved specs, designs, and tasks. The numbered directories show the rental lifecycle progression.

```
full/
├── README.md
├── src/
│   ├── index.html                 # Empty scaffold
│   ├── styles.css                 # Empty scaffold with @see links
│   └── app.js                     # Empty scaffold with @see links
└── docs/
    ├── specs/
    │   ├── 01-room-dashboard/     # Dashboard: hero, KPIs, room card, approvals
    │   ├── 02-check-in/           # Photo comparison + baseline approval
    │   ├── 03-room-history/       # Timeline + issue entry form
    │   └── 04-check-out/          # Exit comparison + bilateral sign-off
    └── adr/
        └── ADR-001-state-management.md
```

**What you learn:** How multiple feature specs coordinate on one codebase. Cross-feature dependencies are declared in frontmatter (`depends_on`). The ADR documents a key architecture decision. The `@see` annotations in scaffold files show how code links back to specs.

**Next step:** Run `/afx-task pick docs/specs/01-room-dashboard` to build feature by feature.

---

## Each Example is Self-Contained

Install any example alone and it works — no need to install them in sequence:

```bash
# Just the dashboard spec
afx-cli example starter .

# Dashboard ready to build
afx-cli example basic .

# Complete 4-feature project
afx-cli example full .
```

They can also be layered progressively (`starter` → `basic` → `full`), where later tiers add or upgrade files.

---

## Quick Start

```bash
# 1. Create a new project and install AFX
mkdir my-project && cd my-project
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- .

# 2. Install the full example
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- example full .

# 3. Verify setup
/afx-hello

# 4. Review the specs
/afx-spec review docs/specs/01-room-dashboard

# 5. Start building
/afx-task pick docs/specs/01-room-dashboard
```

## Install Modes

### Remote (recommended)

```bash
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- example basic .
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- example full ./demo
```

### Specific branch or version

```bash
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- --branch develop example full .
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- --version 2.5.2 example basic .
```

---

## AFX Workflow Commands

Once an example is installed, use these commands to explore the spec-driven workflow:

| Command                        | What it does                                   |
| ------------------------------ | ---------------------------------------------- |
| `/afx-hello`                   | Verify AFX setup and project health            |
| `/afx-spec review <feature>`   | Review spec quality and compliance             |
| `/afx-design author <feature>` | Author design.md from approved spec (starter)  |
| `/afx-task pick <feature>`     | Pick next task and start building (basic/full) |
| `/afx-task verify <task>`      | Verify implementation against spec             |
| `/afx-check trace`             | Audit `@see` traceability annotations          |
| `/afx-adr list`                | List architecture decision records             |

## The AFX Value Proposition

These examples demonstrate that **specs detailed enough produce consistent output**:

1. **spec.md** defines _what_ — requirements, constraints, acceptance criteria
2. **design.md** defines _how_ — layout, tokens, components, interactions
3. **tasks.md** defines _when_ — ordered implementation steps with `@see` links
4. An AI agent picks up a task, reads the spec and design, and generates code that meets the acceptance criteria — deterministically

No pre-built code is included. The specs _are_ the product. The code is generated from them.

---

## What You'll End Up With

After running `/afx-task pick` through all tasks, you'll have a working static web app that you can open directly in a browser (`src/index.html`):

- A **280px sidebar** with brand header, Owner/Renter role switcher, 4-view navigation, and theme toggle
- A **dashboard** showing room status, workflow timeline, 4 KPI cards, room summary with thumbnail grid, and approval responsibility panels
- A **check-in view** with 3-column photo comparison (owner baseline, renter baseline, result) and a photo-angle checklist
- A **room history view** with a vertical timeline of incidents/repairs and a form to add new events that appear instantly in the timeline
- A **check-out view** with baseline vs move-out comparison, dispute/approve actions, and a bilateral sign-off ledger that tracks owner and renter independently
- **Light and dark themes** that toggle instantly via CSS custom properties
- **Responsive layout** that collapses gracefully from desktop to mobile
- **Zero build step** — open `index.html` in any browser, fully offline

The entire app runs from 3 files: `index.html`, `styles.css`, and `app.js`.

## What RoomLedger is NOT

RoomLedger is a **prototype for validating the interaction model**, not a production app. It intentionally does not include:

- **No real authentication** — Owner/Renter is a simulated toggle, not separate accounts
- **No file uploads** — photos are placeholder thumbnails, not real images
- **No database or backend** — all state lives in JavaScript variables and resets on refresh
- **No multi-room support** — one room, one property, one inspection cycle
- **No notifications** — no email, push, or in-app alerts
- **No deposit or financial logic** — the app records condition, not money
- **No PDF or print export** — screen-only workflow

These are listed as **Non-Goals** in each spec's "Out of Scope" section. The prototype proves the workflow works before any of these capabilities are added.
