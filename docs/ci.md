# GitHub Actions and CI

The [Frappe Inspector GitHub Action](https://github.com/Belius303/frappe-inspector-action) runs framework-aware Frappe and ERPNext analysis inside a GitHub Actions runner.

It can annotate source files, write a job summary, generate reports and fail a workflow when findings reach the configured severity threshold.

## Community scan

Community mode performs conservative static checks without a license key.

```yaml
name: Frappe checks

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  inspect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: Belius303/frappe-inspector-action@v1
        with:
          mode: scan
          path: .
          fail-on: error
```

## Universal Pro migration analysis

Migration mode compares the checked-out project with a Git baseline. Use `fetch-depth: 0` so the baseline ref exists in the runner.

Create an encrypted repository or organization secret named `FRAPPE_INSPECTOR_LICENSE_KEY`, then use:

```yaml
name: Frappe migration safety

on:
  pull_request:

permissions:
  contents: read
  security-events: write

jobs:
  inspect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: Belius303/frappe-inspector-action@v1
        with:
          mode: migration
          path: .
          base-ref: origin/${{ github.base_ref }}
          fail-on: error
          license-key: ${{ secrets.FRAPPE_INSPECTOR_LICENSE_KEY }}

      - uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: frappe-inspector.sarif
```

The Action validates Universal Pro online for an ephemeral CI installation. GitHub-hosted runners do not consume one of the persistent desktop/CLI/MCP device slots.

## Inputs

| Input | Required | Default | Description |
| --- | :---: | --- | --- |
| `path` | No | `.` | Bench or app path relative to the repository root |
| `mode` | No | `migration` | `scan` for Community checks or `migration` for Pro schema comparison |
| `base-ref` | Migration mode | — | Git ref used as the migration baseline |
| `fail-on` | No | `error` | Minimum severity that fails the job: `note`, `warning` or `error` |
| `include-safe` | No | `false` | Include safe additions in the migration report |
| `license-key` | Pro mode | — | Universal Pro key passed from an encrypted secret |
| `markdown-file` | No | `frappe-inspector.md` | Markdown report path |
| `json-file` | No | `frappe-inspector.json` | Pro JSON report path |
| `sarif-file` | No | `frappe-inspector.sarif` | Pro SARIF report path |

## Outputs

| Output | Description |
| --- | --- |
| `errors` | Number of error findings |
| `warnings` | Number of warning findings |
| `risky` | Number of risky migration changes |
| `needs-review` | Number of changes requiring review |
| `sarif-file` | Generated SARIF path |
| `json-file` | Generated JSON path |

## Troubleshooting

### The baseline cannot be resolved

- Confirm `fetch-depth: 0` is configured.
- Confirm `base-ref` matches a ref available after checkout.
- For pull requests, `origin/${{ github.base_ref }}` normally resolves to the target branch.

### SARIF upload fails

- Keep `security-events: write`.
- Keep `if: always()` if the report should upload even when analysis fails the job.
- Confirm migration mode completed far enough to create the configured SARIF file.

### Community mode asks for Pro

Set `mode: scan`. The Action defaults to `migration`, which requires Universal Pro.

Never print the license key or store it directly in a workflow file. For support, open a sanitized report in the [public issue tracker](https://github.com/Belius303/frappe-inspector-support/issues).
