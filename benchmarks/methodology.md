# Methodology

## Reproducible setup

- Date: 2026-07-30
- CLI: `@frappe-inspector/cli` 1.2.3
- License: Community, with no Pro license active
- Runtime: Node.js v22.11.0 and npm 11.4.2
- Command template: `frappe-inspector scan <project-path> --format markdown --output <artifact-directory>/report.md`
- Inputs: ten public repositories at the exact branches, commits, and commit dates in [results.json](results.json)
- Runs: two scans per repository; determinism means both generated reports had the same SHA-256

Each repository was scanned as an isolated standalone app checkout. Frappe Framework and other required or optional app schemas were not added to the workspace. This deliberately tests standalone behavior but causes many unknown-DocType findings where the definition lives in Frappe, ERPNext, Telephony, or another external dependency.

Community mode produced Markdown only. No Pro license was used, so JSON/SARIF exports and migration diff were not available. The public JSON and CSV files in this directory are benchmark metadata assembled from the Markdown report and exact run metadata; they are not CLI JSON/SARIF exports.

## Success and exit code

A scan is successful when the CLI completes, writes its report, and records parseable counts. All ten scans met that condition. Exit code `1` means the findings threshold was met; it does not mean the scan crashed. Stderr was empty for every recorded run.

## Counts and review

Errors and warnings are raw CLI counts and are not severity claims about the underlying projects. Exactly three representative findings per project were manually reviewed against the report and source checkout, for 30 reviewed findings total.

Classifications:

- **Likely-actionable:** source evidence shows an internally inconsistent reference that maintainers may want to inspect.
- **Needs-maintainer-context:** the isolated scan lacks dependency or deployment context needed for a defensible conclusion.
- **False-positive:** the reported unresolved target is present or resolvable in the scanned source.

These labels apply only to the 30 sampled findings. They must not be extrapolated to all 3,418 raw findings.

## Source verification examples

ERPNext's `POS Profile.utm_medium` field targets `UTM Campaign`, while adjacent fields and other ERPNext `utm_medium` definitions use `UTM Medium`. Gameplan's patch list uses the removed `team_user_profile` package path at line 6 while later entries use the current `gp_user_profile` package.

For the principal false-positive case study, Lending reports `lending.patches.v15_0.generate_loan_repayment_schedule` as unresolved, but `lending/patches/v15_0/generate_loan_repayment_schedule.py` exists at the scanned commit.

## Sanitization and integrity

Published `report.md` files are byte-for-byte copies of `report-run1.md`. The generator verifies each report against the run-1 checksum before copying it and writes `report.sha256`. Reports and metadata are checked for local absolute paths and common secret markers. Public paths use repository-relative or placeholder paths only.

Run [the validator](scripts/validate.mjs) with `node benchmarks/scripts/validate.mjs` from the repository root. Regenerate from a private artifact directory with `node benchmarks/scripts/generate.mjs <benchmark-source-root>`; the source root is never written to public output.
