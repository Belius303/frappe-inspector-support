# Benchmark Evidence

Frappe Inspector is measured with two separate evidence layers:

1. a controlled Frappe-specific accuracy corpus;
2. public complete-bench controls for repeatability and noise boundaries.

The controlled corpus is the only layer used for precision/recall claims. The public complete-bench archive is retained separately and is not relabeled as current CLI 1.4.0 accuracy evidence.

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

Current result for CLI/Core 1.4.0. Three Frappe Inspector expectations require baseline/current migration comparison, so generic scanners are evaluated only against the 17 generic findings:

| Tool | Version | Scope | Cases | Expected | TP | FP | FN | Precision | Recall | F1 |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Frappe Inspector | 1.4.0 | Generic + migration | 22 | 20 | 20 | 0 | 0 | 100.0% | 100.0% | 100.0% |
| Bandit | 1.9.4 | Generic only | 21 | 17 | 2 | 3 | 15 | 40.0% | 11.8% | 18.2% |
| Semgrep | 1.172.0 | Generic only | 21 | 17 | 1 | 0 | 16 | 100.0% | 5.9% | 11.1% |

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

- The 20/20 result is a controlled Frappe-specific benchmark, not a global claim over every static analyzer or project type.
- Three expectations require a migration baseline; Bandit and Semgrep are not penalized for those cases.
- Bandit and Semgrep are general-purpose tools and were not given custom Frappe-specific rules.
- Public complete-bench results were captured with CLI 1.2.8 and are preserved with that provenance.
- Frappe Inspector is independent software and is not endorsed by Frappe Technologies or scanned project maintainers.
