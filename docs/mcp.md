# Frappe Inspector MCP Server

The Frappe Inspector MCP server exposes Frappe-aware project analysis to compatible AI clients and developer tools through the Model Context Protocol.

It allows an MCP client to request structured information about a local Frappe or ERPNext project instead of relying only on generic file search.

## Use cases

The MCP server can help compatible clients:

- Detect Frappe projects
- List applications and modules
- Inspect DocTypes and fields
- Understand relationships between DocTypes
- Find related JSON, Python, JavaScript and test files
- Run conservative static scans
- Analyze migration risks with Pro
- Inspect Custom Fields and Property Setters with Pro
- Return structured findings

The server provides deterministic project analysis. The connected AI client can use those results to explain problems or suggest changes.

## Download

Download the MCP package from:

https://github.com/Belius303/frappe-inspector-support/releases/tag/cross-platform-v1.0.1

The package is named:

`frappe-inspector-mcp-1.0.1.tgz`

## Requirements

- Node.js 20 or newer is recommended
- npm
- An MCP-compatible client
- Local access to the Frappe project being analyzed

Check Node.js:

```powershell
node --version
```

## Installation

### Global installation

```powershell
npm install --global .\frappe-inspector-mcp-1.0.1.tgz
```

### Local installation

```powershell
npm install --save-dev .\frappe-inspector-mcp-1.0.1.tgz
```

Check installed packages:

```powershell
npm list --global --depth=0
```

For a local installation:

```powershell
npm list --depth=0
```

## Finding the executable

The exact executable name is defined in the package metadata.

Inspect it before configuring the MCP client:

```powershell
npm view .\frappe-inspector-mcp-1.0.1.tgz bin
```

You can also extract the archive and inspect the `bin` field inside `package.json`.

Use the executable reported by the package in your MCP configuration.

## Generic MCP configuration

Most MCP clients expect:

- A command
- Optional command arguments
- Optional environment variables

Generic example:

```json
{
  "mcpServers": {
    "frappe-inspector": {
      "command": "frappe-inspector-mcp",
      "args": []
    }
  }
}
```

Replace `frappe-inspector-mcp` with the actual executable name reported by the package.

For a local project installation, an MCP client may use `npx`:

```json
{
  "mcpServers": {
    "frappe-inspector": {
      "command": "npx",
      "args": [
        "frappe-inspector-mcp"
      ]
    }
  }
}
```

The location and format of the MCP configuration file depend on the client.

## Project path

The MCP server must be able to access the Frappe project locally.

Depending on the client and supported server options, the project path may be provided through:

- An MCP tool request
- A command argument
- The active client workspace
- An environment variable
- Server configuration

Check the installed package help:

```powershell
frappe-inspector-mcp --help
```

For a local installation:

```powershell
npx frappe-inspector-mcp --help
```

## Community tools

Community MCP capabilities focus on:

- Project detection
- App and module discovery
- DocType inspection
- Field inspection
- Basic project scans
- Related-file discovery
- Conservative diagnostics

Community capabilities do not require a paid key.

## Pro tools

Universal Pro can unlock advanced MCP analysis such as:

- Migration safety analysis
- Git-reference schema comparison
- Removed-field usage analysis
- Link relationship validation
- Field type and requirement changes
- Custom Field effective-schema analysis
- Property Setter effective-schema analysis
- Advanced hooks and fixture analysis
- Whitelisted-method inspection
- Structured Pro reports

## Universal Pro license

Keep the Universal Pro key private.

Where supported, the license can be provided to the MCP server through an environment variable:

```json
{
  "mcpServers": {
    "frappe-inspector": {
      "command": "frappe-inspector-mcp",
      "args": [],
      "env": {
        "FRAPPE_INSPECTOR_LICENSE_KEY": "YOUR_PRIVATE_LICENSE_KEY"
      }
    }
  }
}
```

Do not store a real key in:

- A public repository
- Public screenshots
- Shared dotfiles
- Bug reports
- Public CI logs

Prefer the secret-storage mechanism provided by the MCP client or operating system.

## Security model

The MCP server analyzes files available to its local process.

Before enabling it, review:

- Which directories the client exposes
- Which tools the server provides
- Whether tool calls require confirmation
- Whether logs may contain project paths or source excerpts
- Where the client stores its MCP configuration

Use the smallest practical project scope.

Do not point the server at unrelated personal folders or directories containing secrets.

## Testing the server

Start by checking the help command:

```powershell
frappe-inspector-mcp --help
```

Then add the server to the MCP client and restart the client.

Confirm that:

- The server starts without an error
- The client lists the Frappe Inspector tools
- A Frappe project can be detected
- A basic scan returns structured results
- The server remains scoped to the requested project

## Updating

For a global installation:

```powershell
npm uninstall --global frappe-inspector-mcp
npm install --global .\frappe-inspector-mcp-NEW_VERSION.tgz
```

For a local installation, install the new tarball with npm and restart the MCP client.

## Uninstalling

Global installation:

```powershell
npm uninstall --global frappe-inspector-mcp
```

Local installation:

```powershell
npm uninstall frappe-inspector-mcp
```

## Verifying the package

Run:

```powershell
Get-FileHash .\frappe-inspector-mcp-1.0.1.tgz -Algorithm SHA256
```

Compare the result with the MCP entry in `SHA256SUMS.txt`.

## Troubleshooting

### The MCP server does not start

Check:

- Node.js version
- The package executable name
- Absolute and relative paths
- JSON syntax in the MCP configuration
- Whether the client inherits the system `PATH`
- Whether the package was installed globally or locally

Using an absolute executable path may help when the MCP client does not inherit npm's global binary directory.

### The client cannot see the tools

Restart the client after changing its MCP configuration.

Check the client's MCP logs for startup or JSON-RPC errors.

### The server cannot find the Frappe project

Use an explicit absolute path where supported.

Make sure the selected directory is a Bench root or Frappe application root.

### A tool returns an incorrect result

Open an issue and include:

- MCP client name and version
- Operating system
- Node.js version
- Frappe Inspector version
- Frappe and ERPNext versions
- Tool name
- Sanitized request and response
- Minimal reproduction steps

Issue tracker:

https://github.com/Belius303/frappe-inspector-support/issues

Never include private source code, customer data, API keys or license keys.

## Privacy

The MCP server is designed to run locally, but the connected AI client may have its own data-handling behavior.

Review both the Frappe Inspector privacy documentation and the privacy policy of the connected MCP client or AI provider.

Frappe Inspector privacy documentation:

https://github.com/Belius303/frappe-inspector-support/blob/main/docs/privacy.md
