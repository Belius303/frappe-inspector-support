# Frappe Inspector Support

Public documentation and issue tracking for the Frappe Inspector suite:

- JetBrains plugin.
- VS Code, Cursor and Open VSX extension.
- CLI and GitHub Action.
- Local MCP server.

Use Issues for bugs, feature requests, compatibility problems, false-positive diagnostics and performance reports. Do not post private source code, customer data, database dumps, API keys or paid-license keys.

## Links

- JetBrains Marketplace: https://plugins.jetbrains.com/plugin/32992-frappe-inspector
- VS Code Marketplace: https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector
- Open VSX: https://open-vsx.org/extension/mohamedtazihnyine/frappe-inspector
- npm CLI: https://www.npmjs.com/package/@frappe-inspector/cli
- npm MCP: https://www.npmjs.com/package/@frappe-inspector/mcp
- MCP Registry: https://prod.registry.modelcontextprotocol.io/?search=io.github.Belius303%2Ffrappe-inspector
- GitHub Marketplace Action: https://github.com/marketplace/actions/frappe-inspector
- Documentation: https://github.com/Belius303/frappe-inspector-support/tree/main/docs
- Cross-platform downloads: https://github.com/Belius303/frappe-inspector-support/releases
- Issues: https://github.com/Belius303/frappe-inspector-support/issues
- GitHub Action: https://github.com/Belius303/frappe-inspector-action
- Star / follow the project: https://github.com/Belius303/frappe-inspector-support
- Community vs Pro: https://github.com/Belius303/frappe-inspector-support/blob/main/docs/free-vs-pro.md
- CI setup: https://github.com/Belius303/frappe-inspector-support/blob/main/docs/ci.md
- Privacy: https://github.com/Belius303/frappe-inspector-support/blob/main/docs/privacy.md
- EULA: https://github.com/Belius303/frappe-inspector-support/blob/main/docs/eula.md

## Public Signals

Snapshot from official registries on 2026-07-30:

| Channel | Public signal |
| --- | ---: |
| Open VSX | 804 downloads |
| npm CLI | 523 downloads in the last 30 days |
| npm MCP | 511 downloads in the last 30 days |
| VS Code Marketplace | 76 downloads, 6 installs |
| JetBrains Marketplace | 52 downloads |
| GitHub support/action repositories | 0 stars so far |

## SARIF Example

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
