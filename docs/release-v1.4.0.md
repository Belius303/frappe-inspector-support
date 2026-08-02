# Frappe Inspector 1.4.0

Version 1.4.0 adds Universal Pro team review workflows across CLI, VS Code/Cursor, MCP and the GitHub Action.

## Highlights

- Intelligent PR diff using stable fingerprint multisets and Git rename detection.
- Auditable suppressions with ID, justification, author, creation time and expiry.
- Repository team policies for rule enablement, severity overrides and thresholds.
- Actionable migration plans with preflight, compatibility/backfill, schema and verification phases.
- Bounded updateable GitHub PR comments using a stable marker comment.
- Self-contained HTML reports with no scripts, no remote assets and no absolute local project root.
- Live Universal Pro certificates now grant these 1.4.0 feature IDs.

## Evidence

The controlled benchmark remains 22 cases and 20 expected findings:

| Tool | Version | Scope | Cases | Expected | TP | FP | FN | Precision | Recall |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Frappe Inspector | 1.4.0 | Generic + migration | 22 | 20 | 20 | 0 | 0 | 100.0% | 100.0% |
| Bandit | 1.9.4 | Generic only | 21 | 17 | 2 | 3 | 15 | 40.0% | 11.8% |
| Semgrep | 1.172.0 | Generic only | 21 | 17 | 1 | 0 | 16 | 100.0% | 5.9% |

Generic tools are not penalized for the three migration-only baseline comparisons.

## Links

- Team workflows: `docs/pro-team-workflows.md`
- Benchmark methodology: `docs/benchmarks.md`
- Action demo: https://github.com/Belius303/frappe-inspector-action/tree/main/demo
