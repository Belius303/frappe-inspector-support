# Frappe Inspector 1.3.0 Benchmark Release

This release publishes the Frappe-specific benchmark evidence and the 1.3.0 Node-client messaging for VS Code/Cursor, CLI, MCP and the GitHub Action.

## Benchmark Result

| Tool | Version | TP | FP | FN | Precision | Recall |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Frappe Inspector | 1.3.0 | 16 | 0 | 0 | 100.0% | 100.0% |
| Bandit | 1.9.4 | 2 | 1 | 14 | 66.7% | 12.5% |
| Semgrep | 1.172.0 | 1 | 0 | 15 | 100.0% | 6.3% |

This is a controlled Frappe-specific benchmark, not a global claim over every static analyzer or project type.

## What Changed

- Public benchmark methodology and raw JSON artifacts.
- Site benchmark page at `https://frappeinspector.xyz/benchmarks`.
- Fix guidance in CLI, MCP and VS Code diagnostics.
- GitHub workflows for Node/Worker/benchmark validation and manual site deployment.
- 60-second demo script for marketplace listings and videos.

## Links

- Benchmark page: `https://frappeinspector.xyz/benchmarks`
- Benchmark methodology: `docs/benchmarks.md`
- Demo script: `docs/demo-script.md`
- Raw corpus: `benchmarks/ground-truth/manifest.json`
