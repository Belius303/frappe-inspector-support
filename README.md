# Frappe Inspector

> Understand Frappe projects faster. Change them with confidence. Catch unsafe migrations before production.

[![Latest release](https://img.shields.io/github/v/release/Belius303/frappe-inspector-support?display_name=tag)](https://github.com/Belius303/frappe-inspector-support/releases/latest)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/mohamedtazihnyine.frappe-inspector?label=VS%20Code)](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector)
[![GitHub issues](https://img.shields.io/github/issues/Belius303/frappe-inspector-support)](https://github.com/Belius303/frappe-inspector-support/issues)

[Website](https://frappeinspector.xyz) · [Pricing](https://frappeinspector.xyz/pricing) · [JetBrains](https://plugins.jetbrains.com/plugin/32992-frappe-inspector) · [VS Code](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector) · [Downloads](https://github.com/Belius303/frappe-inspector-support/releases/latest) · [Documentation](docs/getting-started.md)

Frappe Inspector is a framework-aware static analysis suite for **Frappe Framework** and **ERPNext** projects. It connects the files and concepts that general-purpose tools usually treat separately: DocType JSON, Python controllers, client scripts, hooks, patches, fixtures, Custom Fields, Property Setters, permissions and migrations.

It is available for JetBrains IDEs, VS Code, Cursor, the command line, MCP clients and GitHub Actions.

## Why Frappe Inspector?

A schema edit that looks harmless can break code far away from the DocType definition. Frappe Inspector helps surface those relationships before the change reaches production.

It can help you:

- explore apps, modules, DocTypes and fields from your editor;
- jump between DocType JSON, controllers, client scripts and tests;
- validate common `hooks.py` and `patches.txt` patterns;
- inspect Link, Dynamic Link and child-table relationships;
- account for Custom Fields and Property Setters in the effective schema;
- find references to removed fields;
- compare a project against a Git ref or snapshot;
- review changed hooks, DocType controllers, client script events and patches between two commits in JetBrains Pro;
- detect risky type, link-target, required/default and uniqueness changes;
- generate Markdown, JSON and SARIF reports for supported workflows;
- give AI assistants deterministic, Frappe-aware context through a local MCP server.

Project analysis runs locally. Your source code is not uploaded to Frappe Inspector for analysis.

## Choose your workflow

| Surface | Best for | Get it |
| --- | --- | --- |
| JetBrains plugin | PyCharm and IntelliJ-based Frappe development | [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector) |
| VS Code extension | Navigation, diagnostics and the interactive DocType graph | [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector) |
| Cursor | The same editor integration through the VSIX package | [Latest release](https://github.com/Belius303/frappe-inspector-support/releases/latest) |
| CLI | Local scans, scripts, pre-commit hooks and CI | [CLI guide](docs/cli.md) |
| MCP server | Frappe-aware tools for compatible AI clients | [MCP guide](docs/mcp.md) |
| GitHub Action | Pull-request checks and migration safety | [Action repository](https://github.com/Belius303/frappe-inspector-action) |

The latest release contains the current cross-platform packages and SHA-256 checksums. The current suite version is **1.2.1**; JetBrains includes the runtime wiring diff, while VS Code, CLI and MCP share the corrected 1.2.1 runtime metadata.

## Quick start

### JetBrains

Install [Frappe Inspector from JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector), then open a Frappe Bench root or an individual Frappe application.

### VS Code

Install [Frappe Inspector from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector), then open a Frappe project. The extension activates when it detects common Frappe project files.

### Cursor

Download the latest `frappe-inspector-vscode-*.vsix` from [Releases](https://github.com/Belius303/frappe-inspector-support/releases/latest), then use **Install from VSIX**.

See the complete [VS Code and Cursor guide](docs/vscode-cursor.md).

### CLI and MCP

Download the current `.tgz` packages from [Releases](https://github.com/Belius303/frappe-inspector-support/releases/latest), then follow:

- [CLI installation and usage](docs/cli.md)
- [MCP server setup](docs/mcp.md)

### GitHub Action

Start with the free Community scan:

```yaml
name: Frappe checks

on:
  pull_request:

permissions:
  contents: read

jobs:
  inspect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Belius303/frappe-inspector-action@v1
        with:
          mode: scan
          path: .
```

For schema comparison, migration checks and SARIF output, see the complete [CI guide](docs/ci.md).

## Community vs Pro

**Community helps you navigate and understand a Frappe project. Pro helps you change it safely.**

| Capability | Community | Pro |
| --- | :---: | :---: |
| Project detection and DocType explorer | ✓ | ✓ |
| Related JSON, Python, JavaScript and test navigation | ✓ | ✓ |
| Conservative static diagnostics | ✓ | ✓ |
| Basic hooks and patches validation | ✓ | ✓ |
| CLI human-readable scan | ✓ | ✓ |
| Migration Safety Analyzer |  | ✓ |
| Git-ref and snapshot schema comparison |  | ✓ |
| Git runtime wiring diff in JetBrains |  | ✓ |
| Removed-field and advanced reference analysis |  | ✓ |
| Custom Field and Property Setter effective schema |  | ✓ |
| Interactive DocType graph in VS Code/Cursor | ✓ | ✓ |
| Interactive DocType graph in JetBrains |  | ✓ |
| JSON and SARIF reports |  | ✓ |
| GitHub Action migration mode |  | ✓ |
| Advanced MCP analysis tools |  | ✓ |

Community features remain available without a paid license and after a Pro license expires. See the [full Community vs Pro comparison](docs/free-vs-pro.md) and [pricing](https://frappeinspector.xyz/pricing).

## Documentation

- [Getting started](docs/getting-started.md)
- [VS Code and Cursor](docs/vscode-cursor.md)
- [CLI](docs/cli.md)
- [MCP server](docs/mcp.md)
- [GitHub Actions and CI](docs/ci.md)
- [Analysis rules](docs/rules.md)
- [Community vs Pro](docs/free-vs-pro.md)
- [Runtime wiring diff](docs/runtime-wiring-diff.md)
- [Changelog](docs/changelog.md)
- [Privacy](docs/privacy.md)
- [EULA](docs/eula.md)

## Support and feedback

Use [GitHub Issues](https://github.com/Belius303/frappe-inspector-support/issues) for bug reports, feature requests, compatibility problems, false positives, performance reports and documentation corrections.

Please include:

- editor and editor version;
- Frappe or ERPNext version;
- minimal reproduction steps;
- sanitized logs when relevant.

Do not post private source code, customer data, database dumps, credentials, API keys or license keys in public issues.

Frappe Inspector is an independent third-party project and is not affiliated with or endorsed by Frappe Technologies, ERPNext, JetBrains, Microsoft, Cursor or GitHub.
