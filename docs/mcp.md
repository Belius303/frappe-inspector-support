# Frappe Inspector MCP Server

The Frappe Inspector MCP server exposes read-only, framework-aware analysis of local Frappe and ERPNext projects to compatible AI clients through the Model Context Protocol.

Current npm package: [`@frappe-inspector/mcp`](https://www.npmjs.com/package/@frappe-inspector/mcp), version **1.1.4**.

Project files are read as text and are never executed by the server.

## Requirements

- Node.js 20 or newer
- npm
- An MCP-compatible client
- Local access to the Frappe project

## Installation

Install globally:

```shell
npm install --global @frappe-inspector/mcp
```

Or install in a project:

```shell
npm install --save-dev @frappe-inspector/mcp
```

Audited `.tgz` packages and SHA-256 checksums are also available from [GitHub Releases](https://github.com/Belius303/frappe-inspector-support/releases/latest).

## Configuration

Generic global-installation example:

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

For a project-local installation:

```json
{
  "mcpServers": {
    "frappe-inspector": {
      "command": "npx",
      "args": ["frappe-inspector-mcp"]
    }
  }
}
```

Configuration locations and environment-variable handling depend on the MCP client. Restart the client after changing its configuration.

## Available tools

| Tool | Edition | Purpose |
| --- | --- | --- |
| `scan_frappe_project` | Community | Run a static scan and return structured diagnostics |
| `list_doctypes` | Community | List detected apps, modules, DocTypes, fields and source files |
| `get_doctype` | Community/Pro | Return a DocType schema; Pro includes licensed effective-schema overlays |
| `find_field_usages` | Pro | Find recognized Python and JavaScript field usages |
| `compare_frappe_schema` | Pro | Compare the working tree with a Git ref |
| `create_frappe_ci_report` | Pro | Produce structured JSON analysis for CI agents |

All tools are declared read-only. The server does not edit project files.

## Universal Pro

The MCP server can use:

- the device license activated by the CLI;
- `FRAPPE_INSPECTOR_LICENSE_KEY` supplied by the MCP client environment.

Example shape:

```json
{
  "mcpServers": {
    "frappe-inspector": {
      "command": "frappe-inspector-mcp",
      "args": [],
      "env": {
        "FRAPPE_INSPECTOR_LICENSE_KEY": "FI-PRO-..."
      }
    }
  }
}
```

Prefer the secret-storage or environment mechanism provided by the client. Do not commit a real key to a repository or shared configuration.

The MCP server shares the local device record with the CLI but keeps a product-bound MCP certificate. Run:

```shell
frappe-inspector license deactivate
```

to release both CLI and MCP access for that device.

## Security and privacy

The server communicates with the client over local `stdio`. Tool results are returned to that client, which may forward them to its configured AI provider.

Before enabling it, review:

- which directories the client exposes;
- whether tool calls require confirmation;
- whether logs can include paths or source excerpts;
- the client and AI provider privacy policies.

Use the smallest practical project scope and do not point the server at unrelated personal folders.

Universal Pro activation and refresh communicate with the Frappe Inspector license service. See [Privacy](privacy.md).

## Troubleshooting

### Server not found

- Confirm Node.js 20+ and npm are installed.
- Run `npm list --global --depth=0`.
- Confirm the MCP client inherits npm's global binary directory.
- Use the project-local `npx` configuration if needed.

### Tools do not appear

- Validate the JSON configuration.
- Restart the MCP client.
- Check its MCP or JSON-RPC logs.

### Project not detected

- Pass a Bench root or Frappe app path to the tool.
- Confirm `hooks.py`, `modules.txt` or DocType JSON files are present.

For incorrect results, open a sanitized report in the [public issue tracker](https://github.com/Belius303/frappe-inspector-support/issues). Never include private source, customer data, credentials or license keys.
