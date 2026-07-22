# Frappe Inspector CLI

The Frappe Inspector CLI runs framework-aware Frappe and ERPNext analysis from a terminal.

It can be used for:

- Local project scans
- Pre-commit checks
- Development scripts
- CI pipelines
- Project metadata inspection
- Report generation

## Download

Download the CLI package from:

https://github.com/Belius303/frappe-inspector-support/releases/tag/cross-platform-v1.0.1

The package is named:

`frappe-inspector-cli-1.0.1.tgz`

## Requirements

- Node.js 20 or newer is recommended
- npm
- A Frappe Bench directory or Frappe application

Check your installed versions:

```powershell
node --version
npm --version
```

## Installation

### Global installation

From the directory containing the downloaded package:

```powershell
npm install --global .\frappe-inspector-cli-1.0.1.tgz
```

Check that the command is available:

```powershell
frappe-inspector --help
```

### Local project installation

```powershell
npm install --save-dev .\frappe-inspector-cli-1.0.1.tgz
```

Run it with:

```powershell
npx frappe-inspector --help
```

### Run from the package without a global installation

```powershell
npx --package .\frappe-inspector-cli-1.0.1.tgz frappe-inspector --help
```

## Basic scan

Run the CLI from the project root:

```powershell
frappe-inspector scan .
```

Or provide an explicit path:

```powershell
frappe-inspector scan C:\Projects\frappe-bench
```

For a local installation:

```powershell
npx frappe-inspector scan .
```

## Community analysis

Community mode performs conservative static checks without requiring a paid license.

It can analyze:

- Project structure
- Apps and modules
- DocTypes and fields
- Related source files
- Basic field references
- Basic hooks configuration
- Patch entries

Example:

```powershell
frappe-inspector scan .
```

## Pro analysis

Universal Pro unlocks advanced analysis such as:

- Schema comparison
- Migration safety analysis
- Removed-field usage detection
- Link-target changes
- Field type changes
- Required, default and uniqueness changes
- Custom Fields
- Property Setters
- Advanced whitelisted-method analysis
- JSON and SARIF reports

Use the license mechanism supported by your installed CLI version.

Keep license keys out of command history, public scripts and repositories.

A PowerShell environment variable can be used where supported:

```powershell
$env:FRAPPE_INSPECTOR_LICENSE_KEY = "YOUR_PRIVATE_LICENSE_KEY"
```

Do not commit this value.

## Git-reference analysis

The Pro migration analyzer can compare the current project with a Git reference.

Typical references include:

- `main`
- `origin/main`
- `HEAD~1`
- `v1.0.0`

Check the exact options supported by the installed version:

```powershell
frappe-inspector --help
```

```powershell
frappe-inspector scan --help
```

Command options may evolve between releases.

## Reports

Supported Pro workflows can generate machine-readable reports such as:

- JSON
- SARIF
- Markdown

SARIF can be used by compatible CI and code-scanning systems.

A report should only be considered successfully generated when:

- The CLI exits successfully
- The expected output file exists
- The file contains valid report data

## Exit codes

The CLI can be used in automation by checking its process exit code.

PowerShell example:

```powershell
frappe-inspector scan .

if ($LASTEXITCODE -ne 0) {
    Write-Error "Frappe Inspector reported a failure."
    exit $LASTEXITCODE
}
```

A non-zero exit code may indicate:

- Invalid command arguments
- Project discovery failure
- Analysis errors
- Findings above the configured threshold
- License validation failure for a Pro-only operation

## Updating

Uninstall the previous global version:

```powershell
npm uninstall --global frappe-inspector
```

Install the newer package:

```powershell
npm install --global .\frappe-inspector-cli-NEW_VERSION.tgz
```

For a local dependency, install the newer tarball using npm.

## Uninstalling

Global installation:

```powershell
npm uninstall --global frappe-inspector
```

Local installation:

```powershell
npm uninstall frappe-inspector
```

## Verifying the package

The release includes `SHA256SUMS.txt`.

Run:

```powershell
Get-FileHash .\frappe-inspector-cli-1.0.1.tgz -Algorithm SHA256
```

Compare the result with the corresponding line in `SHA256SUMS.txt`.

## Troubleshooting

### Command not found

Check npm's global installation directory:

```powershell
npm prefix --global
```

Restart the terminal after installation.

You can also try:

```powershell
npx frappe-inspector --help
```

### The wrong project is scanned

Pass the complete project path explicitly:

```powershell
frappe-inspector scan C:\Projects\frappe-bench
```

### The scan reports false positives

Open an issue and include:

- Operating system
- Node.js version
- Frappe Inspector version
- Frappe and ERPNext versions
- Sanitized project structure
- Command used
- Expected result
- Actual result

Issue tracker:

https://github.com/Belius303/frappe-inspector-support/issues

Do not post private source code, database contents, credentials or license keys.

## Privacy

The CLI is designed for local project analysis.

Privacy documentation:

https://github.com/Belius303/frappe-inspector-support/blob/main/docs/privacy.md
