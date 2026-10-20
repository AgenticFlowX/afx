---
afx: true
type: JOURNAL
owner: "@rix"
tags: [packs, install, skills, ecosystem, journal]
---

# Journal - AFX Pack System

<!-- prefix: PK -->

> Quick captures and discussion history for AI-assisted development sessions.
> See [agenticflowx.md](../../agenticflowx/agenticflowx.md) for workflow.

## Captures

<!-- Quick notes during active chat - cleared when recorded -->

- **2026-10-20T07:56:35.000Z — Claude directory data disclosures**: User approved completing the submission preparation and supplied a monitored contact email for the portal. Added a workflow-scoped privacy statement covering local personal data, workspace/repository retention, GitHub task/release transfers, host-managed research, credentials, and deletion limits. The builder now discloses those practices in every plugin README and emits documentation, privacy, and support URLs in plugin.json only. Bumped the catalog and generated output to 2.7.4. All five Node tests and strict Claude 2.1.304 validation of the marketplace and seven plugins passed. No hosted service terms were invented; MIT remains the software license. Publish and portal revalidation follow; legal acknowledgements require separate action-time confirmation.

- **2026-10-20T07:42:59.000Z — Claude directory policy cleanup**: The portal validated 2.7.2 at aafcc2b but reported six unrestricted Bash pre-approvals, one synthesized credential-forwarding hold, two name-confusion holds, and warnings for a missing icon and a download-and-run example. Source inspection confirmed that the named afx-validate helper reads Markdown/frontmatter and has no credential or network API; the portal combined it with the hello skill's documented curl pipeline. User authorized cleanup and icon work. The plugin builder now removes the broad Bash token from generated skill tool lists while preserving the canonical CLI tool policy. The hello skill links to CLI setup documentation instead of embedding the pipeline. Rendered the existing AFX vector artwork to a 1024-pixel square PNG, copied it into each plugin's .claude-plugin folder, and added dimension, size, byte-identity, shell-permission, and download-and-run regression checks. Bumped the catalog/generated manifests to 2.7.3. All five Node tests and strict Claude 2.1.304 validation for the marketplace and seven plugins passed. The afx namespace remains stable; name/fork ownership findings are reserved for human review. Portal re-validation follows publication.

- **2026-10-20T06:35:50.000Z — Claude marketplace and directory packaging audit**: Public `AgenticFlowX/afx` marketplace add/install succeeds on Claude Code 2.1.207 and exposes all 18 core skills; the reported installation failure is not reproduced. The existing local install is project-scoped, so availability in another project remains a scope-related hypothesis pending the exact error. Anthropic's current directory checklist requires a README in each submitted plugin folder; all seven generated folders lacked one. The builder now emits per-plugin READMEs and license files, and plugin versions live only in `plugin.json` to avoid duplicate version declarations. Added a packaging regression test and strict Claude validator checks to marketplace CI, clarified user/project scope and per-folder portal submission in the README, and changed Nx test examples to use the project's installed runner. Local strict validation passes on Claude Code 2.1.304 for the marketplace and all seven plugins; all seven also install with their expected skill inventories in isolated test profiles. These changes are unreleased: increment the catalog version and regenerate output before shipping; portal validation and directory review are still required.

- **2026-10-20T07:09:30.000Z — Claude Desktop GitHub import and installation verified**: User clarified that the failing path was GitHub repository installation in Claude, rather than the Claude Code CLI. Tested the current published `AgenticFlowX/afx` repository through Customize → Plugins → Add marketplace → Add from a repository. Sync succeeded and listed all seven plugins. Claude displayed “Auto-sync requires the Claude GitHub App to have access to this repository”; this was a notice about automatic updates, not an import failure. After explicit user approval, selected Add for the core plugin. Claude confirmed “Afx is installed and ready to use,” with the Afx switch on, version 2.7.1, and 18 skills. No GitHub App permissions were granted. This succeeded using the already-published repository; the local directory-submission packaging changes above have not been released. Added the verified Desktop/Cowork path and the auto-sync distinction to the README.

- **2026-10-20T07:19:35.000Z — Installation documentation aligned across repositories**: Updated the afx-site homepage, help page, and SDD guide plus the canonical afx-vscode README and its generated packaging copy. Replaced the obsolete `afx-agenticflowx` install address with `afx@afx`, documented plugin namespaces versus afx-cli command names, user/project scope, the verified Claude Desktop repository import and Add steps, the auto-sync access notice, and the separate public-directory submission process. Corrected the site to show the released VSIX's verified 18 core skills, both Architect skills, and the workflow's MIT license; removed the stale Gemini CLI support claim from the extension README. VS Code `pnpm verify` passed all 24 tasks. Local site checks passed for links, assets, and JavaScript on desktop/mobile, with the existing homepage mobile overflow unchanged. Documentation changes are local and pending coordinated publication with the workflow packaging fixes.

- **2026-10-20T07:21:42.000Z — CLI retained alongside Claude distribution**: User explicitly confirmed that afx-cli must remain available for Codex and compatible coding agents, with Claude added as another install option. Clarified this across the workflow README, generated plugin READMEs, extension README/packaging copy, and site install sections. Added an explicit CLI installer example to the extension README. Both distribution methods can serve different agents in the same project; the duplication warning applies to loading the same skills twice into one agent. Rebuilt all plugin output, passed all five Node tests and strict Claude 2.1.304 validation for the marketplace plus seven plugins, passed VS Code's 24 verification tasks, and rechecked site links/assets/JavaScript and desktop/mobile layout. Changes remain local and unreleased.

- **2026-10-20T07:26:22.000Z — Coordinated publication prepared**: User authorized committing and pushing the workflow, extension README, and site changes, with short commit titles and grouped bullet bodies. Bumped the workflow catalog and regenerated all seven plugin manifests to 2.7.2 so existing Claude installs can receive changed plugin content. Added the 2.7.2 changelog entry and repeated the five Node tests plus strict marketplace/plugin validation successfully. The extension change is documentation only and retains version 2.5.3. User requested guidance through Anthropic's directory submission after the pushes; the intended first submission is repository `AgenticFlowX/afx`, plugin path `plugins/afx`, tracked branch `main`.

---

## Discussions

<!-- Recorded discussions with IDs: PK-D001, PK-D002, etc. -->
<!-- Chronological order: oldest first, newest last -->

### PK-D001 - Spec Promotion from Research

`status:active` `2026-02-28T00:00:00.000Z` `[product, planning, research]`

**Context**: The pack system design in `res-skills-ecosystem-index.md` (Section 8) and the pack management research in `res-vscode-pack-management.md` reached sufficient maturity. The AFX-side infrastructure (afx-cli, pack manifests, index, skills directory) was split into its own spec as the counterpart to the vscode-toolbox UI spec.

**Summary**: Created spec covering 43 functional requirements across 7 areas: pack manifests, pack index, afx-cli CLI commands, skill type detection, .afx/ directory structure, .afx.yaml state management, AFX-built skills, and provider copy routing. This is purely the AFX repo infrastructure — the UI consumer is in the vscode-toolbox spec.

**Decisions**:

- Separate spec from vscode-toolbox — this covers AFX repo changes only
- 7 requirement areas: manifests, index, afx-cli, type detection, .afx/ structure, .afx.yaml state, AFX-built skills, provider routing
- Current afx-cli has zero pack support — all pack commands are net new
- `packs/` and `skills/` directories don't exist yet — both need to be created
- Index schema includes version and changelog (richer than the lean research version) per user edits to toolbox spec
- Open questions: download method (sparse checkout vs tarball), offline install, one-off skill tracking
- Deferred: quality scoring, version pinning

**Notes**:

- **[PK-D001.N1]** **[2026-02-28]** Split from vscode-toolbox spec. AFX-side = afx-cli + manifests + index + skills. VSCode-side = Toolbox UI. Both share the same constraints from research. `[product, spec]`
- **[PK-D001.N2]** **[2026-02-28]** User edited vscode-toolbox spec to add version + changelog to index.json schema, resolve OQ#2 (afx-cli not available → "Setup AFX" button), remove .afx.local.yaml references from FR-20/AC, add right-click "Preview Changes" to interaction map. These changes reflected in this spec's index schema. `[sync]`

**Related Files**: docs/research/res-skills-ecosystem-index.md, docs/research/res-vscode-pack-management.md, docs/specs/vscode-toolbox/spec.md, afx-cli
**Participants**: @rix, claude

### PK-D002 - Phase 1 & 2 Implementation + Antigravity Core Skills

`status:completed` `2026-02-28T00:00:00.000Z` `[implementation, antigravity]`

**Context**: Implementing Phase 1 (Manifests & Index) and Phase 2 (AFX-Built Skills) from the approved spec. During implementation, discovered that `.agent/skills/` (Google Antigravity core skills) was missing from the AFX repo — we had `.claude/commands/`, `.codex/skills/`, and `.github/prompts/` but no Antigravity equivalent.

**Summary**: Created 3 pack files (2 manifests + 1 index), 16 AFX-built skill files (4 skills × 4 provider variants), 13 Antigravity core skill files (mirroring `.codex/skills/`), and updated `afx-cli` to copy `.agent/skills/` as step 3/12.

**Decisions**:

- Antigravity core skills follow same pattern as Codex skills: lightweight SKILL.md wrappers pointing to `.claude/commands/` as source of truth
- No `openai.yaml` equivalent needed for Antigravity (only Codex has that)
- `afx-cli` step count: 11 → 12 after adding Antigravity
- `--skills-only` help text updated to include `.agent`
- CLAUDE.md repo structure updated with `.agent/`, `packs/`, `skills/`

**Participants**: @rix, claude

### PK-D003 - Phase 3 & 4 Implementation (afx-cli Pack Management)

`status:completed` `2026-02-28T00:00:00.000Z` `[implementation, afx-cli, pack-management]`

**Context**: Implementing Phase 3 (Download & Detection) and Phase 4 (State Management) — the full pack management system in afx-cli. This is the core CLI infrastructure that the VSCode Toolbox UI will consume.

**Summary**: Added ~1100 lines to afx-cli (767 → 1865 lines), implementing 30+ functions covering: argument parsing (14 new flags), manifest fetch via raw.githubusercontent.com, tarball download via codeload.github.com, skill type detection (5 types), item routing to `.afx/packs/{pack}/{provider}/`, name collision detection, gitignore management, bash-only YAML read/write for `.afx.yaml`, pack lifecycle (install/enable/disable/remove), individual skill enable/disable, pack list, bulk update, one-off skill install, and dry-run mode. All verified with `bash -n` — no syntax errors.

**Decisions**:

- Bash-only YAML parsing (grep/sed/awk) — no external dependencies required
- codeload.github.com tarballs for downloads — avoids git dependency
- `.afx/packs/{pack}/{provider}/` as master storage, provider dirs are derived copies
- Dry-run mode threads through all operations via `$DRY_RUN` flag
- Pack operations dispatch before core install logic and `exit 0` — mutually exclusive paths
- Preserved existing `git clone` fallback for remote execution (task 4.10 deferred item)
- `resolve_ref()` handles --version (auto-prefix v), --branch, default main with mutual exclusion

**Notes**:

- **[PK-D003.N1]** **[2026-02-28]** One task item deferred: "Replace git clone fallback with curl + tar for remote execution" (task 4.10, last checkbox). The existing git clone path works and was not touched. `[deferred]`

**Participants**: @rix, claude

### PK-D004 - Canonical SKILL.md Refactor (4× dedup)

`status:completed` `2026-02-28T00:00:00.000Z` `[refactor, skills, afx-cli]`

**Context**: User observed that Claude, Codex, Antigravity, and Copilot skill variants were 95% identical — only provider-specific command syntax differed. The 4× file duplication made maintenance harder.

**Summary**: Flattened each skill from 4 provider subdirectories to 1 canonical `SKILL.md` (16 files → 4). Added `transform_for_provider()` and `generate_copilot_agent()` to afx-cli with full documentation of sed patterns. Canonical files use `<!-- @afx:provider-commands -->` HTML comment markers to delineate provider-specific command lines. Updated design.md Section 3.7 with transform rules table and sed pattern reference.

**Decisions**:

- Claude format is canonical (uses `/afx-cmd sub` syntax)
- Codex: sed converts `/afx-cmd sub` → `afx-cmd-sub` (kebab-case)
- Antigravity: sed removes entire marked block (generic traceability lines remain)
- Copilot: auto-generated condensed `agent.md` from SKILL.md structure (extracts title, description, instruction items)
- Skills without `/afx-` commands (e.g., afx-spec-test-planning) have no markers — identical across Claude/Codex/Antigravity

**Participants**: @rix, claude

### PK-D005 - Full Test Suite + Bug Fixes

`status:completed` `2026-02-28T00:00:00.000Z` `[testing, bugs, afx-cli]`

**Context**: Comprehensive testing of afx-cli in `tmp/` covering all scenarios: fresh install, update, commands-only, transform functions, pack management, dry-run, help, and argument parsing.

**Summary**: Ran 8 test suites with 27 transform assertions (all passing). Found and fixed 3 bugs:

1. **Dispatch bug**: `--skill-disable NAME --pack PACK` was triggering `pack_install` because `--pack` was treated as an install target. Fixed by gating pack install on absence of `SKILL_DISABLE`/`SKILL_ENABLE`.
2. **resolve_ref exit propagation**: `local ref=$(resolve_ref)` masked the exit code because `local` always returns 0 (bash gotcha). Fixed by separating declaration from assignment: `local ref; ref=$(resolve_ref) || exit 1`.
3. **generate_copilot_agent description extraction**: `sed` range `/^# /,/^$/` captured heading-to-blank but description is AFTER the blank. Fixed with `awk 'NR>1 && /^[^#]/ && !/^$/ { print; exit }'`.

**Notes**:

- **[PK-D005.N1]** **[2026-02-28]** Pack install fails on network (expected — manifests not pushed to GitHub yet). Tested with simulated `.afx/` structure for enable/disable/remove/list. `[expected]`
- **[PK-D005.N2]** **[2026-02-28]** `.codex/skills/` is for AFX command wrappers only. Pack skills go to `.agents/skills/` (Codex/OpenAI runtime convention). Test fixture initially used wrong dir. `[clarification]`

**Participants**: @rix, claude

---

## Approval: Spec Approved (2026-02-28 04:35 UTC)

Spec approved and frozen. Further changes require version bump.

Approved by: automated validation
Review score: 100% compliant

Validation Summary:

- Structure: All required sections present
- Frontmatter: Valid
- Quality: 0 Critical issues

Next step: Create design PRD.

---
