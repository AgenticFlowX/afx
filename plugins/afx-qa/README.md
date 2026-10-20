# AgenticFlowX — afx-qa

QA Engineer role pack — testing, review, and quality assurance

This plugin contains AgenticFlowX skills for AI-assisted software development. The skills provide instructions and reference material for work in your project; they do not install the AFX command-line tool or the VS Code extension. The complete skill files and their supporting resources are included in this folder.

## Install in Claude Code

```text
/plugin marketplace add AgenticFlowX/afx
/plugin install afx-qa@afx
```

Restart Claude Code or run `/reload-plugins` after installation. The install command uses user scope by default; select project scope only when you want this plugin enabled for a particular project. The afx-cli installer remains available for Codex, Copilot, and compatible coding agents alongside this plugin. Avoid loading duplicate copies of the same skills into one agent.

This role pack can be used alongside `afx@afx`, the core spec-driven workflow plugin. Install the core plugin when you also want its specification, design, task, and session commands. Role pack commands use their own plugin namespace, as listed below.

## Skills

- `/afx-qa:qa-methodology`
- `/afx-qa:spec-test-planning`

## Source and license

Maintained by [AgenticFlowX](https://github.com/AgenticFlowX/afx). See the [project documentation](https://github.com/AgenticFlowX/afx#readme) for the workflow and other supported agents. This plugin is distributed under the MIT license; see [LICENSE](LICENSE) in this folder.
