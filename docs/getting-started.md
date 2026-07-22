# Getting Started

## JetBrains

Install Frappe Inspector from JetBrains Marketplace, open a Frappe bench or app, then open **Tools > Frappe Inspector**.

## VS Code Or Cursor

Install Frappe Inspector from VS Code Marketplace, Open VSX or a signed VSIX. Open the Frappe Inspector Activity Bar view and run **Frappe Inspector: Scan Project**.

## CLI

Run `frappe-inspector scan .` for Community diagnostics or `frappe-inspector diff . --base-ref origin/main` with Universal Pro.

## GitHub Action

See `docs/ci.md`. Check out full Git history with `fetch-depth: 0` and store Universal Pro in an encrypted secret.

## MCP

Configure `frappe-inspector-mcp` as a local stdio server in a compatible client. The server reads project files but never executes them.

Frappe Inspector is independent and is not affiliated with or endorsed by Frappe Technologies, ERPNext, JetBrains, Microsoft, Cursor, GitHub or the Eclipse Foundation.
