---
name: afx-spec
description: Spec management — validate structure, analyze gaps, review quality, author design/tasks, and manage approval lifecycle
license: MIT
metadata:
  afx-owner: "@rix"
  afx-status: Living
  afx-tags: "workflow,spec,requirements,validation,lifecycle"
---

# /afx-spec

Specification management, review, authoring, and approval for spec-centric workflows.

## Configuration

**Read config** using two-tier resolution: `.afx/.afx.yaml` (managed defaults) + `.afx.yaml` (user overrides).

- `paths.specs` - Where spec files live (default: `docs/specs`)
- `paths.templates` - Where spec templates live (default: `docs/agenticflowx/templates`)

If neither file exists, use defaults.

## Usage

```bash
# Scaffolding
/afx-spec create <name>                     # Initialize new spec (delegates to /afx-init)

# Analysis (agent reasoning required)
/afx-spec validate <name>                   # Check spec structure integrity
/afx-spec gaps <name>                       # Requirements vs tasks gap analysis

# Collaboration (LLM-driven)
/afx-spec discuss <name>                    # Interactive gap analysis + journal capture
/afx-spec review <name>                     # Automated quality scoring

# Content Authoring (lifecycle-gated)
/afx-spec design <name>                     # Author design.md (requires spec approved)
/afx-spec tasks <name>                      # Author tasks.md (requires design approved)

# Approval Workflow
/afx-spec approve <name> [--design] [--reviewer "@handle"]  # Lifecycle gate + optional human sign-off
```

> **Note:** Spec listing, status, phase breakdown, and discussion browsing are available in the VSCode AFX extension (Specs Tree, Pipeline Tab, Tasks Tab, Journal Tab). These subcommands focus on operations that require agent reasoning.

## Purpose

Provides a spec-centric interface for managing specifications throughout their lifecycle. Focuses on operations that require agent reasoning — validation, gap analysis, quality review, content authoring, and approval workflows.

---

## Execution Contract (STRICT)

### Allowed

- Read/list/search files anywhere in workspace
- Create/update markdown artifacts only in:
  - `docs/specs/**` (spec files)
  - `docs/adr/**` (linked ADRs)
- Update `.afx.yaml` (feature registration, prefix assignment)

### Forbidden

- Create/modify/delete source code under `src/**`, `apps/**`, `packages/**`, `inf/**`
- Create/modify/delete folders (spec folders are scaffolded by `/afx-init`)
- Delete any spec files
- Run build/test/deploy/migration commands
- Modify runtime config used by application execution

If implementation is requested, return:

```text
Out of scope for /afx-spec (specification-management mode). Use /afx-dev code after spec approval.
```

---

## Lifecycle Preconditions (BLOCKING)

**CRITICAL**: The spec lifecycle enforces a strict authoring sequence. Content authoring into downstream documents is **blocked** until upstream documents are approved.

### Document Authoring Gates

| Target Document       | Precondition                          | Check                          |
| --------------------- | ------------------------------------- | ------------------------------ |
| `spec.md`             | None                                  | Always allowed (entry point)   |
| `design.md` (content) | `spec.md` status == `Approved`        | Read spec.md frontmatter       |
| `tasks.md` (content)  | `design.md` status == `Approved`      | Read design.md frontmatter     |
| `journal.md`          | None                                  | Always allowed (session log)   |

### Gate Enforcement

Before writing content to `design.md`, the agent **MUST**:

1. Read the `spec.md` frontmatter for the target feature
2. Check the `status` field
3. If `status` is NOT `Approved`, **STOP** and output:

```text
BLOCKED: Cannot author design.md content.

Precondition not met:
  spec.md status is "{current_status}" (required: "Approved")

Approve the spec first:
  /afx-spec review {name}
  /afx-spec approve {name}
```

Before writing content to `tasks.md`, the agent **MUST**:

1. Read the `design.md` frontmatter for the target feature
2. Check the `status` field
3. If `status` is NOT `Approved`, **STOP** and output:

```text
BLOCKED: Cannot author tasks.md content.

Precondition not met:
  design.md status is "{current_status}" (required: "Approved")

Approve the design first:
  /afx-spec design {name}
  /afx-spec approve {name} --design
```

### Scaffold vs Content

- **Scaffold** (template placeholders created by `/afx-init feature`): Always allowed. Empty template files are not content.
- **Content** (full technical design, task breakdowns, requirements): Gated behind approval.
- **journal.md**: Always writable — session capture is never gated.

### Approval Chain

```
spec.md (Draft → Approved)
  → /afx-spec design unlocked
    → design.md (Draft → Approved)
      → /afx-spec tasks unlocked
        → /afx-work plan available
```

---

## Documentation Principles

**CRITICAL RULE**: Maintain strict separation between State and Event/Log.

- **Living Documents (State)**: `spec.md` and `design.md` represent the _current factual state_ of the system. They must NOT contain historical backstory, abandoned ideas, or chronological narratives. Always overwrite them to reflect reality.
- **Historical Logs (Event)**: `journal.md` and `tasks.md` represent the _history_ of how the system evolved. All architectural decisions, failed experiments, and brainstorming belong in the append-only `journal.md`.

---

## Agent Instructions

### Persistence Checkpoint (MANDATORY)

Do not auto-write spec files. Before persisting any changes to `spec.md`, `design.md`, or `tasks.md`:

1. Present the proposed content to the user
2. Wait for explicit confirmation before writing
3. `journal.md` append-only entries may be written without checkpoint (session log)

### Next Command Suggestion (MANDATORY)

**CRITICAL**: After EVERY `/afx-spec` action, suggest the most appropriate next command based on context:

| Context                             | Suggested Next Command                                       |
| ----------------------------------- | ------------------------------------------------------------ |
| After `create`                      | `/afx-spec discuss <name>` to iterate on spec requirements   |
| After `validate` (passed)           | `/afx-spec review <name>` for quality check                  |
| After `validate` (failed)           | Fix missing files or broken links                            |
| After `gaps` (gaps found)           | `/afx-spec discuss <name>` to address gaps                   |
| After `gaps` (100% coverage)        | `/afx-spec review <name>` for quality check                  |
| After `discuss`                     | `/afx-spec review <name>` to validate changes                |
| After `review` (critical issues)    | `/afx-spec discuss <name>` to fix issues                     |
| After `review` (no critical issues) | `/afx-spec approve <name>` to approve spec                   |
| After `design`                      | `/afx-spec approve <name> --design` to approve design        |
| After `tasks`                       | `/afx-spec gaps <name>` to verify coverage                   |
| After `approve` (spec.md)           | `/afx-spec design <name>` to author design.md                |
| After `approve` (design.md)         | `/afx-spec tasks <name>` to author tasks.md                  |
| After `approve --reviewer`          | `/afx-work plan <name>` to generate implementation tasks     |

**Suggestion Format** (5 ranked options, ideal → less ideal):

```
Next (ranked):
  1. /afx-spec discuss docs/specs/{feature}    # Ideal: Iterate on spec
  2. /afx-spec review {feature}                # Review quality
  3. /afx-spec approve {feature}               # Approve if ready
  4. /afx-work pick {feature}                  # Start implementation
  5. /afx-session log "<note>"                # Capture findings
```

---

## Subcommands

### create <name>

**Purpose:** Initialize new spec (delegates to /afx-init)

**Lifecycle Gate:** None — `create` is the entry point.

**Implementation:**

1. Delegate to `/afx-init feature <name>` for scaffold (creates template files)
2. After scaffold, author **`spec.md` content only** (requirements, scope, acceptance criteria)
3. `design.md` and `tasks.md` remain as template scaffolds — content authoring is **blocked** until upstream documents are approved
4. `journal.md` gets initial discussion entry (always allowed)

**CRITICAL**: Do NOT author full `design.md` or `tasks.md` content during create. The spec must be reviewed, iterated, and approved first. Use `/afx-spec design <name>` and `/afx-spec tasks <name>` after approval.

**Next Command:**

- `/afx-spec discuss <name>` to iterate on spec requirements
- `/afx-spec review <name>` when ready for approval

---

### validate <name>

**Purpose:** Check spec structure integrity

**Implementation:**

1. Check required files exist:
   - `docs/specs/<name>/spec.md`
   - `docs/specs/<name>/design.md`
   - `docs/specs/<name>/tasks.md`
   - `docs/specs/<name>/journal.md`
2. Validate frontmatter in each file:
   - Has `afx: true`
   - Has correct `type` (SPEC, DESIGN, TASKS, JOURNAL)
   - Has `status` field
3. Check internal cross-references (delegate to `/afx-check links`)
4. Report findings:

```
Validation: user-authentication

File Structure: ✓ All 4 files present
Frontmatter: ✓ Valid in all files
Cross-references: ✓ All links valid

Status: PASSED
```

If validation fails:

```
Validation: user-authentication

File Structure: ✗ Missing files
  - tasks.md not found

Frontmatter: ✗ Invalid
  - spec.md: missing 'status' field
  - design.md: 'type' should be DESIGN, found SPEC

Status: FAILED (2 critical issues)
```

**Next Command:**

- If passed: `/afx-spec review <name>` for quality check
- If failed: Fix listed issues, then re-validate

---

### gaps <name>

**Purpose:** Analyze requirements vs tasks gap — find missing task coverage and orphaned tasks

**Implementation:**

1. Extract requirements from `spec.md` (FR-xxx, NFR-xxx, US-xxx)
2. Extract tasks from `tasks.md` with their `@see` references
3. Cross-reference:
   - Find requirements without corresponding tasks (gaps)
   - Find tasks without requirement links (orphans)
   - Calculate coverage percentage
4. Output gap analysis:

```
Gap Analysis: user-authentication

Requirements Coverage: 6/8 (75%)

Requirements WITH Tasks:
  ✓ FR-1: Login (tasks 2.1, 2.2)
  ✓ FR-2: Password reset (task 3.1)
  ✓ FR-3: Email validation (task 2.1)
  ✓ FR-5: Logout (task 2.3)
  ✓ NFR-1: Performance (task 4.1)
  ✓ NFR-2: Security (task 2.2)

Requirements WITHOUT Tasks (GAPS):
  ✗ FR-4: Password complexity
  ✗ NFR-3: Token expiry

Orphaned Tasks (no requirement link):
  ⚠ Task 1.1: Setup database schema

Recommendations:
  1. Add task for FR-4 (password complexity)
  2. Add task for NFR-3 (token expiry)
  3. Link task 1.1 to a requirement or remove if unnecessary
```

**Next Command:**

- If gaps found: `/afx-spec discuss <name>` to address gaps
- If orphans found: Edit tasks.md to add `@see` links or remove tasks
- If 100% coverage: `/afx-spec review <name>` for quality check

---

### discuss <name>

**Purpose:** Interactive spec discussion and collaborative gap analysis

**Implementation:**

1. **Load Context**
   - Read all 4 spec files (spec.md, design.md, tasks.md, journal.md)
   - Parse requirements, design decisions, tasks, previous discussions

2. **Analyze for Issues**
   - Vague requirements (lacks acceptance criteria)
   - Missing non-functional requirements (performance, security, scalability, UX)
   - Design decisions without rationale
   - Tasks without clear acceptance criteria
   - Inconsistencies between spec.md and design.md
   - Edge cases not addressed (error handling, validation, limits)
   - Ambiguous terminology
   - **Historical context in living documents**: Spec or Design contains chronological history (should be in Journal)

3. **Present Findings**

   ```
   Spec Discussion: user-authentication

   Issues Identified (5):

   1. [QUALITY] Vague Requirement (FR-1)
      "Users can log in with email and password"
      → Missing acceptance criteria
      → What happens on failure? After 3 attempts? 5 attempts?

   2. [GAP] Missing NFR (Security)
      → No requirement for session timeout
      → No requirement for brute-force protection

   3. [CONSISTENCY] Design vs Spec Mismatch
      design.md mentions OAuth, but spec.md only requires email/password

   4. [EDGE CASE] Error Handling Not Specified
      → What if email service is down during password reset?
      → How to handle concurrent login attempts?

   5. [AMBIGUOUS] Terminology Inconsistency
      spec.md uses "login", design.md uses "authentication", tasks.md uses both
   ```

4. **Ask Clarifying Questions** (use AskUserQuestion)
   - "FR-1: Should we implement account lockout after N failed attempts? If so, how many attempts and lockout duration?"
   - "NFR: What's the acceptable session timeout duration? 15 min? 24 hours?"
   - "Design: Should we support OAuth in addition to email/password, or postpone OAuth to v2?"
   - "Edge Case: For password reset, if email delivery fails, should we retry? Queue? Show user error?"

5. **Capture Discussion** in journal.md

   ```markdown
   ## Discussion: Spec Review (2024-01-15 14:30)

   ### Issues Identified

   - FR-1 lacks acceptance criteria (failure scenarios, lockout policy)
   - Missing NFRs: session timeout, brute-force protection
   - Design mentions OAuth but spec doesn't require it
   - Edge case: email service downtime during password reset
   - Terminology inconsistency: login vs authentication

   ### Questions & Answers

   - Q: Account lockout after failed attempts?
   - A: Yes, 5 attempts → 15 min lockout

   - Q: Session timeout duration?
   - A: 24 hours idle timeout

   - Q: OAuth support in v1?
   - A: No, postpone to v2. Remove OAuth from design.md

   - Q: Email delivery failure handling?
   - A: Queue retry (3 attempts), show generic success message to user

   ### Decisions Made

   - Add NFR for session timeout (24h idle)
   - Add NFR for brute-force protection (5 attempts → 15 min lockout)
   - Remove OAuth from design.md (v2 feature)
   - Use "authentication" consistently across all docs

   ### Action Items

   - [ ] Update spec.md: Add acceptance criteria to FR-1
   - [ ] Update spec.md: Add NFR for session timeout
   - [ ] Update spec.md: Add NFR for brute-force protection
   - [ ] Update design.md: Remove OAuth section
   - [ ] Update design.md: Add email retry queue design
   - [ ] Update all docs: Replace "login" with "authentication"
   ```

**Next Command:**

- `/afx-spec review <name>` after edits made
- Edit spec files to address action items

---

### review <name>

**Purpose:** Comprehensive automated spec review with issue detection

**Implementation:**

1. **Completeness Check**
   - spec.md has all required sections (Overview, Requirements, Success Criteria)
   - design.md has architecture description (data models, API endpoints, algorithms)
   - tasks.md maps to all design sections
   - journal.md has initial rationale

2. **Quality Check**
   - Requirements are testable (acceptance criteria defined)
   - Design decisions have documented rationale
   - Tasks have clear completion criteria
   - No orphaned requirements (not referenced in design)
   - No orphaned design sections (not referenced in tasks)
   - **Living document purity**: spec.md and design.md are free of historical narrative

3. **Consistency Check**
   - Terminology consistent across spec/design/tasks
   - Requirements numbering sequential (no gaps)
   - Cross-references valid (all `@see` links exist)
   - Phase definitions align across documents

4. **Gap Analysis**
   - Missing NFRs (performance, security, scalability, UX, accessibility)
   - Edge cases not addressed (errors, timeouts, race conditions)
   - Error handling not specified
   - Data validation rules missing
   - Integration points not defined

5. **Risk Analysis**
   - High-risk requirements (complex, uncertain, external dependencies)
   - Dependencies on external systems
   - Assumptions that need validation

6. **Output Report**

   ```
   Review: user-authentication

   Score: 72% compliant

   Critical Issues (2):
     [COMPLETENESS] spec.md missing "Success Criteria" section
     [QUALITY] FR-1 not testable - lacks acceptance criteria

   Major Issues (4):
     [GAP] Missing NFR for security (session timeout)
     [GAP] Missing NFR for performance (login response time SLA)
     [CONSISTENCY] Terminology mismatch: spec.md uses "login", design.md uses "auth"
     [QUALITY] design.md contains historical backstory about choosing the auth provider (move to journal.md)

   Minor Issues (5):
     [QUALITY] Task 2.1 could have clearer acceptance criteria
     [CONSISTENCY] Phase numbering skips from 2 to 4 (missing 3)
     [GAP] Edge case: email service downtime not addressed
     [GAP] Missing accessibility NFR (WCAG compliance)
     [RISK] External dependency: email service (SendGrid) - SLA unknown

   Recommendations:
     1. Fix 2 Critical issues before approval
     2. Add missing NFRs for security and performance
     3. Standardize terminology to "authentication"
     4. Address email service downtime scenario
     5. Document SendGrid SLA or add fallback plan
   ```

**Next Command:**

- If Critical issues exist: `/afx-spec discuss <name>` to fix issues
- If no Critical issues: `/afx-spec approve <name>` to approve spec

---

### design <name>

**Purpose:** Author technical design document from approved spec

**Lifecycle Gate:** `spec.md` status MUST be `Approved`.

**Gate Enforcement:**

Before authoring, the agent **MUST**:

1. Read `spec.md` frontmatter for the target feature
2. Check the `status` field
3. If `status` is NOT `Approved`, **STOP** and output:

```text
BLOCKED: Cannot author design.md content.

Precondition not met:
  spec.md status is "{current_status}" (required: "Approved")

Approve the spec first:
  /afx-spec review {name}
  /afx-spec approve {name}
```

**Implementation:**

1. **Read Approved Spec**
   - Load `spec.md` — extract requirements (FR-xxx, NFR-xxx), user stories, acceptance criteria, dependencies
   - Load `journal.md` — extract any design discussions or decisions already captured

2. **Generate Design Content**
   - Architecture overview (system components, boundaries, data flow)
   - Data models / schemas (derived from requirements)
   - API contracts / interfaces (if applicable)
   - Component design (mapping each FR to a design section)
   - NFR strategies (how each NFR is addressed architecturally)
   - Integration points and external dependencies
   - Error handling strategy
   - Design decisions with rationale (link to ADRs if they exist)

3. **Persistence Checkpoint** (MANDATORY)
   - Present the proposed design.md content to the user
   - Wait for explicit confirmation before writing
   - Do NOT auto-write

4. **Write design.md**
   - Replace scaffold content with authored design
   - Preserve frontmatter (update `last_verified` timestamp)
   - Ensure every design section links back to spec requirements via `@see`

5. **Update journal.md**
   - Append entry recording design authoring session

**Output Format:**

```markdown
# {Feature} - Technical Design

@see docs/specs/{feature}/spec.md

## Architecture Overview
{High-level system design}

## Data Models
{Schemas, entities, relationships}

## Component Design

### {Component 1}
@see spec.md#FR-1
{Design details}

### {Component 2}
@see spec.md#FR-2
{Design details}

## NFR Strategies

### Performance
@see spec.md#NFR-1
{How performance targets are met}

### Security
@see spec.md#NFR-2
{Security approach}

## Error Handling
{Error scenarios and recovery strategies}

## Design Decisions
{Key decisions with rationale — promote to ADR if significant}
```

**Next Command:**

- `/afx-spec approve <name> --design` to approve the design
- `/afx-spec review <name>` to validate design quality
- `/afx-spec discuss <name>` to iterate on design issues

---

### tasks <name>

**Purpose:** Author implementation task breakdown from approved design

**Lifecycle Gate:** `design.md` status MUST be `Approved`.

**Gate Enforcement:**

Before authoring, the agent **MUST**:

1. Read `design.md` frontmatter for the target feature
2. Check the `status` field
3. If `status` is NOT `Approved`, **STOP** and output:

```text
BLOCKED: Cannot author tasks.md content.

Precondition not met:
  design.md status is "{current_status}" (required: "Approved")

Approve the design first:
  /afx-spec design {name}
  /afx-spec approve {name} --design
```

**Implementation:**

1. **Read Approved Spec + Design**
   - Load `spec.md` — extract requirements for traceability
   - Load `design.md` — extract components, interfaces, data models
   - Load `journal.md` — extract any task-related decisions

2. **Generate Task Breakdown**
   - Organize into phases (setup, core, integration, testing, docs)
   - Each task must have:
     - Clear description of what to implement
     - `@see` link to design.md section AND spec.md requirement
     - Acceptance criteria (how to verify the task is done)
     - Two verification columns: `[Agent]` and `[Human]`
   - Order tasks by dependency (setup before core, core before integration)
   - Identify parallelizable tasks within each phase

3. **Persistence Checkpoint** (MANDATORY)
   - Present the proposed tasks.md content to the user
   - Wait for explicit confirmation before writing
   - Do NOT auto-write

4. **Write tasks.md**
   - Replace scaffold content with authored tasks
   - Preserve frontmatter (update `last_verified` timestamp)

**Output Format:**

```markdown
# {Feature} - Implementation Tasks

@see docs/specs/{feature}/spec.md
@see docs/specs/{feature}/design.md

## Work Sessions

| Session | Date | Tasks | Agent | Human |
|---------|------|-------|-------|-------|

## Phase 1: Setup

### 1.1 {Task title}
@see design.md#{section}
@see spec.md#FR-{n}

- [ ] [Agent] {What to implement}
- [ ] [Human] {What to verify}

**Acceptance criteria:**
- {Criterion 1}
- {Criterion 2}

## Phase 2: Core Implementation

### 2.1 {Task title}
@see design.md#{section}
@see spec.md#FR-{n}

- [ ] [Agent] {What to implement}
- [ ] [Human] {What to verify}

## Phase 3: Testing & Verification

### 3.1 {Task title}
...
```

**Next Command:**

- `/afx-spec gaps <name>` to verify all requirements have tasks
- `/afx-work plan <name>` to start implementation

---

### approve <name> [--design] [--reviewer "@handle"]

**Purpose:** Mark spec or design as approved (automated validation + status change), with optional human sign-off

**Modes:**

- `/afx-spec approve <name>` — approve `spec.md` (unlocks `/afx-spec design`)
- `/afx-spec approve <name> --design` — approve `design.md` (unlocks `/afx-spec tasks`)
- `/afx-spec approve <name> --reviewer "@handle"` — add human sign-off (requires spec already approved)

**Optional Arguments (with `--reviewer`):**

- `--scope "description"` - What is being approved (default: "Full spec")
- `--notes "context"` - Additional review notes

**Lifecycle Gate:**

- `approve` (spec.md): No precondition — spec is the entry point
- `approve --design`: `spec.md` status must be `Approved`
- `approve --reviewer`: `spec.md` status must be `Approved`

**Implementation (spec.md — default):**

1. **Check Current Status**
   - Read spec.md frontmatter
   - If already "Approved", exit with error: "Spec already approved. Use version bump to modify."

2. **Pre-Approval Validation**
   - Run `/afx-spec validate <name>` (structure check)
   - Run `/afx-spec review <name>` (quality check)
   - Count Critical issues from review

3. **Approval Decision**
   - If Critical issues > 0: **BLOCK APPROVAL**

     ```text
     Approval BLOCKED: user-authentication

     Cannot approve with Critical issues:
       [COMPLETENESS] spec.md missing "Success Criteria" section
       [QUALITY] FR-1 not testable - lacks acceptance criteria

     Fix these issues first, then run:
       /afx-spec review user-authentication
       /afx-spec approve user-authentication
     ```

   - If Critical issues = 0: **APPROVE**

     ```text
     Approved: user-authentication (spec.md)

     ✓ Validation passed (structure intact)
     ✓ Review passed (0 Critical issues)
     ✓ Status changed: Draft → Approved
     ✓ Spec frozen (further changes require version bump)
     ✓ Journal updated with approval record
     ✓ /afx-spec design UNLOCKED

     Note: 3 Major and 5 Minor issues remain. Address in future versions if needed.
     ```

4. **Update spec.md Frontmatter**

   ```yaml
   ---
   afx: true
   type: SPEC
   status: Approved # Changed from Draft
   owner: "@alice"
   version: 1.0
   approved_at: "2024-01-15T14:30:00.000Z" # Added timestamp
   ---
   ```

5. **Freeze spec.md**
   - Add comment at top:

     ```markdown
     <!-- APPROVED: 2024-01-15 - Do not edit without version bump -->
     ```

6. **Add Journal Entry**

   ```markdown
   ## Approval: Spec Approved (2024-01-15 14:30)

   Spec approved and frozen. Further changes require version bump.
   /afx-spec design now unlocked.

   Approved by: Claude (automated validation)
   Review score: 72% compliant (0 Critical, 3 Major, 5 Minor issues)

   Next step: `/afx-spec design <name>`
   ```

**Implementation (design.md — with `--design` flag):**

1. **Check Lifecycle Precondition**
   - Read `spec.md` frontmatter
   - If `spec.md` status is NOT `Approved`: **BLOCK**

     ```text
     Approval BLOCKED: Cannot approve design.md

     Precondition not met:
       spec.md status is "Draft" (required: "Approved")

     Approve the spec first:
       /afx-spec approve user-authentication
     ```

2. **Check Design Status**
   - Read `design.md` frontmatter
   - If already "Approved", exit with error: "Design already approved."

3. **Approve Design**
   - Update `design.md` frontmatter: `status: Draft → Approved`
   - Add `approved_at` timestamp
   - Add journal entry recording design approval

     ```text
     Approved: user-authentication (design.md)

     ✓ spec.md is Approved (precondition met)
     ✓ design.md status changed: Draft → Approved
     ✓ /afx-spec tasks UNLOCKED
     ✓ Journal updated with design approval record
     ```

**Implementation (human sign-off — with `--reviewer` flag):**

1. **Validate Preconditions**
   - Spec status must be "Approved" (automated approval first)
   - If not approved, exit with error

2. **Record Sign-Off in journal.md**

   ```markdown
   ## Sign-Off: Human Approval (2024-01-15 15:00)

   Reviewed and approved by: @alice
   Timestamp: 2024-01-15T15:00:00.000Z
   Scope: Full spec (functional requirements, design architecture, task breakdown)

   Approval attestation:
   ✓ Requirements are clear and complete
   ✓ Design approach is sound
   ✓ Tasks cover all requirements
   ✓ Acceptance criteria are testable

   Review notes: Looks good for v1. Address brute-force protection in v1.1.

   Signed: @alice
   ```

3. **Update spec.md Frontmatter**

   ```yaml
   ---
   afx: true
   type: SPEC
   status: Approved
   owner: "@alice"
   reviewer: "@alice" # Added reviewer
   approved_at: "2024-01-15T14:30:00.000Z"
   signed_at: "2024-01-15T15:00:00.000Z" # Added sign-off timestamp
   version: 1.0
   ---
   ```

**Next Command:**

- After spec approval: `/afx-spec design <name>` to author design.md
- After design approval: `/afx-spec tasks <name>` to author tasks.md
- After human sign-off: `/afx-work plan <name>` to generate implementation tasks

---

## Error Handling

### Common Errors

1. **Spec Not Found**

   ```
   Error: Spec "payment-flow" not found

   Searched in: docs/specs/payment-flow/
   Available specs: user-auth, api-gateway

   Did you mean:
     /afx-spec create payment-flow
   ```

2. **Missing Files**

   ```
   Error: Incomplete spec structure

   Missing files:
     - docs/specs/user-auth/tasks.md
     - docs/specs/user-auth/journal.md

   Run this to reinitialize:
     /afx-init feature user-auth
   ```

3. **Approval Blocked**

   ```
   Error: Cannot approve spec with Critical issues

   Fix these first:
     [COMPLETENESS] spec.md missing "Success Criteria"
     [QUALITY] FR-1 lacks acceptance criteria

   Then run:
     /afx-spec review user-auth
     /afx-spec approve user-auth
   ```

4. **Already Approved**

   ```
   Error: Spec already approved

   To modify an approved spec:
     1. Increment version in spec.md
     2. Remove "<!-- APPROVED -->" comment from spec.md
     3. Make changes
     4. Run /afx-spec approve user-auth again
   ```

5. **Invalid Subcommand**

   ```
   Error: Unknown subcommand "list"

   Available subcommands: create, validate, gaps, discuss, review, design, tasks, approve

   Tip: Spec listing and status are available in the VSCode AFX extension (Specs Tree sidebar).
   ```

---

## Related Commands

### From Other Commands → `/afx-spec`

- `/afx-init feature` → Suggest `/afx-spec discuss <name>` after creation
- `/afx-task verify` → Suggest `/afx-spec gaps` if gaps detected
- `/afx-check links` → Suggest `/afx-spec validate` for full validation

### From `/afx-spec` → Other Commands

- `/afx-spec create` → Suggest editing spec.md to define requirements
- `/afx-spec approve` (spec) → Suggest `/afx-spec design <name>`
- `/afx-spec approve` (design) → Suggest `/afx-spec tasks <name>`
- `/afx-spec gaps` → Suggest `/afx-work plan` if tasks missing
- `/afx-spec approve --reviewer` → Suggest `/afx-work pick` to start implementation

---

## Notes

- Focuses on operations requiring agent reasoning — display-only operations are handled by the VSCode AFX extension
- Follows AFX patterns: YAML frontmatter, subcommand structure, agent instructions
- Delegates scaffolding to `/afx-init` (create)
- Interactive `discuss` and automated `review` ensure spec quality before approval
- Unified `approve` command handles automated approval, design approval, and human sign-off via flags
