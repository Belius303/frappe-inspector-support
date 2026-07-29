# VS Code and Cursor

Frappe Inspector adds Frappe Framework and ERPNext project awareness to VS Code and Cursor. It uses the same shared analysis engine as the CLI, MCP server and GitHub Action.

Current VS Code extension version: **1.2.2**.

Project files are read as text and are never executed by the extension.

## Installation

### VS Code Marketplace

Install [Frappe Inspector from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector).

### VSIX for Cursor or VS Code

Download the latest `frappe-inspector-vscode-*.vsix` from [GitHub Releases](https://github.com/Belius303/frappe-inspector-support/releases/latest).

In the editor:

1. Open the Extensions view.
2. Select the `...` menu.
3. Choose **Install from VSIX**.
4. Select the downloaded package.
5. Reload the editor when prompted.

Command line:

```shell
code --install-extension ./frappe-inspector-vscode-1.1.5.vsix
cursor --install-extension ./frappe-inspector-vscode-1.1.5.vsix
```

The extension requires VS Code or a compatible editor version `1.96` or newer.

## Quick start

1. Open a Frappe Bench or one Frappe application as the first workspace folder.
2. Run **Frappe Inspector: Scan Project** from the Command Palette.
3. Open the Frappe Inspector icon in the Activity Bar.
4. Browse DocTypes and review the Frappe Problems view.

Projects containing `hooks.py` or `sites/apps.txt` are detected automatically. Run **Scan Project** when opening a smaller app folder without one of those files.

## Community features

Community works without an account or license.

### Browse and navigate

- Explore apps, modules, DocTypes and fields.
- Open DocType or field JSON definitions.
- Use **Go to Definition** (`F12`) for recognized DocType and field strings.
- Receive Frappe-aware completion in supported API and form patterns.

### Interactive DocType graph

Run **Frappe Inspector: Show DocType Graph** or select the graph icon in the DocTypes view.

The graph:

- groups DocTypes by app and module;
- displays Link, Table and Table MultiSelect relationships;
- supports Link/Table filters, pan, zoom and layout controls;
- opens JSON source from DocTypes and relations;
- shows missing relation targets explicitly.

The VS Code/Cursor graph is included in Community.

### Diagnostics and Markdown

Community reports malformed DocType JSON, unknown Link targets, recognized unknown DocType references, invalid hooks and invalid patch entries.

Run **Frappe Inspector: Export Report** and choose **Markdown** for a Community report.

## Universal Pro features

Universal Pro adds:

- Git-ref schema comparison and migration safety;
- removed-field usage detection;
- type, Link-target, required/default and uniqueness checks;
- Custom Field and Property Setter effective-schema overlays;
- advanced recognized field and whitelisted-method diagnostics;
- JSON and SARIF exports.

The runtime wiring diff for hooks, DocType controllers, client script events and patches is currently a JetBrains Pro capability.

Purchase Universal Pro at [frappeinspector.xyz/pricing](https://frappeinspector.xyz/pricing). One Universal Pro subscription covers VS Code, Cursor, CLI, MCP and GitHub Action usage with up to three persistent devices.

### Activate

1. Run **Frappe Inspector: Activate Universal Pro**.
2. Paste the `FI-PRO-...` key received after purchase.
3. Use **Frappe Inspector: License Status** or **Manage Universal Pro** to review the local state.

The key and signed certificate are kept in VS Code Secret Storage.

### Compare with Git

1. Open the project inside its Git repository.
2. Set `frappeInspector.baseRef` if `origin/main` is not the correct baseline.
3. Run **Frappe Inspector: Compare With Git Ref**.
4. Confirm the baseline.

Git and a reachable local or remote ref are required.

### Manage devices and billing

- **Deactivate This Device** releases the activation and returns the editor to Community.
- **Open Billing Portal** opens the private customer account.

## Commands

| Command | Edition | Purpose |
| --- | --- | --- |
| Scan Project | Community | Scan the current workspace and refresh diagnostics |
| Show DocType Graph | Community | Explore Link and child-table relationships |
| Compare With Git Ref | Pro | Analyze migration changes against Git |
| Export Report | Community/Pro | Export Community Markdown or Pro JSON/SARIF |
| Activate Universal Pro | Community | Activate this installation |
| License Status | Community | Show the local feature state |
| Manage Universal Pro | Community | Review subscription, certificate and devices |
| Deactivate This Device | Community | Release the device activation |
| Open Billing Portal | Community | Open the customer account |

## Settings

| Setting | Default | Purpose |
| --- | --- | --- |
| `frappeInspector.scanOnSave` | `true` | Rescan supported project files after save |
| `frappeInspector.baseRef` | `origin/main` | Default migration baseline |
| `frappeInspector.severity` | `warning` | Minimum editor diagnostic severity |

## Updating

VS Code Marketplace installations update through the normal editor extension flow. For VSIX installations, download the latest release and install it over the existing version.

Verify downloaded artifacts against `SHA256SUMS.txt` from the same release.

## Troubleshooting

### Project not detected

- Open the Bench or application root.
- Confirm `hooks.py`, `sites/apps.txt`, `modules.txt` or DocType JSON files are present.
- Run **Frappe Inspector: Scan Project** manually.

### Diagnostics do not refresh

- Save the supported project file.
- Run **Scan Project**.
- Reload the editor window.
- Review the editor output logs.

### Incorrect result

Open an issue with the editor version, Frappe Inspector version, Frappe/ERPNext versions and a minimal sanitized example.

Never include private source, customer information, credentials or license keys. See [Privacy](privacy.md) and the [public issue tracker](https://github.com/Belius303/frappe-inspector-support/issues).
