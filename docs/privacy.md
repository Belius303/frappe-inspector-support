# Privacy

Frappe Inspector analyzes project files locally in the IDE, CLI, MCP server or
CI runner process where it is invoked.

- Telemetry is disabled by default.
- Source code, customer names, full paths, database content and business data are not uploaded.
- The software does not run `bench`, import project Python modules, connect to a Frappe site or execute project code during analysis.
- JetBrains editions use JetBrains Marketplace licensing. Universal Pro keys are verified locally from a digital signature and are not transmitted by Frappe Inspector.
- The GitHub Action reads the checked-out repository and writes reports only inside its runner workspace. GitHub's own handling of repositories, logs and artifacts is governed by GitHub's terms and settings.
- The MCP server uses a local `stdio` transport. Tool results are returned to the connected MCP client; that client may send those results to its configured AI provider under the client's own privacy policy.
- Bug reports are created by users and should be reviewed before sharing.
