# Universal Pro Team Workflows

Universal Pro adds repository-level review controls on top of the Frappe-aware scanner. These files are versioned with the project and remain portable across CLI, VS Code, MCP and the GitHub Action.

## Intelligent pull-request diff

`--new-only` compares stable finding fingerprints against a Git baseline. Line moves and detected file renames do not create a new issue. Duplicate findings are counted as a multiset, so one existing copy does not hide an additional copy introduced by the pull request.

```shell
git fetch --all --tags
frappe-inspector scan . --new-only --base-ref origin/main --format html --output frappe-inspector.html
```

## Team policy

Store policy at `.frappe-inspector/policy.json`:

```json
{
  "version": 1,
  "minimumSeverity": "warning",
  "failOn": "error",
  "rules": [
    { "ruleId": "FI043", "enabled": true, "severity": "error" },
    { "ruleId": "FI002", "enabled": false }
  ]
}
```

An explicit CLI or Action `fail-on` value overrides `policy.failOn`.

## Auditable suppressions

Store exceptions at `.frappe-inspector/suppressions.json`:

```json
{
  "version": 1,
  "suppressions": [
    {
      "id": "SEC-123",
      "fingerprint": "<sha256>",
      "ruleId": "FI040",
      "path": "apps/sales/sales/api.py",
      "justification": "Validated server-side query allowlist.",
      "author": "security-team",
      "createdAt": "2026-08-02T00:00:00.000Z",
      "expiresAt": "2026-11-02T00:00:00.000Z"
    }
  ]
}
```

Every entry needs an ID, justification, author, creation time and expiry. Git history is the authoritative approval trail. `--audit-output` records applied, expired and unused entries. In GitHub Actions, policy and suppressions are loaded from the trusted base ref so a pull request cannot approve itself.

## Actionable migration plan

```shell
frappe-inspector plan . --base-ref origin/main --output frappe-inspector-migration-plan.json
```

The plan orders backup/preflight, compatibility or backfill work, schema application and verification. Commands use explicit placeholders such as `<site>` and `<patch>`; Frappe Inspector never executes them.

## Pull-request comment

The Action maintains one bounded marker comment instead of adding a new comment on every run:

```yaml
permissions:
  contents: read
  pull-requests: write
  security-events: write

- uses: Belius303/frappe-inspector-action@v1
  with:
    mode: migration
    base-ref: origin/${{ github.base_ref }}
    new-only: true
    policy-file: .frappe-inspector/policy.json
    suppressions-file: .frappe-inspector/suppressions.json
    audit-file: frappe-inspector-audit.json
    migration-plan-file: frappe-inspector-migration-plan.json
    html-file: frappe-inspector.html
    pr-comment: true
    github-token: ${{ github.token }}
    license-key: ${{ secrets.FRAPPE_INSPECTOR_LICENSE_KEY }}
```

Comments are skipped safely on non-PR events, forks without permission, missing tokens and HTTP 403 responses.

## Shareable HTML

HTML reports are self-contained, escaped, script-free and omit the absolute local project root. They contain the issue summary, portable locations, evidence counts and remediation guidance. Treat them as security artifacts and share only with intended reviewers.
