# Community benchmark v2 technical archive

> **Technical archive only - not commercial evidence of precision.** These results show that `@frappe-inspector/cli` 1.2.8 Community produced repeatable reports on ten complete static bench layouts. They do not establish that every finding is actionable, and they must not be used to repromote the benchmark or relabel v1 screenshots.

This archive is intentionally separate from the original [v1 benchmark](../README.md). The v1 files, reports, screenshots, methodology, and warnings remain tied to CLI 1.2.3. No v1 capture is presented as v2 evidence.

## Decision

**Not promoted.** The public site should remain `noindex`, and v2 should remain a reproducible engineering record.

All 20 scans completed and all 10 projects produced byte-identical reports across two runs. That proves determinism only. The reports still contain 55 errors and 4 warnings. Fifty-two errors are concentrated in optional integration surfaces across Payments, HRMS, Helpdesk, and CRM; the local scanner does not yet model enough control flow to prove all runtime app guards. ERPNext retains three unresolved active references and one Link warning that require maintainer context.

## Results

| Project | Bench apps | Errors | Warnings | Notes | Run 1 | Run 2 | Exit | Deterministic |
| --- | --- | ---: | ---: | ---: | ---: | ---: | :---: | :---: |
| ERPNext | frappe + erpnext | 3 | 1 | 15 | 67,212 ms | 52,156 ms | 1 / 1 | Yes |
| HRMS | frappe + erpnext + hrms | 9 | 3 | 6 | 81,402 ms | 60,497 ms | 1 / 1 | Yes |
| Payments | frappe + payments | 9 | 0 | 7 | 20,696 ms | 18,472 ms | 1 / 1 | Yes |
| Lending | frappe + erpnext + lending | 0 | 0 | 0 | 74,557 ms | 54,693 ms | 0 / 0 | Yes |
| Education | frappe + erpnext + education | 0 | 0 | 0 | 72,017 ms | 53,249 ms | 0 / 0 | Yes |
| Helpdesk | frappe + telephony + helpdesk | 9 | 0 | 12 | 25,108 ms | 20,987 ms | 1 / 1 | Yes |
| CRM | frappe + crm | 25 | 0 | 7 | 25,225 ms | 20,987 ms | 1 / 1 | Yes |
| Insights | frappe + insights | 0 | 0 | 2 | 22,726 ms | 19,464 ms | 0 / 0 | Yes |
| Drive | frappe + drive | 0 | 0 | 30 | 21,403 ms | 18,766 ms | 0 / 0 | Yes |
| Gameplan | frappe + gameplan | 0 | 0 | 0 | 22,563 ms | 18,798 ms | 0 / 0 | Yes |

Aggregate: **20/20 completed runs**, **10/10 deterministic projects**, **55 errors**, **4 warnings**, and **79 notes**. Five projects have no errors or warnings; three have no findings at all, while Insights and Drive contain notes only.

Exit code `0` means the report did not cross the error/warning threshold. Exit code `1` means findings were present; it is not a crash. Stderr was empty for all 20 runs.

## Evidence

- [Methodology and limitations](methodology.md)
- [Machine-readable results](results.json) and [CSV summary](results.csv)
- [npm 1.2.8 registry metadata](npm-package.json)
- [Promotion blockers](promotion-blockers.md)
- Two reports, raw run metadata, and SHA-256 checksums for each project under [reports](reports/)
- Exact target and dependency commits in [results.json](results.json)
- Archive validator: `node benchmarks/v2/scripts/validate.mjs`

The JSON and CSV files are metadata assembled from the Community Markdown reports. They are not Pro JSON or SARIF exports.

## Disclaimer

Frappe Inspector is an independent third-party project. This benchmark is not affiliated with or endorsed by Frappe Technologies or the maintainers of the scanned projects. Raw findings are scanner output, not claims about project quality, defects, or security.
