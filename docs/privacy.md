# Privacy

Frappe Inspector is designed to analyze Frappe and ERPNext project files locally in the editor, command line, MCP server or CI runner where it is used.

## Project data

- Project source code is not uploaded to Frappe Inspector for analysis.
- Static analysis does not execute project code, import project modules, run `bench` or connect to a Frappe site.
- Telemetry is disabled by default.
- Reports remain in the environment where the analysis runs unless the user or a configured platform uploads or shares them.

## Accounts and paid features

Paid features may communicate with licensing, marketplace, payment and email services when a user purchases, activates or manages a subscription.

Only information needed to provide those account and licensing functions is processed. Project source code and analysis results are not sent as part of license validation.

External marketplaces, payment providers, email providers, editors, GitHub and MCP clients apply their own privacy policies to the services they operate.

## GitHub Actions

The GitHub Action reads the repository checked out in the runner and writes its reports in that runner environment. Repository owners control workflow permissions, secrets, logs and uploaded artifacts through GitHub.

License keys should only be supplied through encrypted secrets and must not be printed in logs.

## MCP clients

The MCP server returns tool results to the connected client. The client may process or forward those results according to its own configuration and privacy policy.

Review the client's permissions and data-handling policy before exposing a private project.

## Public support

Public issues are visible to everyone. Do not include:

- private source code;
- customer or business data;
- database contents;
- credentials or API keys;
- license keys;
- confidential logs or file paths.

Use the [public issue tracker](https://github.com/Belius303/frappe-inspector-support/issues) only with sanitized information.
