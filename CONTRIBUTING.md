# Contributing to AFX

Thank you for your interest in contributing to AFX (AgenticFlowX)!

## How to Contribute

### Reporting Issues

- Use GitHub Issues to report bugs or suggest features
- Include clear reproduction steps for bugs
- For feature requests, explain the use case and the workflow gap it addresses

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Test your changes in a real project (see Testing below)
5. Update the CHANGELOG
6. Commit with a clear message (see Commit Conventions below)
7. Push to your fork and open a Pull Request

## Development Setup

1. Clone the repository
2. Install skills into a test project:
   ```bash
   ./afx-cli /path/to/your-test-project
   ```
3. Open the test project with Claude Code (or your preferred agent)
4. Run the skill you modified and verify the output

## Testing Skills

Skills are markdown prompt files — there is no build step. Verify changes by:

1. **Install locally**: `./afx-cli --source . /path/to/test-project`
2. **Trigger the skill** in your test project and confirm the agent follows the updated instructions
3. **Check frontmatter**: confirm `name`, `description`, `license`, and `metadata` fields are valid YAML
4. **Check templates**: if you modified an `assets/` template, scaffold a new feature and verify the generated file matches the template

## Commit Conventions

Use conventional commit format:

```
feat(afx-session): add capture subcommand for verbatim prompt storage
fix(afx-task): correct gate check in verify subcommand
docs(cheatsheet): add Core/Support command tiering
chore(packs): update agenticflowx pack manifest
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`

## Code Style

- Keep skill instructions clear and unambiguous — agents follow them literally
- Follow existing patterns in SKILL.md files (frontmatter, Execution Contract, Post-Action Checklist)
- Document the `why` in comments when a constraint is non-obvious
- Update `cheatsheet.md` when adding or renaming commands

## Documentation

- Update `docs/agenticflowx/` when changing skill behavior
- Update `prd-reference.md` when adding or removing subcommands
- Add entries to `CHANGELOG.md` for every user-visible change
- Keep the cheatsheet current — it is the first reference most users reach for

## Changelog

Every PR that changes skill behavior, adds a command, or fixes a bug must include a `CHANGELOG.md` entry under `## [Unreleased]`.

## Questions?

Open an issue for any questions about contributing.
