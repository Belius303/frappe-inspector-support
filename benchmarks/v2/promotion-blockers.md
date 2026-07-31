# Promotion blockers

## Decision

Status: **not promoted**. Keep the benchmark page out of search indexing and use v2 only as a technical regression archive.

Determinism is complete, but precision is not sufficiently demonstrated. Fifty-two of fifty-five errors are concentrated in optional integration code across Payments, HRMS, Helpdesk, and CRM. Resolving these responsibly requires stronger local evidence about installed apps and control flow, not a broad severity downgrade. ERPNext also retains three unresolved active references and one Link warning that need maintainer context.

## VS Code evidence

There is no manual VS Code capture tied to the 1.2.8 engine and this v2 input set. The existing v1 captures remain labeled as CLI 1.2.3-era evidence and must not be copied, relabeled, or presented as v2.

Before a future VS Code claim, build an extension containing the same validated core, install it in a clean Extension Host, scan a pinned fixture or bench, capture the visible diagnostics and version, and archive the exact extension checksum and reproduction steps.

## Pro campaign

No Pro license or Pro-only feature was used. This archive contains no Pro JSON/SARIF export, migration diff, editor screenshot, or conversion result. A Pro campaign therefore needs a separate protocol, data set, artifact namespace, success criteria, and review. Community Markdown metadata cannot be reused as Pro evidence.

## Reconsideration criteria

Commercial promotion can be reconsidered only after:

1. Optional integration references are classified using defensible local control-flow or installation evidence, with negative regression tests that protect real errors.
2. The pinned ten-project benchmark is rerun twice from the published package and independently reviewed.
3. Current VS Code evidence is captured from a build containing the same engine.
4. Any Pro claim is supported by a separate Pro run and artifacts.
5. The benchmark page, copy, and indexing decision are reviewed against those new results rather than v1 or this archive.
