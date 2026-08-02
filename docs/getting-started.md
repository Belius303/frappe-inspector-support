# Getting Started

## JetBrains

Install [Frappe Inspector from JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector), open a Frappe bench or app, then open **Tools > Frappe Inspector**.

## VS Code Or Cursor

Install Frappe Inspector from VS Code Marketplace, Open VSX or the [latest public release](https://github.com/Belius303/frappe-inspector-support/releases/latest). In VS Code or Cursor, run **Extensions: Install from VSIX** when using the downloaded package, then open the Frappe Inspector Activity Bar view and run **Frappe Inspector: Scan Project**.

## CLI

Install the public npm package:

```shell
npm install --global @frappe-inspector/cli@1.4.0
```

Run `frappe-inspector scan .` for Community diagnostics or `frappe-inspector diff . --base-ref origin/main` with Universal Pro.

## GitHub Action

See `docs/ci.md`. Check out full Git history with `fetch-depth: 0` and store Universal Pro in an encrypted secret.

## MCP

Install the public package, then configure `frappe-inspector-mcp` as a local stdio server in a compatible client:

```shell
npm install --global @frappe-inspector/mcp@1.4.0
```

The server reads project files but never executes them.

Frappe Inspector is independent and is not affiliated with or endorsed by Frappe Technologies, ERPNext, JetBrains, Microsoft, Cursor, GitHub or the Eclipse Foundation.
