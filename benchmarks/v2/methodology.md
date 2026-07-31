# Community benchmark v2 methodology

## Scope

- Date: 2026-07-31
- CLI: `@frappe-inspector/cli` 1.2.8 installed from the public npm registry
- License: Community; no Pro license or Pro-only export was used
- Runtime: Node.js v22.11.0 and npm 11.4.2
- Projects: ten public Frappe applications
- Runs: two scans per project, twenty completed runs total
- Target scope: one selected application per bench through `--app`

The installed package lock resolved the public 1.2.8 tarball and integrity recorded in [npm-package.json](npm-package.json). The installed `dist/cli.mjs` had SHA-256 `a41a3c90405bbfa986e64ffa57e1b465945988afcfc88b605abf478dcedb1ae7`.

## Bench construction

Each input used a static Frappe bench layout:

```text
<bench>/
  apps/<app>/...
  sites/apps.txt
```

`sites/apps.txt` listed the apps included in that bench. Source files were copied from the exact public commits recorded in [results.json](results.json). Git metadata, environments, dependencies, build output, caches, files larger than 2 MiB, and unsupported file types were excluded. The resulting inputs are complete static-analysis layouts, not running Frappe sites.

ERPNext, Lending, HRMS, and Education benches include ERPNext where applicable. Helpdesk includes Telephony. Optional integrations such as Lending in HRMS, ERPNext in Payments/Helpdesk/CRM, and Frappe WhatsApp in CRM were intentionally not added unless they were part of the bench app list. This makes missing optional-schema behavior visible but limits conclusions about runtime guards.

The exact commits for every target and included dependency are stored both in the global `sources` map and each project's `benchApps` array in `results.json`.

## Command and execution

The command template was:

```text
frappe-inspector scan <bench> --app <app> --format markdown --output <report>
```

The ten project jobs ran concurrently. Within each project job, run 1 and run 2 ran sequentially. Durations are per process and must not be summed to infer wall-clock benchmark time.

Exit codes were interpreted as follows:

- `0`: scan completed and did not cross the error/warning threshold.
- `1`: scan completed, wrote a report, and findings crossed the threshold.
- `2`: operational or usage failure. No v2 run returned `2`.

Completion required a written Markdown report, parseable counts, exit code `0` or `1`, and empty stderr. All twenty runs met those conditions.

## Determinism and checksums

Determinism means the complete Markdown bytes from run 1 and run 2 had the same SHA-256 for a project. Every project passed this check. Both reports are retained rather than collapsing the second run, and each project has a `checksums.sha256` file covering both.

The original run metadata is copied as `metadata.json`. It records timestamps, duration, exit code, completion, counts, stderr state, and report SHA-256. Local source paths and empty stderr files are not published.

## Result interpretation

Errors, warnings, and notes are raw CLI classifications. They are not independently verified defect counts.

- Tests and patches are downgraded to notes where the engine can identify that context.
- Drive and Insights contain notes only, dominated by historical patch references.
- Payments, HRMS, Helpdesk, and CRM retain findings from optional app integration surfaces. The scanner recognizes some local evidence, but it does not perform full control-flow or installation-state analysis.
- ERPNext retains three unresolved active DocType references and one Link warning.
- Lending, Education, and Gameplan have no errors, warnings, or notes in the selected app scope.

The v2 aggregate is substantially smaller than v1, but a lower count and perfect repeatability do not prove precision. This is why the [promotion decision](promotion-blockers.md) remains negative.

## Community and Pro boundary

Community mode produced Markdown. `results.json` and `results.csv` are archive metadata derived from those Markdown reports and raw timing metadata; they are not CLI JSON/SARIF output. No Pro feature, Pro license, migration diff, or Pro campaign result is represented here.

No new VS Code screenshot was created. The v1 screenshots remain part of v1 and are not relabeled or copied into v2.

## Validation

From the support repository root, run:

```text
node benchmarks/v2/scripts/validate.mjs
```

To rebuild the generated report copies and machine-readable summaries from the private raw artifact directory, run:

```text
node benchmarks/v2/scripts/import.mjs <private-benchmark-root>
```

The private root is supplied at runtime and is never written into the public archive.
