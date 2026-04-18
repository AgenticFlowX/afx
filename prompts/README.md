# AFX Prompts

This directory contains **copy-paste snippets** for integrating AFX into your project's agent context files.

These are not skills — they are fragments you add to `CLAUDE.md`, `AGENTS.md`, or `GEMINI.md` in your target project. The AFX CLI installer handles this automatically; these files exist for manual integration or selective adoption.

## Files

| File                   | Purpose                                                                  | Add to                                       |
| ---------------------- | ------------------------------------------------------------------------ | -------------------------------------------- |
| `complete.md`          | Full AFX integration — all rules, commands, and traceability conventions | `CLAUDE.md` (replaces default)               |
| `bootstrap.md`         | Kickoff prompt to scaffold a first spec from a raw idea                  | Paste directly into Claude Code / your agent |
| `workflow-commands.md` | AFX command reference only — no traceability rules                       | `CLAUDE.md` (append)                         |
| `code-traceability.md` | `@see` annotation rules and format only                                  | `CLAUDE.md` (append)                         |
| `yaml-frontmatter.md`  | Frontmatter schema and timestamp rules only                              | `CLAUDE.md` (append)                         |
| `agents.md`            | Multi-agent routing and handoff conventions                              | `AGENTS.md`                                  |
| `gemini.md`            | Gemini CLI–specific setup                                                | `GEMINI.md`                                  |

## Usage

**Full install (recommended):** Use the AFX CLI — it selects and installs the right snippets based on your agent choices:

```bash
curl -sL https://raw.githubusercontent.com/AgenticFlowX/afx/main/afx-cli | bash -s -- .
```

**Manual / selective:** Copy the content of the relevant file and append it to your context file. Example:

```bash
cat prompts/code-traceability.md >> /path/to/your/project/CLAUDE.md
```

**Kickoff prompt (`bootstrap.md`):** Paste directly into your AI assistant's chat — no file needed. It prompts the agent to scaffold a spec from a raw idea.
