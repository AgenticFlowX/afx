# AgenticFlowX — afx

AgenticFlowX workflow skills — spec-driven development commands for all AI coding agents. Node.js 18+ enables optional structured document queries; targeted-search fallback remains available.

This plugin contains AgenticFlowX skills for AI-assisted software development. The skills provide instructions and reference material for work in your project; they do not install the AFX command-line tool or the VS Code extension. The complete skill files and their supporting resources are included in this folder.

## Install in Claude Code

```text
/plugin marketplace add AgenticFlowX/afx
/plugin install afx@afx
```

Restart Claude Code or run `/reload-plugins` after installation. The install command uses user scope by default; select project scope only when you want this plugin enabled for a particular project. The afx-cli installer remains available for Codex, Copilot, and compatible coding agents alongside this plugin. Avoid loading duplicate copies of the same skills into one agent.

Start with `/afx:hello` to verify the install. In a new project, use `/afx:scaffold init` to create the optional AFX configuration and document directories. Node.js 18+ enables the bundled document query helpers; targeted search remains available without Node.js.

## Skills

- `/afx:spec`
- `/afx:design`
- `/afx:task`
- `/afx:sprint`
- `/afx:dash`
- `/afx:dev`
- `/afx:check`
- `/afx:report`
- `/afx:session`
- `/afx:context`
- `/afx:next`
- `/afx:scaffold`
- `/afx:adr`
- `/afx:discover`
- `/afx:research`
- `/afx:hello`
- `/afx:help`
- `/afx:release`

## Source and license

Maintained by [AgenticFlowX](https://github.com/AgenticFlowX/afx). See the [project documentation](https://github.com/AgenticFlowX/afx#readme) for the workflow and other supported agents. This plugin is distributed under the MIT license; see [LICENSE](LICENSE) in this folder.
