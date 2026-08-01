# Frappe Inspector

> Understand Frappe projects faster. Change them with confidence. Catch unsafe migrations before production.

[![Latest release](https://img.shields.io/github/v/release/Belius303/frappe-inspector-support?display_name=tag)](https://github.com/Belius303/frappe-inspector-support/releases/latest)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/mohamedtazihnyine.frappe-inspector?label=VS%20Code)](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector)
[![GitHub issues](https://img.shields.io/github/issues/Belius303/frappe-inspector-support)](https://github.com/Belius303/frappe-inspector-support/issues)

[Website](https://frappeinspector.xyz) · [Benchmarks](docs/benchmarks.md) · [Pricing](https://frappeinspector.xyz/pricing) · [JetBrains](https://plugins.jetbrains.com/plugin/32992-frappe-inspector) · [VS Code](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector) · [MCP Registry](https://prod.registry.modelcontextprotocol.io/) · [GitHub Marketplace](https://github.com/marketplace/actions/frappe-inspector) · [Downloads](https://github.com/Belius303/frappe-inspector-support/releases/latest) · [Documentation](docs/getting-started.md)

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
- trace Frappe-aware security flows across local Python helpers, permission guards and sensitive sinks;
- explain findings with source, sink, related-location evidence and fix guidance;
- review pull requests and migration plans through MCP;
- give AI assistants deterministic, Frappe-aware context through a local MCP server.

Project analysis runs locally. Your source code is not uploaded to Frappe Inspector for analysis.

## Choose your workflow

| Surface | Best for | Get it |
| --- | --- | --- |
| JetBrains plugin | PyCharm and IntelliJ-based Frappe development | [JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector) |
| VS Code extension | Navigation, diagnostics and the interactive DocType graph | [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector) |
| Cursor | The same editor integration through Open VSX | [Open VSX](https://open-vsx.org/extension/mohamedtazihnyine/frappe-inspector) |
| CLI | Local scans, scripts, pre-commit hooks and CI | [npm package](https://www.npmjs.com/package/@frappe-inspector/cli) |
| MCP server | Frappe-aware tools for compatible AI clients | [MCP Registry](https://prod.registry.modelcontextprotocol.io/) · Search: `io.github.Belius303/frappe-inspector` |
| GitHub Action | Pull-request checks and migration safety | [GitHub Marketplace](https://github.com/marketplace/actions/frappe-inspector) |

The latest release contains the current cross-platform packages and SHA-256 checksums. VS Code/Cursor, the CLI and the MCP server are version **1.3.2**. The JetBrains plugin remains on **1.2.2** and is not part of this release.

Version 1.3.0 adds interprocedural Python analysis for high-impact Frappe security patterns, evidence-rich explanations in every Node client, and more precise handling of optional integrations and local helper functions. Findings from public repositories are treated as review candidates, not confirmed vulnerabilities.

## Public signals

Snapshot from official registries on 2026-07-30:

| Channel | Public signal |
| --- | ---: |
| Open VSX | 804 downloads |
| npm CLI | 523 weekly downloads |
| npm MCP | 511 weekly downloads |
| VS Code Marketplace | 76 downloads, 6 installs |
| JetBrains Marketplace | 52 downloads |
| GitHub Action | Live on Marketplace |

[Star or follow the public project](https://github.com/Belius303/frappe-inspector-support) to track releases, documentation and issues.

## Benchmark evidence

Frappe Inspector is benchmarked against Frappe-specific cases that generic Python scanners do not model: DocType schema, whitelisted endpoints, guest access, permission bypasses, hooks, patches and unsafe migrations.

Controlled benchmark snapshot for CLI/Core 1.3.2. Frappe Inspector includes 3 migration-only expectations; generic competitors use the 17-finding generic subset:

| Tool | Version | Scope | Expected | TP | FP | FN | Precision | Recall |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Frappe Inspector | 1.3.2 | Generic + migration | 20 | 20 | 0 | 0 | 100.0% | 100.0% |
| Bandit | 1.9.4 | Generic only | 17 | 2 | 3 | 15 | 40.0% | 11.8% |
| Semgrep | 1.172.0 | Generic only | 17 | 1 | 0 | 16 | 100.0% | 5.9% |

This is a Frappe-specific controlled benchmark, not a global claim over every static analyzer or project type. Generic tools are not penalized for unavailable migration baselines. The complete-bench public archive remains separate and measures repeatability/noise boundaries rather than current 1.3.2 accuracy.

See [Benchmark methodology and raw artifacts](docs/benchmarks.md).

## Quick start

### JetBrains

Install [Frappe Inspector from JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector), then open a Frappe Bench root or an individual Frappe application.

### VS Code

Install [Frappe Inspector from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector), then open a Frappe project. The extension activates when it detects common Frappe project files.

### Cursor

Install the same extension from [Open VSX](https://open-vsx.org/extension/mohamedtazihnyine/frappe-inspector).

See the complete [VS Code and Cursor guide](docs/vscode-cursor.md).

### CLI and MCP

Install the public npm packages, then follow:

- [CLI installation and usage](docs/cli.md)
- [MCP server setup](docs/mcp.md)
- [Open MCP Registry](https://prod.registry.modelcontextprotocol.io/) · Search: `io.github.Belius303/frappe-inspector`

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

Use the [GitHub Marketplace listing](https://github.com/marketplace/actions/frappe-inspector) or see the complete [CI guide](docs/ci.md) for schema comparison, migration checks and SARIF output.

## Example SARIF finding

```json
{
  "ruleId": "FI-MIGRATION-REQUIRED-FIELD",
  "level": "error",
  "message": {
    "text": "Sales Invoice.due_date is required but existing rows may not be backfilled."
  },
  "locations": [
    {
      "physicalLocation": {
        "artifactLocation": {
          "uri": "erpnext/patches/v15_0/backfill_due_date.py"
        },
        "region": {
          "startLine": 12
        }
      }
    }
  ]
}
```

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
- [Benchmark evidence](docs/benchmarks.md)
- [1.3.2 release notes](docs/release-v1.3.2.md)
- [1.3.1 benchmark release notes](docs/release-v1.3.1-benchmark.md)
- [60-second demo script](docs/demo-script.md)
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
