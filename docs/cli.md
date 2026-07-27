# Frappe Inspector CLI

The Frappe Inspector CLI runs framework-aware Frappe and ERPNext static analysis from a terminal.

Current npm package: [`@frappe-inspector/cli`](https://www.npmjs.com/package/@frappe-inspector/cli), version **1.1.4**.

## Requirements

- Node.js 20 or newer
- npm
- A Frappe Bench directory or individual Frappe application

## Installation

Install globally:

```shell
npm install --global @frappe-inspector/cli
frappe-inspector --help
```

Or install in a project:

```shell
npm install --save-dev @frappe-inspector/cli
npx frappe-inspector --help
```

Audited `.tgz` packages and SHA-256 checksums are also available from [GitHub Releases](https://github.com/Belius303/frappe-inspector-support/releases/latest).

## Community scan

Community analysis does not require a license:

```shell
frappe-inspector scan .
```

Write a Markdown report:

```shell
frappe-inspector scan . --format markdown --output frappe-inspector.md
```

Choose the minimum severity that fails the process:

```shell
frappe-inspector scan . --fail-on warning
```

## Universal Pro

Universal Pro adds migration comparison, snapshot baselines, advanced references, Custom Field and Property Setter overlays, plus JSON and SARIF reports.

Activate the device:

```shell
frappe-inspector license activate FI-PRO-XXXX-XXXX-XXXX-XXXX-XXXX
frappe-inspector license status
```

Refresh or deactivate it:

```shell
frappe-inspector license refresh
frappe-inspector license deactivate
```

The stored key and certificate use `~/.frappe-inspector/license.json` with user-only permissions. Deactivation releases both CLI and MCP access for the device.

For temporary automation, use `FRAPPE_INSPECTOR_LICENSE_KEY` or `--license-file`. Explicit environment or file credentials are used ephemerally and are not persisted by the CLI.

PowerShell:

```powershell
$env:FRAPPE_INSPECTOR_LICENSE_KEY = "FI-PRO-..."
frappe-inspector diff . --base-ref origin/main
Remove-Item Env:FRAPPE_INSPECTOR_LICENSE_KEY
```

## Compare with Git

Compare the working tree with a Git ref:

```shell
frappe-inspector diff . --base-ref origin/main
```

Generate SARIF:

```shell
frappe-inspector diff . \
  --base-ref origin/main \
  --format sarif \
  --output frappe-inspector.sarif
```

Include safe additions:

```shell
frappe-inspector diff . --base-ref origin/main --include-safe
```

## Snapshot baseline

Create a portable baseline:

```shell
frappe-inspector snapshot . --output .frappe-inspector/snapshot.json
```

Compare against it:

```shell
frappe-inspector diff . --baseline .frappe-inspector/snapshot.json
```

## Options

```text
-f, --format pretty|markdown|json|sarif
-o, --output <file>
    --base-ref <git-ref>
    --baseline <snapshot.json>
    --fail-on note|warning|error
    --license-file <file>
    --include-safe
-h, --help
```

JSON and SARIF require Universal Pro. Pretty and Markdown output are available for Community scans.

## Exit codes

| Code | Meaning |
| :---: | --- |
| `0` | The configured threshold is clear |
| `1` | Findings reached the configured threshold |
| `2` | Invalid arguments, discovery failure or another execution error |
| `3` | The requested capability requires Universal Pro |

## Updating and uninstalling

```shell
npm install --global @frappe-inspector/cli@latest
npm uninstall --global @frappe-inspector/cli
```

For a local dependency, omit `--global`.

## Privacy

Project files are read locally and are not executed. Universal Pro activation and refresh communicate with the Frappe Inspector license service; see [Privacy](privacy.md).

Report bugs with sanitized reproduction details in the [public issue tracker](https://github.com/Belius303/frappe-inspector-support/issues). Never include private source, customer data, credentials or license keys.
