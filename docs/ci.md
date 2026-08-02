# GitHub Action

```yaml
name: Frappe migration safety
on: pull_request

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
          base-ref: origin/${{ github.base_ref }}
          license-key: ${{ secrets.FRAPPE_INSPECTOR_LICENSE_KEY }}
      - uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: frappe-inspector.sarif
```

The Action annotates source files, writes a job summary, generates Markdown/JSON/SARIF and fails at the configured severity threshold. Use `mode: scan` without a key for Community static checks. Migration mode and machine-readable reports require Universal Pro.

## Universal Pro team workflow

CLI 1.4.0 supports `--new-only`, `--policy`, `--suppressions`, `--audit-output`, `plan` and `--format html`. New-only filtering compares stable fingerprint multisets and renames with the Git base. Suppression audit JSON separates applied, expired and unused entries. Policies control thresholds and per-rule behavior. Migration plans contain ordered phases and non-executed placeholders.

Action `v1` adds opt-in `new-only`, `policy-file`, `suppressions-file`, `pr-comment`, `html-file`, `audit-file` and `migration-plan-file` inputs. Policy and suppression files are loaded from the trusted base ref. PR comments require `github-token` and `pull-requests: write`; unsupported contexts are skipped.
