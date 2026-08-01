# 60-Second Demo Script

Use this structure for a short product video, GIF or marketplace demo.

## Setup

Open a Frappe bench with a small fixture containing:

- a whitelisted method that forwards request data into dynamic SQL;
- a guest endpoint that reaches `ignore_permissions=True`;
- a client-only role restriction without server validation.

## Script

1. Show the generic scanner baseline: Bandit/Semgrep either miss the Frappe-specific issue or report only generic `eval`/SQL hints.
2. Run Frappe Inspector in VS Code or CLI.
3. Open a finding and show the evidence chain: entry, flow, guard, sink.
4. Show the `Fix:` guidance.
5. Export SARIF or mention the GitHub Action for PR checks.

## Narration

> Generic Python scanners see files. Frappe Inspector sees the Frappe project model: DocTypes, whitelisted endpoints, hooks, patches, permissions and migrations. On the controlled Frappe benchmark, it detects 16/16 expected findings with zero false positives.

## Evidence Links

- Site benchmark page: `https://frappeinspector.xyz/benchmarks`
- Public methodology: `docs/benchmarks.md`
- Raw corpus: `benchmarks/ground-truth/manifest.json`
