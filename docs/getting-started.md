# Getting Started

Frappe Inspector supports JetBrains IDEs, VS Code, Cursor, the command line, MCP clients and GitHub Actions.

## JetBrains

1. Install [Frappe Inspector from JetBrains Marketplace](https://plugins.jetbrains.com/plugin/32992-frappe-inspector).
2. Open a Frappe Bench root or an individual application.
3. Open **Tools → Frappe Inspector**.

JetBrains Pro licensing is managed separately through JetBrains Marketplace.

## VS Code

1. Install [Frappe Inspector from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mohamedtazihnyine.frappe-inspector).
2. Open a Frappe Bench or application.
3. Run **Frappe Inspector: Scan Project** from the Command Palette.
4. Open the Frappe Inspector Activity Bar view.

The current VS Code version is **1.1.5**.

## Cursor

1. Download the latest `frappe-inspector-vscode-*.vsix` from [GitHub Releases](https://github.com/Belius303/frappe-inspector-support/releases/latest).
2. In Cursor, run **Extensions: Install from VSIX**.
3. Open a Frappe project and run **Frappe Inspector: Scan Project**.

See [VS Code and Cursor](vscode-cursor.md) for features, commands and troubleshooting.

## CLI

Requires Node.js 20 or newer:

```shell
npm install --global @frappe-inspector/cli
frappe-inspector scan .
```

Universal Pro migration comparison:

```shell
frappe-inspector license activate FI-PRO-...
frappe-inspector diff . --base-ref origin/main
```

See the [CLI guide](cli.md).

## MCP server

```shell
npm install --global @frappe-inspector/mcp
```

Configure `frappe-inspector-mcp` as a local `stdio` server in a compatible MCP client. The server reads project files as text and does not execute them.

See the [MCP guide](mcp.md).

## GitHub Action

Start with Community mode:

```yaml
- uses: actions/checkout@v4
- uses: Belius303/frappe-inspector-action@v1
  with:
    mode: scan
    path: .
```

Migration mode requires Universal Pro, complete Git history and a baseline ref. See [GitHub Actions and CI](ci.md).

## Community and Pro

Community features work without an account or license. See [Community vs Pro](free-vs-pro.md) for the exact feature split.

Frappe Inspector is independent and is not affiliated with or endorsed by Frappe Technologies, ERPNext, JetBrains, Microsoft, Cursor or GitHub.
