# Frappe Inspector 1.3.2

Version 1.3.2 turns Frappe Inspector findings into a more complete review workflow across VS Code, MCP and GitHub Actions.

## Highlights

- VS Code Explain & Fix code actions with a structured evidence/remediation panel.
- Safe navigation to the finding source and each entry, flow, guard or sink location.
- MCP `review_frappe_pull_request` and `review_frappe_migration_plan` tools.
- Richer GitHub Action annotations and separate findings/migration job-summary sections.
- Stable SARIF partial fingerprints for better code-scanning deduplication.
- Expanded controlled benchmark: 22 cases, 20 expected findings, 0 FP/FN for Frappe Inspector.
- Privacy-safe aggregate checkout and purchase counters with no personal identifiers.

## Benchmark

| Tool | Version | Scope | Cases | Expected | TP | FP | FN | Precision | Recall |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Frappe Inspector | 1.3.2 | Generic + migration | 22 | 20 | 20 | 0 | 0 | 100.0% | 100.0% |
| Bandit | 1.9.4 | Generic only | 21 | 17 | 2 | 3 | 15 | 40.0% | 11.8% |
| Semgrep | 1.172.0 | Generic only | 21 | 17 | 1 | 0 | 16 | 100.0% | 5.9% |

Generic scanners are not penalized for the three migration-only baseline comparisons.

## Links

- Benchmark: https://frappeinspector.xyz/benchmarks
- Public methodology: `docs/benchmarks.md`
- Action demo: https://github.com/Belius303/frappe-inspector-action/tree/main/demo
