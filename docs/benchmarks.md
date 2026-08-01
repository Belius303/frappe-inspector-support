# Benchmark Evidence

Frappe Inspector is measured with two separate evidence layers:

1. a controlled Frappe-specific accuracy corpus;
2. public complete-bench controls for repeatability and noise boundaries.

The controlled corpus is the only layer used for precision/recall claims. The public complete-bench archive is retained separately and is not relabeled as current CLI 1.3.0 accuracy evidence.

## Controlled Accuracy Corpus

The controlled corpus covers minimized Frappe cases for:

- whitelisted request data reaching dynamic SQL;
- guest endpoints and permission bypasses;
- SSRF, filesystem path and dynamic execution sinks;
- client-only authorization;
- optional app guards;
- effective DocType schema validation;
- broken hooks and patches;
- unsafe migration diffs.

Current result for CLI/Core 1.3.0:

| Tool | Version | TP | FP | FN | Precision | Recall | F1 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Frappe Inspector | 1.3.0 | 16 | 0 | 0 | 100.0% | 100.0% | 100.0% |
| Bandit | 1.9.4 | 2 | 1 | 14 | 66.7% | 12.5% | 21.1% |
| Semgrep | 1.172.0 | 1 | 0 | 15 | 100.0% | 6.3% | 11.8% |

Bandit and Semgrep were executed as real tools, then normalized into the same TP/FP/FN table. Third-party results are not invented.

## Raw Artifacts

- Controlled corpus manifest: [`benchmarks/ground-truth/manifest.json`](../benchmarks/ground-truth/manifest.json)
- Competitor snapshot: [`benchmarks/ground-truth/competitors/bandit-semgrep-2026-08-01.json`](../benchmarks/ground-truth/competitors/bandit-semgrep-2026-08-01.json)
- Public controls: [`benchmarks/ground-truth/public-controls.json`](../benchmarks/ground-truth/public-controls.json)

## Reproduce Locally

From the product monorepo:

```shell
npm run check:benchmark
node scripts/run-ground-truth-benchmark.mjs --competitor packages/core/test-fixtures/ground-truth/competitors/bandit-semgrep-2026-08-01.json
npm run benchmark:public-controls
```

To regenerate competitor output, install Bandit and Semgrep and run:

```shell
node scripts/run-ground-truth-competitors.mjs \
  --bandit <path-to-bandit> \
  --semgrep <path-to-semgrep> \
  --output packages/core/test-fixtures/ground-truth/competitors/bandit-semgrep-2026-08-01.json
```

## Public Complete-Bench Controls

The public complete-bench controls verify retained reports from pinned public app scopes:

| Project | Expected Errors | Expected Warnings | Expected Notes | Deterministic |
| --- | ---: | ---: | ---: | :---: |
| Lending | 0 | 0 | 0 | yes |
| Education | 0 | 0 | 0 | yes |
| Gameplan | 0 | 0 | 0 | yes |
| Insights | 0 | 0 | 2 | yes |
| Drive | 0 | 0 | 30 | yes |

These cases demonstrate repeatability and noise control. They are not presented as global vulnerability ground truth.

## Evidence Boundary

- The 16/16 result is a controlled Frappe-specific benchmark, not a global claim over every static analyzer or project type.
- Bandit and Semgrep are general-purpose tools and were not given custom Frappe-specific rules.
- Public complete-bench results were captured with CLI 1.2.8 and are preserved with that provenance.
- Frappe Inspector is independent software and is not endorsed by Frappe Technologies or scanned project maintainers.
