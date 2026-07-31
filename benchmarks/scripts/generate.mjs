import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const benchmarkDir = path.resolve(scriptDir, "..");
const sourceRoot = process.argv[2] ? path.resolve(process.argv[2]) : null;

if (!sourceRoot) {
  console.error("Usage: node benchmarks/scripts/generate.mjs <benchmark-source-root>");
  process.exit(2);
}

const classifications = ["likely-actionable", "needs-maintainer-context", "false-positive"];
const projects = [
  {
    slug: "erpnext",
    name: "ERPNext",
    reviews: [
      {
        classification: "likely-actionable",
        rule: "FI002",
        finding: "POS Profile.utm_medium points to UTM Campaign.",
        location: "erpnext/accounts/doctype/pos_profile/pos_profile.json:417",
        evidence: "The neighboring utm_campaign and utm_source fields target UTM Campaign and UTM Source, while other ERPNext utm_medium fields target UTM Medium. The source at lines 417-420 instead targets UTM Campaign.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target erpnext.patches.v12_0.update_is_cancelled_field could not be resolved.",
        location: "erpnext/patches.txt:2",
        evidence: "The target module exists at erpnext/patches/v12_0/update_is_cancelled_field.py in the scanned commit.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target erpnext.patches.v11_0.rename_production_order_to_work_order could not be resolved.",
        location: "erpnext/patches.txt:3",
        evidence: "The target module exists at erpnext/patches/v11_0/rename_production_order_to_work_order.py in the scanned commit.",
      },
    ],
  },
  {
    slug: "hrms",
    name: "HRMS",
    reviews: [
      {
        classification: "needs-maintainer-context",
        rule: "FI002",
        finding: "Appraisal.employee points to unknown DocType Employee.",
        location: "hrms/hr/doctype/appraisal/appraisal.json:58",
        evidence: "hrms/hooks.py declares required_apps = [\"frappe/erpnext\"]. Employee belongs to the omitted dependency schema, so the isolated app scan cannot decide the installed-bench result.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target hrms.patches.v15_0.check_version_compatibility_with_frappe could not be resolved.",
        location: "hrms/patches.txt:2",
        evidence: "The module exists at hrms/patches/v15_0/check_version_compatibility_with_frappe.py.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target hrms.patches.v16_0.merge_interview_round_with_interview_type could not be resolved.",
        location: "hrms/patches.txt:3",
        evidence: "The module exists at hrms/patches/v16_0/merge_interview_round_with_interview_type.py.",
      },
    ],
  },
  {
    slug: "payments",
    name: "Payments",
    reviews: [
      {
        classification: "needs-maintainer-context",
        rule: "FI010",
        finding: "Unknown DocType Web Form.",
        location: "payments/overrides/payment_webform.py:68",
        evidence: "Web Form is supplied by Frappe, whose schema was not included in this standalone app scan.",
      },
      {
        classification: "needs-maintainer-context",
        rule: "FI010",
        finding: "Unknown DocType Payment Request.",
        location: "payments/payment_gateways/doctype/braintree_settings/braintree_settings.py:281",
        evidence: "The source intentionally loads Payment Request in a gateway integration; the standalone scan omitted the external app schema that supplies that DocType.",
      },
      {
        classification: "false-positive",
        rule: "FI030",
        finding: "Hook before_install target payments.utils.before_install could not be resolved.",
        location: "payments/hooks.py:66",
        evidence: "payments/utils/__init__.py re-exports before_install from payments/utils/utils.py, where the function is defined.",
      },
    ],
  },
  {
    slug: "lending",
    name: "Lending",
    reviews: [
      {
        classification: "needs-maintainer-context",
        rule: "FI002",
        finding: "Loan Product.company points to unknown DocType Company.",
        location: "lending/loan_management/doctype/loan_product/loan_product.json:175",
        evidence: "lending/hooks.py declares required_apps = [\"erpnext\"]. Company is supplied outside this isolated app checkout.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target lending.patches.v15_0.generate_loan_repayment_schedule could not be resolved.",
        location: "lending/patches.txt:4",
        evidence: "The reported module exists at lending/patches/v15_0/generate_loan_repayment_schedule.py. This is the benchmark's detailed false-positive case study.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target lending.patches.v15_0.rename_process_asset_classification_doctype could not be resolved.",
        location: "lending/patches.txt:5",
        evidence: "The module exists at lending/patches/v15_0/rename_process_asset_classification_doctype.py.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education",
    reviews: [
      {
        classification: "needs-maintainer-context",
        rule: "FI002",
        finding: "Course.department points to unknown DocType Department.",
        location: "education/education/doctype/course/course.json:33",
        evidence: "education/hooks.py declares required_apps = [\"erpnext\"]. Department is supplied by the omitted dependency schema.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target education.patches.v14_0.create_student_party_type could not be resolved.",
        location: "education/patches.txt:2",
        evidence: "The module exists at education/patches/v14_0/create_student_party_type.py.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target education.patches.v14_0.create_parent_assessment_group could not be resolved.",
        location: "education/patches.txt:5",
        evidence: "The module exists at education/patches/v14_0/create_parent_assessment_group.py.",
      },
    ],
  },
  {
    slug: "helpdesk",
    name: "Helpdesk",
    reviews: [
      {
        classification: "needs-maintainer-context",
        rule: "FI010",
        finding: "Unknown DocType TP Call Log.",
        location: "helpdesk/helpdesk/doctype/hd_ticket/api.py:98",
        evidence: "helpdesk/hooks.py declares required_apps = [\"telephony\"]. The telephony schema was not part of this isolated checkout.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target helpdesk.patches.change_app_name_to_helpdesk could not be resolved.",
        location: "helpdesk/patches.txt:2",
        evidence: "The module exists at helpdesk/patches/change_app_name_to_helpdesk.py.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target helpdesk.patches.rename_doctypes_prefix_with_hd could not be resolved.",
        location: "helpdesk/patches.txt:3",
        evidence: "The module exists at helpdesk/patches/rename_doctypes_prefix_with_hd.py.",
      },
    ],
  },
  {
    slug: "crm",
    name: "CRM",
    reviews: [
      {
        classification: "needs-maintainer-context",
        rule: "FI010",
        finding: "Unknown DocType WhatsApp Message.",
        location: "crm/api/whatsapp.py:129",
        evidence: "The reference is inside the WhatsApp integration. The isolated checkout does not include the optional integration schema, and crm/hooks.py does not make that deployment context explicit.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target crm.patches.v1_0.move_crm_note_data_to_fcrm_note could not be resolved.",
        location: "crm/patches.txt:4",
        evidence: "The module exists at crm/patches/v1_0/move_crm_note_data_to_fcrm_note.py.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target crm.patches.v1_0.rename_twilio_settings_to_crm_twilio_settings could not be resolved.",
        location: "crm/patches.txt:5",
        evidence: "The module exists at crm/patches/v1_0/rename_twilio_settings_to_crm_twilio_settings.py.",
      },
    ],
  },
  {
    slug: "insights",
    name: "Insights",
    reviews: [
      {
        classification: "needs-maintainer-context",
        rule: "FI002",
        finding: "Insights Team Member.user points to unknown DocType User.",
        location: "insights/insights/doctype/insights_team_member/insights_team_member.json:13",
        evidence: "User is a Frappe core DocType. This standalone app scan did not include the Frappe schema.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target insights.patches.normalize_workbook could not be resolved.",
        location: "insights/patches.txt:3",
        evidence: "The module exists at insights/patches/normalize_workbook.py.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target insights.patches.enable_data_store could not be resolved.",
        location: "insights/patches.txt:8",
        evidence: "The module exists at insights/patches/enable_data_store.py.",
      },
    ],
  },
  {
    slug: "drive",
    name: "Drive",
    reviews: [
      {
        classification: "needs-maintainer-context",
        rule: "FI002",
        finding: "Drive Entity Activity Log.entity points to unknown DocType File.",
        location: "drive/drive/doctype/drive_entity_activity_log/drive_entity_activity_log.json:44",
        evidence: "File is a Frappe core DocType. The isolated app scan omitted the Frappe schema used by Drive at runtime.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target drive.patches.team_restructure could not be resolved.",
        location: "drive/patches.txt:2",
        evidence: "The module exists at drive/patches/team_restructure.py.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target drive.patches.update_roles could not be resolved.",
        location: "drive/patches.txt:3",
        evidence: "The module exists at drive/patches/update_roles.py.",
      },
    ],
  },
  {
    slug: "gameplan",
    name: "Gameplan",
    reviews: [
      {
        classification: "likely-actionable",
        rule: "FI031",
        finding: "Patch target gameplan.gameplan.doctype.team_user_profile.patches.create_user_profile could not be resolved.",
        location: "gameplan/patches.txt:6",
        evidence: "The checkout contains gp_user_profile, not team_user_profile. Later patch entries already use gameplan.gameplan.doctype.gp_user_profile, so the old package path is inconsistent with the current source tree.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target gameplan.gameplan.doctype.gp_user_profile.patches.backfill_community_order could not be resolved.",
        location: "gameplan/patches.txt:39",
        evidence: "The module exists at gameplan/doctype/gp_user_profile/patches/backfill_community_order.py.",
      },
      {
        classification: "false-positive",
        rule: "FI031",
        finding: "Patch target gameplan.gameplan.doctype.gp_user_profile.patches.merge_profile_bento_card_types could not be resolved.",
        location: "gameplan/patches.txt:43",
        evidence: "The module exists at gameplan/doctype/gp_user_profile/patches/merge_profile_bento_card_types.py.",
      },
    ],
  },
];

const mkdir = (relative) => fs.mkdirSync(path.join(benchmarkDir, relative), { recursive: true });
const write = (relative, value) => {
  const target = path.join(benchmarkDir, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, value.replaceAll("\r\n", "\n"), "utf8");
};
const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const countReviews = (reviews) => Object.fromEntries(classifications.map((key) => [key, reviews.filter((item) => item.classification === key).length]));

for (const directory of ["projects", "reports", "rendered/projects", "screenshots"]) mkdir(directory);

const records = projects.map((project) => {
  const artifactDir = path.join(sourceRoot, "artifacts", project.slug);
  const metadataPath = path.join(artifactDir, "metadata.raw.json");
  const reportPath = path.join(artifactDir, "report-run1.md");
  const metadataText = fs.readFileSync(metadataPath, "utf8");
  const metadata = JSON.parse(metadataText);
  const report = fs.readFileSync(reportPath);
  const reportSha256 = sha256(report);
  const run = metadata.runs[0];

  if (reportSha256 !== run.reportSha256) throw new Error(`${project.slug}: run-1 checksum mismatch`);
  if (metadata.cliVersion !== "1.2.3" || metadata.license !== "community") throw new Error(`${project.slug}: unexpected CLI/license metadata`);
  if (metadata.runs.length !== 2 || !metadata.deterministic || metadata.runs[1].reportSha256 !== reportSha256) throw new Error(`${project.slug}: non-deterministic artifacts`);

  const publicReportDir = path.join(benchmarkDir, "reports", project.slug);
  fs.mkdirSync(publicReportDir, { recursive: true });
  fs.copyFileSync(reportPath, path.join(publicReportDir, "report.md"));
  fs.copyFileSync(metadataPath, path.join(publicReportDir, "metadata.json"));
  fs.writeFileSync(path.join(publicReportDir, "report.sha256"), `${reportSha256}  report.md\n`, "utf8");

  const reviewed = countReviews(project.reviews);
  return {
    project: project.name,
    slug: project.slug,
    repository: metadata.repository,
    branch: metadata.branch,
    commit: metadata.commit,
    commitDate: metadata.commitDate,
    benchmarkDate: metadata.benchmarkDate,
    cli: { package: metadata.cliPackage, version: metadata.cliVersion, license: metadata.license },
    environment: { nodeVersion: metadata.nodeVersion, npmVersion: metadata.npmVersion },
    command: metadata.command,
    status: "success",
    scan: {
      exitCode: run.exitCode,
      completed: run.completed,
      startedAt: run.startedAt,
      endedAt: run.endedAt,
      durationMs: run.durationMs,
      errors: run.errors,
      warnings: run.warnings,
      rawFindings: run.errors + run.warnings,
      riskyMigrations: run.riskyMigrations,
      needsReview: run.needsReview,
      stderrEmpty: run.stderrEmpty,
      reportSha256,
    },
    deterministic: metadata.deterministic,
    reviewed: {
      total: project.reviews.length,
      likelyActionable: reviewed["likely-actionable"],
      needsMaintainerContext: reviewed["needs-maintainer-context"],
      falsePositive: reviewed["false-positive"],
      findings: project.reviews,
    },
    artifacts: {
      projectPage: `projects/${project.slug}.md`,
      report: `reports/${project.slug}/report.md`,
      checksum: `reports/${project.slug}/report.sha256`,
      metadata: `reports/${project.slug}/metadata.json`,
      screenshot: `screenshots/${project.slug}.webp`,
    },
  };
});

const totals = records.reduce((sum, record) => ({
  projects: sum.projects + 1,
  success: sum.success + (record.status === "success" ? 1 : 0),
  failure: sum.failure + (record.status === "success" ? 0 : 1),
  errors: sum.errors + record.scan.errors,
  warnings: sum.warnings + record.scan.warnings,
  rawFindings: sum.rawFindings + record.scan.rawFindings,
  durationMs: sum.durationMs + record.scan.durationMs,
  reviewed: sum.reviewed + record.reviewed.total,
  likelyActionable: sum.likelyActionable + record.reviewed.likelyActionable,
  needsMaintainerContext: sum.needsMaintainerContext + record.reviewed.needsMaintainerContext,
  falsePositive: sum.falsePositive + record.reviewed.falsePositive,
  deterministic: sum.deterministic + (record.deterministic ? 1 : 0),
}), { projects: 0, success: 0, failure: 0, errors: 0, warnings: 0, rawFindings: 0, durationMs: 0, reviewed: 0, likelyActionable: 0, needsMaintainerContext: 0, falsePositive: 0, deterministic: 0 });

const results = {
  schemaVersion: "1.0.0",
  benchmark: "Frappe Inspector public Community benchmark v1",
  benchmarkDate: "2026-07-30",
  methodology: "methodology.md",
  scope: "Isolated standalone scans of ten public Frappe applications. Frappe and external dependency schemas were not included.",
  caveats: [
    "Community mode was used without a Pro license.",
    "JSON and SARIF exports and migration diff were unavailable in this run.",
    "Exit code 1 indicates that the findings threshold was met; completed report generation is recorded as scan success.",
    "Reviewed classifications apply only to the 30 sampled findings, not to every raw finding.",
  ],
  totals,
  projects: records,
};

write("results.json", `${JSON.stringify(results, null, 2)}\n`);

const csvColumns = ["project", "slug", "repository", "branch", "commit", "commit_date", "benchmark_date", "cli_version", "license", "status", "exit_code", "errors", "warnings", "raw_findings", "duration_ms", "deterministic", "reviewed", "likely_actionable", "needs_maintainer_context", "false_positive"];
const csvEscape = (value) => `"${String(value).replaceAll('"', '""')}"`;
const csvRows = records.map((record) => [record.project, record.slug, record.repository, record.branch, record.commit, record.commitDate, record.benchmarkDate, record.cli.version, record.cli.license, record.status, record.scan.exitCode, record.scan.errors, record.scan.warnings, record.scan.rawFindings, record.scan.durationMs, record.deterministic, record.reviewed.total, record.reviewed.likelyActionable, record.reviewed.needsMaintainerContext, record.reviewed.falsePositive].map(csvEscape).join(","));
write("results.csv", `${csvColumns.join(",")}\n${csvRows.join("\n")}\n`);

const schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://github.com/Belius303/frappe-inspector-support/blob/main/benchmarks/schema.json",
  title: "Frappe Inspector public benchmark results",
  description: "Schema for benchmarks/results.json. Counts are raw CLI output; reviewed findings are a fixed three-item sample per project.",
  type: "object",
  additionalProperties: false,
  required: ["schemaVersion", "benchmark", "benchmarkDate", "methodology", "scope", "caveats", "totals", "projects"],
  properties: {
    schemaVersion: { const: "1.0.0" },
    benchmark: { type: "string" },
    benchmarkDate: { type: "string", format: "date" },
    methodology: { type: "string" },
    scope: { type: "string" },
    caveats: { type: "array", items: { type: "string" } },
    totals: { "$ref": "#/$defs/totals" },
    projects: { type: "array", minItems: 10, maxItems: 10, items: { "$ref": "#/$defs/project" } },
  },
  "$defs": {
    nonNegativeInteger: { type: "integer", minimum: 0 },
    totals: {
      type: "object",
      additionalProperties: false,
      required: ["projects", "success", "failure", "errors", "warnings", "rawFindings", "durationMs", "reviewed", "likelyActionable", "needsMaintainerContext", "falsePositive", "deterministic"],
      properties: Object.fromEntries(["projects", "success", "failure", "errors", "warnings", "rawFindings", "durationMs", "reviewed", "likelyActionable", "needsMaintainerContext", "falsePositive", "deterministic"].map((key) => [key, { "$ref": "#/$defs/nonNegativeInteger" }])),
    },
    finding: {
      type: "object",
      additionalProperties: false,
      required: ["classification", "rule", "finding", "location", "evidence"],
      properties: {
        classification: { enum: classifications },
        rule: { type: "string", pattern: "^FI[0-9]{3}$" },
        finding: { type: "string" },
        location: { type: "string", pattern: "^[^:]+:[0-9]+$" },
        evidence: { type: "string" },
      },
    },
    project: {
      type: "object",
      required: ["project", "slug", "repository", "branch", "commit", "commitDate", "benchmarkDate", "cli", "environment", "command", "status", "scan", "deterministic", "reviewed", "artifacts"],
      properties: {
        project: { type: "string" }, slug: { type: "string" }, repository: { type: "string", format: "uri" }, branch: { type: "string" }, commit: { type: "string", pattern: "^[0-9a-f]{40}$" }, commitDate: { type: "string", format: "date-time" }, benchmarkDate: { type: "string", format: "date" },
        cli: { type: "object" }, environment: { type: "object" }, command: { type: "string" }, status: { const: "success" }, scan: { type: "object" }, deterministic: { type: "boolean" }, artifacts: { type: "object" },
        reviewed: { type: "object", required: ["total", "likelyActionable", "needsMaintainerContext", "falsePositive", "findings"], properties: { total: { const: 3 }, likelyActionable: { "$ref": "#/$defs/nonNegativeInteger" }, needsMaintainerContext: { "$ref": "#/$defs/nonNegativeInteger" }, falsePositive: { "$ref": "#/$defs/nonNegativeInteger" }, findings: { type: "array", minItems: 3, maxItems: 3, items: { "$ref": "#/$defs/finding" } } } },
      },
    },
  },
};
write("schema.json", `${JSON.stringify(schema, null, 2)}\n`);

const tableRows = records.map((record) => `| [${record.project}](projects/${record.slug}.md) | [\`${record.commit.slice(0, 8)}\`](${record.repository.replace(/\.git$/, "")}/commit/${record.commit}) | ${record.scan.errors.toLocaleString("en-US")} | ${record.scan.warnings.toLocaleString("en-US")} | ${record.scan.durationMs.toLocaleString("en-US")} ms | ${record.reviewed.likelyActionable} / ${record.reviewed.needsMaintainerContext} / ${record.reviewed.falsePositive} | Yes |`).join("\n");
write("README.md", `# Public benchmark v1

![Rendered overview of the ten-project Frappe Inspector Community benchmark](screenshots/overview.webp)

This dataset records isolated, standalone scans of ten public Frappe applications with \`@frappe-inspector/cli\` **1.2.3 Community** on 2026-07-30. All ten scans completed and produced reports. Exit code \`1\` is the configured findings-threshold result, not a scan failure.

## Results

| Project | Commit | Errors | Warnings | Run 1 | Reviewed L / C / F | Deterministic |
| --- | --- | ---: | ---: | ---: | ---: | :---: |
${tableRows}

Aggregate: **10 success / 0 failure**, **2,374 errors**, **1,044 warnings**, **3,418 raw findings**, and **10/10 deterministic** two-run report checks. Manual review covers exactly **30 representative findings**: **2 likely-actionable**, **9 needs-maintainer-context**, and **19 false-positive**.

## Read the evidence

- [Methodology and limitations](methodology.md)
- [Machine-readable JSON](results.json) and [documented schema](schema.json)
- [CSV summary](results.csv)
- [Manual VS Code Community screenshot checklist](manual-vscode-screenshot-checklist.md)
- Full sanitized reports, exact raw metadata, and SHA-256 files under [reports/](reports/)

The Lending \`FI031\` report for \`generate_loan_repayment_schedule\` is the detailed false-positive case study: the reported module exists in the scanned source. The two likely-actionable samples are the ERPNext \`POS Profile.utm_medium\` Link target inconsistency and the Gameplan legacy \`team_user_profile\` patch package path.

## Disclaimer

Frappe Inspector is an independent third-party project. This benchmark is not affiliated with or endorsed by Frappe Technologies or the maintainers of the scanned projects. It is a static-analysis product benchmark, not a security assessment or security disclosure. The classifications describe sampled tool findings and must not be read as claims about project quality or maintainers.
`);

write("methodology.md", `# Methodology

## Reproducible setup

- Date: 2026-07-30
- CLI: \`@frappe-inspector/cli\` 1.2.3
- License: Community, with no Pro license active
- Runtime: Node.js v22.11.0 and npm 11.4.2
- Command template: \`frappe-inspector scan <project-path> --format markdown --output <artifact-directory>/report.md\`
- Inputs: ten public repositories at the exact branches, commits, and commit dates in [results.json](results.json)
- Runs: two scans per repository; determinism means both generated reports had the same SHA-256

Each repository was scanned as an isolated standalone app checkout. Frappe Framework and other required or optional app schemas were not added to the workspace. This deliberately tests standalone behavior but causes many unknown-DocType findings where the definition lives in Frappe, ERPNext, Telephony, or another external dependency.

Community mode produced Markdown only. No Pro license was used, so JSON/SARIF exports and migration diff were not available. The public JSON and CSV files in this directory are benchmark metadata assembled from the Markdown report and exact run metadata; they are not CLI JSON/SARIF exports.

## Success and exit code

A scan is successful when the CLI completes, writes its report, and records parseable counts. All ten scans met that condition. Exit code \`1\` means the findings threshold was met; it does not mean the scan crashed. Stderr was empty for every recorded run.

## Counts and review

Errors and warnings are raw CLI counts and are not severity claims about the underlying projects. Exactly three representative findings per project were manually reviewed against the report and source checkout, for 30 reviewed findings total.

Classifications:

- **Likely-actionable:** source evidence shows an internally inconsistent reference that maintainers may want to inspect.
- **Needs-maintainer-context:** the isolated scan lacks dependency or deployment context needed for a defensible conclusion.
- **False-positive:** the reported unresolved target is present or resolvable in the scanned source.

These labels apply only to the 30 sampled findings. They must not be extrapolated to all 3,418 raw findings.

## Source verification examples

ERPNext's \`POS Profile.utm_medium\` field targets \`UTM Campaign\`, while adjacent fields and other ERPNext \`utm_medium\` definitions use \`UTM Medium\`. Gameplan's patch list uses the removed \`team_user_profile\` package path at line 6 while later entries use the current \`gp_user_profile\` package.

For the principal false-positive case study, Lending reports \`lending.patches.v15_0.generate_loan_repayment_schedule\` as unresolved, but \`lending/patches/v15_0/generate_loan_repayment_schedule.py\` exists at the scanned commit.

## Sanitization and integrity

Published \`report.md\` files are byte-for-byte copies of \`report-run1.md\`. The generator verifies each report against the run-1 checksum before copying it and writes \`report.sha256\`. Reports and metadata are checked for local absolute paths and common secret markers. Public paths use repository-relative or placeholder paths only.

Run [the validator](scripts/validate.mjs) with \`node benchmarks/scripts/validate.mjs\` from the repository root. Regenerate from a private artifact directory with \`node benchmarks/scripts/generate.mjs <benchmark-source-root>\`; the source root is never written to public output.
`);

write("manual-vscode-screenshot-checklist.md", `# Manual VS Code Community screenshot checklist

Playwright renders only the benchmark HTML used for the published WebP files. It does not control VS Code. The following captures require a person using **VS Code Community** with the public extension and the exact repository commit.

## ERPNext

- Repository: \`frappe/erpnext\` at \`d59c5e36\`.
- File: \`erpnext/accounts/doctype/pos_profile/pos_profile.json\`, around line 417.
- Command: **Frappe Inspector: Scan Project**.
- Visible evidence: the Frappe Problems view and editor diagnostic for \`POS Profile.utm_medium\` targeting \`UTM Campaign\`.
- Capture area: editor line 417-420 plus the single matching Problems entry; exclude account names, local folders, terminals, notifications, and unrelated extensions.

## Payments

- Repository: \`frappe/payments\` at \`aa351682\`.
- File: \`payments/payment_gateways/doctype/payment_gateway/payment_gateway.json\`, around line 23.
- Command: **Frappe Inspector: Show DocType Graph**.
- Visible evidence: Payment Gateway and the missing or external \`DocType\` relation as rendered by the Community graph.
- Capture area: graph canvas, project label, and relation detail only; exclude local paths, user profile, terminals, and license UI.

## Gameplan

- Repository: \`frappe/gameplan\` at \`1de86a8f\`.
- File: \`gameplan/patches.txt\`, around line 6.
- Command: **Frappe Inspector: Scan Project**.
- Visible evidence: the \`FI031\` diagnostic for \`team_user_profile.patches.create_user_profile\` and the obsolete path in the editor.
- Capture area: editor line 6 plus the matching Problems entry; exclude local folders, usernames, terminals, notifications, and unrelated diagnostics.

Before publishing, confirm every image says or is captioned **VS Code Community**, shows the expected short commit, contains no username or absolute path, and does not imply that Playwright automated the editor capture.
`);

for (const record of records) {
  const reviewLines = record.reviewed.findings.map((item, index) => `${index + 1}. **${item.classification} - ${item.rule}**: ${item.finding}\n   - Location: \`${item.location}\`\n   - Source verification: ${item.evidence}`).join("\n");
  write(`projects/${record.slug}.md`, `# ${record.project}

![Rendered ${record.project} benchmark summary showing commit, CLI version, scan counts, duration, and reviewed classifications](../screenshots/${record.slug}.webp)

| Field | Value |
| --- | --- |
| Repository | [${record.repository}](${record.repository.replace(/\.git$/, "")}) |
| Branch | \`${record.branch}\` |
| Commit | [\`${record.commit}\`](${record.repository.replace(/\.git$/, "")}/commit/${record.commit}) |
| Commit date | \`${record.commitDate}\` |
| Benchmark date | \`${record.benchmarkDate}\` |
| CLI | \`${record.cli.package}\` ${record.cli.version} Community |
| Status | Success; report generated, exit \`${record.scan.exitCode}\` indicates findings threshold |
| Run 1 | ${record.scan.errors.toLocaleString("en-US")} errors, ${record.scan.warnings.toLocaleString("en-US")} warnings, ${record.scan.rawFindings.toLocaleString("en-US")} raw findings in ${record.scan.durationMs.toLocaleString("en-US")} ms |
| Deterministic | Yes; run 1 and run 2 report SHA-256 matched |

## Manual review

${reviewLines}

Reviewed split: **${record.reviewed.likelyActionable} likely-actionable**, **${record.reviewed.needsMaintainerContext} needs-maintainer-context**, **${record.reviewed.falsePositive} false-positive**.

## Artifacts

- [Full sanitized Markdown report](../reports/${record.slug}/report.md)
- [SHA-256](../reports/${record.slug}/report.sha256)
- [Exact raw scan metadata](../reports/${record.slug}/metadata.json)
- [Methodology and limitations](../methodology.md)

This was an isolated standalone scan. Frappe and external dependency schemas were omitted. No Pro license, JSON/SARIF export, or migration diff was used. Findings are static-analysis output, not security claims.
`);
}

const style = `<style>
*{box-sizing:border-box}body{margin:0;background:#f4f6f8;color:#16202a;font-family:Inter,Segoe UI,Arial,sans-serif;letter-spacing:0}.shell{width:1200px;min-height:720px;padding:48px 56px;background:#f4f6f8}.top{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #c8d0d8;padding-bottom:20px}.brand{font-size:16px;font-weight:700;color:#0b6b57;text-transform:uppercase}.meta{font-size:15px;color:#52606d}.hero{display:flex;align-items:flex-end;justify-content:space-between;padding:32px 0 28px}.hero h1{font-size:48px;line-height:1.05;margin:0 0 10px}.hero p{font-size:18px;color:#52606d;margin:0}.status{background:#dff4eb;color:#0b6b57;border:1px solid #9fd7c5;padding:10px 14px;border-radius:6px;font-weight:700}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.metric{background:#fff;border:1px solid #d7dde3;border-radius:6px;padding:18px}.metric strong{display:block;font-size:29px;margin-top:8px}.label{font-size:13px;text-transform:uppercase;color:#65727e}.review{margin-top:20px;background:#16202a;color:#fff;padding:22px;border-radius:6px;display:grid;grid-template-columns:1.5fr repeat(3,1fr);gap:20px;align-items:center}.review h2{font-size:18px;margin:0}.review strong{font-size:28px;display:block;margin-bottom:4px}.review span{font-size:13px;color:#ccd4db}.table{margin-top:22px;background:#fff;border:1px solid #d7dde3;border-radius:6px;overflow:hidden}.row{display:grid;grid-template-columns:1.4fr .7fr .7fr .7fr .8fr .8fr;padding:13px 16px;border-top:1px solid #e4e8ec;align-items:center}.row:first-child{border-top:0;background:#e9edf1;font-size:12px;text-transform:uppercase;font-weight:700;color:#52606d}.row b{font-size:14px}.note{font-size:12px;color:#65727e;margin-top:18px}.accent{color:#b6422e}.warn{color:#9b6500}
</style>`;
const page = (title, body) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title>${style}</head><body>${body}</body></html>`;

const overviewRows = records.map((record) => `<div class="row"><b>${escapeHtml(record.project)}</b><span>${record.commit.slice(0, 8)}</span><span class="accent">${record.scan.errors}</span><span class="warn">${record.scan.warnings}</span><span>${record.scan.durationMs} ms</span><span>${record.reviewed.likelyActionable}/${record.reviewed.needsMaintainerContext}/${record.reviewed.falsePositive}</span></div>`).join("");
write("rendered/index.html", page("Public benchmark overview", `<main class="shell"><header class="top"><div class="brand">Frappe Inspector / Public benchmark</div><div class="meta">CLI 1.2.3 Community · 2026-07-30</div></header><section class="hero"><div><h1>10 public Frappe apps</h1><p>Standalone deterministic scan evidence with source-reviewed samples</p></div><div class="status">10 success · 0 failure</div></section><section class="metrics"><div class="metric"><span class="label">Errors</span><strong>${totals.errors.toLocaleString("en-US")}</strong></div><div class="metric"><span class="label">Warnings</span><strong>${totals.warnings.toLocaleString("en-US")}</strong></div><div class="metric"><span class="label">Raw findings</span><strong>${totals.rawFindings.toLocaleString("en-US")}</strong></div><div class="metric"><span class="label">Deterministic</span><strong>${totals.deterministic}/10</strong></div></section><section class="review"><h2>30 representative findings reviewed</h2><div><strong>2</strong><span>Likely-actionable</span></div><div><strong>9</strong><span>Needs maintainer context</span></div><div><strong>19</strong><span>False-positive</span></div></section><section class="table"><div class="row"><span>Project</span><span>Commit</span><span>Errors</span><span>Warnings</span><span>Duration</span><span>Review L/C/F</span></div>${overviewRows}</section><p class="note">Isolated standalone scans omit Frappe and external dependency schemas. Exit 1 is the findings threshold. No Pro license, JSON/SARIF export, or migration diff.</p></main>`));

for (const record of records) {
  write(`rendered/projects/${record.slug}.html`, page(`${record.project} benchmark`, `<main class="shell"><header class="top"><div class="brand">Frappe Inspector / Public benchmark</div><div class="meta">${record.benchmarkDate}</div></header><section class="hero"><div><h1>${escapeHtml(record.project)}</h1><p>${record.commit.slice(0, 8)} · ${escapeHtml(record.branch)} · CLI ${record.cli.version} Community</p></div><div class="status">Scan success</div></section><section class="metrics"><div class="metric"><span class="label">Errors</span><strong>${record.scan.errors.toLocaleString("en-US")}</strong></div><div class="metric"><span class="label">Warnings</span><strong>${record.scan.warnings.toLocaleString("en-US")}</strong></div><div class="metric"><span class="label">Raw findings</span><strong>${record.scan.rawFindings.toLocaleString("en-US")}</strong></div><div class="metric"><span class="label">Duration</span><strong>${record.scan.durationMs.toLocaleString("en-US")} ms</strong></div></section><section class="review"><h2>3 representative findings reviewed</h2><div><strong>${record.reviewed.likelyActionable}</strong><span>Likely-actionable</span></div><div><strong>${record.reviewed.needsMaintainerContext}</strong><span>Needs maintainer context</span></div><div><strong>${record.reviewed.falsePositive}</strong><span>False-positive</span></div></section><section class="table"><div class="row" style="grid-template-columns:.35fr .55fr 2.2fr"><span>Class</span><span>Rule</span><span>Finding</span></div>${record.reviewed.findings.map((item) => `<div class="row" style="grid-template-columns:.35fr .55fr 2.2fr"><b>${item.classification === "likely-actionable" ? "Likely" : item.classification === "needs-maintainer-context" ? "Context" : "False"}</b><span>${item.rule}</span><span>${escapeHtml(item.finding)}</span></div>`).join("")}</section><p class="note">Deterministic: yes · report SHA-256 ${record.scan.reportSha256.slice(0, 16)}… · Exit 1 is the findings threshold. Standalone scan omits dependency schemas.</p></main>`));
}

console.log(`Generated ${records.length} project records and ${totals.rawFindings} raw findings.`);
