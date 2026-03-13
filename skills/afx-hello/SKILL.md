# AFX Hello

Your friendly neighborhood vibe check. Verifies AFX is installed, detects your provider, and gives a quick project health snapshot.

## Activation

This skill activates when the user asks:

- "Is AFX working?"
- "Hello AFX"
- "Vibe check"
- "Check my setup"

## Instructions

When activated, perform these steps:

### 1. Detect Environment

Identify which AI coding tool you are running as:

- **Claude Code** — you're inside Claude's CLI or IDE extension
- **Codex CLI** — you're OpenAI's Codex agent
- **Antigravity** — you're Anthropic's Antigravity agent
- **GitHub Copilot** — you're a Copilot agent

### 2. Read Project Config

Check for `.afx.yaml` in the project root. If found, extract:

- `version` — which AFX version/branch is installed
- `providers` — which providers are enabled
- `packs` — which packs are installed and their status

If `.afx.yaml` is missing, note that AFX is not installed.

### 3. Scan for Specs

Look for `docs/specs/` and count:

- Total features (directories under `docs/specs/`)
- Features with all four files (spec.md, design.md, tasks.md, journal.md)
- Incomplete features (missing any of the four files)

### 4. Report

Output a concise report in this format:

```
 _____ _____ _  _
|  _  |   __|_'_|
|     |   __| _ |     AgenticFlowX
|__|__|__|  |_'_|     vibe check passed

Provider:   {detected provider}
Version:    {version from .afx.yaml}
Providers:  {comma-separated enabled providers}
Packs:      {count} installed ({pack names})
Specs:      {count} features ({complete} complete, {incomplete} incomplete)

Everything looks good. Ship it.
```

If something is off (no .afx.yaml, no specs, no packs), replace the last line with a helpful suggestion:

- No `.afx.yaml` → "Run the AFX installer to get started."
- No specs → "Create your first feature with /afx:init feature <name>"
- No packs → "Install a pack with: ./install.sh --pack qa ."

### AFX Integration

<!-- @afx:provider-commands -->
- Use `/afx:discover capabilities` for a deeper project overview
- Use `/afx:work status` to check current work state
<!-- @afx:/provider-commands -->
