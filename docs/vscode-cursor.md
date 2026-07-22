# VS Code and Cursor

Frappe Inspector provides Frappe Framework and ERPNext project analysis for VS Code and Cursor.

The extension uses the same shared analysis engine as the CLI, MCP server and GitHub Action.

## Installation

Download the latest VSIX from the cross-platform release:

https://github.com/Belius303/frappe-inspector-support/releases/tag/cross-platform-v1.0.1

The file is named:

`frappe-inspector-vscode-1.0.1.vsix`

### VS Code

1. Open the Extensions view.
2. Click the `...` menu.
3. Select **Install from VSIX...**
4. Select `frappe-inspector-vscode-1.0.1.vsix`.
5. Reload VS Code when prompted.

You can also install it from PowerShell:

```powershell
code --install-extension .\frappe-inspector-vscode-1.0.1.vsix
```

### Cursor

1. Open the Extensions view.
2. Click the `...` menu.
3. Select **Install from VSIX...**
4. Select `frappe-inspector-vscode-1.0.1.vsix`.
5. Reload Cursor when prompted.

When the Cursor command-line launcher is available:

```powershell
cursor --install-extension .\frappe-inspector-vscode-1.0.1.vsix
```

## Opening a project

Frappe Inspector supports:

- A complete Frappe Bench directory
- An individual Frappe application
- A workspace containing one or more Frappe applications

For best results, open the project root rather than an individual DocType directory.

Typical Bench layout:

```text
frappe-bench/
├── apps/
│   ├── frappe/
│   ├── erpnext/
│   └── custom_app/
├── sites/
└── Procfile
```

Typical application layout:

```text
custom_app/
├── custom_app/
│   ├── hooks.py
│   ├── modules.txt
│   └── custom_module/
│       └── doctype/
└── pyproject.toml
```

## Community features

The Community edition includes:

- Frappe and ERPNext project detection
- App, module and DocType discovery
- DocType explorer
- Navigation between related JSON, Python, JavaScript and test files
- Conservative DocType and field completion
- Basic diagnostics for unknown DocTypes and fields
- Basic `hooks.py` validation
- Basic `patches.txt` validation
- Local static analysis

Community features remain available without a license key.

## Pro features

A Universal Pro license unlocks advanced cross-platform analysis, including:

- Migration Safety Analyzer
- Git-reference and snapshot schema comparison
- Removed-field usage detection
- Link-target analysis
- Field type change detection
- Required, default and uniqueness change checks
- Custom Field support
- Property Setter effective-schema support
- Advanced hooks and fixture analysis
- Whitelisted-method analysis
- JSON and SARIF reports
- Advanced MCP tools
- GitHub Action migration mode

## Universal Pro license

Cross-platform products use a Universal Pro license key.

Do not post your license key in:

- Public GitHub issues
- Screenshots
- CI logs
- Public repositories
- Shared configuration files

Store it only in private editor settings, environment variables or secret managers.

## Updating the extension

1. Download the newer VSIX from the latest release.
2. Open the Extensions view.
3. Select **Install from VSIX...**
4. Choose the new file.
5. Reload the editor.

The new version replaces the previous installation.

## Verifying the download

The release includes `SHA256SUMS.txt`.

In PowerShell:

```powershell
Get-FileHash .\frappe-inspector-vscode-1.0.1.vsix -Algorithm SHA256
```

Compare the result with the corresponding line in `SHA256SUMS.txt`.

## Troubleshooting

### The project is not detected

Check that you opened:

- The Bench root
- The application root
- A workspace containing the complete application structure

Make sure files such as `hooks.py`, `modules.txt` or DocType JSON files are present.

### Diagnostics do not appear immediately

Try:

1. Save the current file.
2. Reload the editor window.
3. Reopen the project root.
4. Check the editor output and extension logs.

### A diagnostic looks incorrect

Open an issue and include:

- VS Code or Cursor version
- Frappe version
- ERPNext version, when relevant
- Frappe Inspector version
- Minimal sanitized example
- Expected behavior
- Actual behavior

Issue tracker:

https://github.com/Belius303/frappe-inspector-support/issues

Do not include private source code, credentials, customer information or license keys.

## Privacy

Project analysis is designed to run locally.

Privacy documentation:

https://github.com/Belius303/frappe-inspector-support/blob/main/docs/privacy.md
