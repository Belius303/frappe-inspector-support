# Frappe Inspector

Framework-aware tooling for Frappe Framework and ERPNext across JetBrains IDEs, VS Code, Cursor, the command line, MCP clients and GitHub Actions.

Frappe Inspector connects project concepts that general-purpose tools usually see as unrelated files: DocType JSON schemas, Python controllers, client scripts, hooks, patches, fixtures, Custom Fields, Property Setters, permissions and migrations.

The goal is simple: help developers understand a Frappe project faster and catch risky changes before they reach production.

## Available surfaces

| Surface | Status | Distribution |
| --- | --- | --- |
| JetBrains plugin | Available | [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector) |
| VS Code extension | Available as VSIX | [Cross-platform v1.0.1 release](https://github.com/Belius303/frappe-inspector-support/releases/tag/cross-platform-v1.0.1) |
| Cursor | Available through the same VSIX | [Installation guide](docs/vscode-cursor.md) |
| CLI | Available as an audited npm tarball | [CLI guide](docs/cli.md) |
| Local MCP server | Available as an audited npm tarball | [MCP guide](docs/mcp.md) |
| GitHub Action | Available | [Belius303/frappe-inspector-action](https://github.com/Belius303/frappe-inspector-action) |

## What it analyzes

- Frappe Bench installations and individual applications
- Apps, modules, DocTypes and fields
- Related JSON, Python, JavaScript and test files
- `hooks.py` and `patches.txt`
- Link, Dynamic Link and Table relationships
- Custom Fields and Property Setters
- Whitelisted methods
- Schema changes and migration risks
- References to removed fields
- Link-target, type, required/default and uniqueness changes
- Machine-readable reports for supported Pro workflows

## Community and Pro

Community features remain available without a paid license and after a Pro license expires.

Community focuses on project discovery, navigation, exploration and conservative static diagnostics. Pro focuses on project-wide inference, schema comparison, migration safety, advanced Frappe metadata and automation.

See the complete comparison: [Community vs Pro](docs/free-vs-pro.md).

## Quick start

### JetBrains

Install [Frappe Inspector from JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector), then open either a Frappe Bench root or an individual Frappe application.

### VS Code or Cursor

Download `frappe-inspector-vscode-1.0.1.vsix` from the [cross-platform release](https://github.com/Belius303/frappe-inspector-support/releases/tag/cross-platform-v1.0.1), then choose **Install from VSIX** in the editor.

Full instructions: [VS Code and Cursor](docs/vscode-cursor.md).

### CLI and MCP

Download the corresponding `.tgz` packages from the release and install them locally or globally with npm.

- [CLI guide](docs/cli.md)
- [MCP guide](docs/mcp.md)

### GitHub Action

Use the public Action at:

Belius303/frappe-inspector-action@v1
Full workflow example: CI setup.

Release integrity

The cross-platform release includes SHA256SUMS.txt.

Verify an artifact in PowerShell with:

Get-FileHash .\frappe-inspector-vscode-1.0.1.vsix -Algorithm SHA256

Compare the result with the matching line in SHA256SUMS.txt.

Privacy

Project analysis is designed to run locally.

Do not post private source code, customer data, database dumps, API keys, credentials or paid-license keys in public issues.

Read the privacy policy.

Support and feedback

Use GitHub Issues for:

Bug reports
Feature requests
Compatibility problems
False-positive diagnostics
Performance reports
Documentation corrections

Clear criticism and improvement ideas are welcome.

Reports should include:

Editor and version
Frappe or ERPNext version
Minimal reproduction steps
Sanitized logs where relevant
Links
JetBrains Marketplace
Cross-platform v1.0.1 release
GitHub Action
Documentation
Issue tracker
Community vs Pro
EULA

Frappe Inspector is an independent third-party project and is not affiliated with or endorsed by Frappe Technologies, ERPNext, JetBrains, Microsoft, Cursor or GitHub.
