# Public Changelog

## Cross-platform 1.3.2

- Added VS Code Explain & Fix code actions and a structured evidence panel.
- Added MCP pull-request and migration-plan review tools.
- Added richer GitHub Action annotations, job summaries and stable SARIF fingerprints.
- Expanded the controlled benchmark to 22 cases and 20 expected findings with separate migration/generic scopes.

## Cross-platform 1.3.1

- Refreshed VS Code/Open VSX/npm/MCP/GitHub Action listing metadata with benchmark evidence and Frappe-specific security positioning.

## Cross-platform 1.3.0

- Added interprocedural Python flow analysis across local helpers for Frappe request data, permission checks and sensitive sinks.
- Added focused rules for guest mutations, permission bypasses, dynamic DocTypes, SQL construction, SSRF, unsafe paths and dynamic code execution.
- Added source, sink, guard and related-location evidence to JSON, SARIF and editor diagnostics.
- Added `frappe-inspector explain` and the MCP `explain_frappe_finding` tool so findings can be audited without guessing why they fired.
- Improved optional-integration handling and local helper return inference to reduce noise on real Frappe applications.
- Verified deterministic output on pinned CRM, Helpdesk, HRMS and Payments revisions. Reported items remain review candidates until maintainers validate exploitability and runtime context.
- Published signed-off 1.3.0 VSIX, CLI and MCP artifacts with SHA-256 checksums on GitHub. npm, VS Code Marketplace, Open VSX and MCP Registry remain separate rollout channels. JetBrains remains on 1.2.2.

## Cross-platform 1.0.1

- Fixed Git-ref comparisons on Windows when temporary paths use DOS 8.3 aliases.
- Made packaged artifact names follow their manifest version automatically.

## 1.1.0

- Added the private shared analysis Core and portable report contract.
- Added the Frappe Inspector CLI and local MCP server.
- Added the VS Code, Cursor and Open VSX extension.
- Added the GitHub Action with annotations, job summaries and pull-request blocking.
- Added effective Custom Field and Property Setter schema overlays.
- Added Markdown, JSON and SARIF reports.
- Added Git-ref migration checks for removed references, Link targets, required defaults, type changes and unique fields.
- Added offline-signed Universal Pro licensing for non-JetBrains products.

## 1.0.2

- Locked Pro features behind JetBrains Marketplace licensing in public IDE runs.
- Added public support and issue-tracking repository.
- Added custom proprietary Developer EULA metadata for the private-source freemium release.
- Updated Marketplace feature copy to match implemented Community and Pro features.

## 1.0.1

- Added JetBrains Marketplace freemium product metadata.
- Set the plugin vendor metadata to Mohamed Tazi Hnyine.

## 1.0.0

- Added advanced Frappe source inference.
- Added field-level gutter navigation.
- Added clustered graph layout.
- Added heavy IntelliJ test coverage.
