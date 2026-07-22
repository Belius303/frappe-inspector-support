# Getting Started

## JetBrains

Install [Frappe Inspector from JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector), open a Frappe bench or app, then open **Tools > Frappe Inspector**.

## VS Code Or Cursor

Install Frappe Inspector from VS Code Marketplace, Open VSX or the [public VSIX release](https://github.com/Belius303/frappe-inspector-support/releases/download/cross-platform-v1.0.0/frappe-inspector-vscode-1.0.0.vsix). In VS Code or Cursor, run **Extensions: Install from VSIX**, then open the Frappe Inspector Activity Bar view and run **Frappe Inspector: Scan Project**.

## CLI

Until the npm scope is published, install the public package directly:

```shell
npm install --global https://github.com/Belius303/frappe-inspector-support/releases/download/cross-platform-v1.0.0/frappe-inspector-cli-1.0.0.tgz
```

Run `frappe-inspector scan .` for Community diagnostics or `frappe-inspector diff . --base-ref origin/main` with Universal Pro.

## GitHub Action

See `docs/ci.md`. Check out full Git history with `fetch-depth: 0` and store Universal Pro in an encrypted secret.

## MCP

Install the public package, then configure `frappe-inspector-mcp` as a local stdio server in a compatible client:

```shell
npm install --global https://github.com/Belius303/frappe-inspector-support/releases/download/cross-platform-v1.0.0/frappe-inspector-mcp-1.0.0.tgz
```

The server reads project files but never executes them.

Frappe Inspector is independent and is not affiliated with or endorsed by Frappe Technologies, ERPNext, JetBrains, Microsoft, Cursor, GitHub or the Eclipse Foundation.
