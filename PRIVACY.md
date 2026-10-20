# AFX workflow privacy and data handling

This statement covers the AFX workflow skills, the afx-cli installer, and the generated Claude plugins in this repository. It does not cover the separately distributed VS Code extension or website.

## Project data

AFX skills instruct your coding agent to read project files and, when requested, create or update specifications, tasks, journals, code, and other project artifacts. These files can contain personal data such as participant names, account handles, and contributor information. The resulting files are stored in your workspace and may also enter your repository history or backups.

AFX does not operate a hosted backend for these skills and does not receive or retain your project data on an AFX service. Your coding agent and its host process project context under their own settings and privacy policies. Local files remain until you remove them; repository history, backups, and external services can retain additional copies under your control or their own policies.

## External services

Some workflows use your agent's tools and your existing authenticated accounts to interact with external services. In particular, task synchronization can create or update GitHub issues and checklists. Release and Git workflows can push commits or tags and publish GitHub releases, notes, and assets. These operations can send project content and contributor metadata to GitHub. The installer and plugin manager also contact GitHub to obtain AFX source and updates.

Research skills may use the host's browser or connected services to send search queries and retrieve information. Other project commands you ask the agent to run may contact services configured by your project. Review the intended content and destination before approving a transfer, and follow your host's tool permission controls. External services and your agent provider govern their own processing and retention; installing AFX does not replace those policies.

## Credentials

AFX does not require a separate AFX account or API key. Commands such as Git and the GitHub CLI use your existing authentication. Do not place secrets or unnecessary personal data in project documents, prompts, issues, or release assets.

## Support and deletion

You can remove local AFX skills, generated project files, and plugin installations through your installer, workspace, or plugin manager. Uninstalling does not delete project artifacts, Git history, or content already sent to external services. Manage those copies using the relevant repository or service controls.

For questions or to report a problem, use [AFX support](https://github.com/AgenticFlowX/afx/issues). Public issues are visible to others; do not include secrets or sensitive personal data.
