import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = process.argv[2] ? path.resolve(process.argv[2]) : null;
if (!sourceRoot) {
  console.error("Usage: node benchmarks/v2/scripts/import.mjs <private-benchmark-root>");
  process.exit(2);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const benchmarkDir = path.resolve(scriptDir, "..");
const artifactsRoot = path.join(sourceRoot, "artifacts");

const sources = {
  frappe: {
    repository: "https://github.com/frappe/frappe",
    commit: "a38f6430410966b90e2c7efcf84d77698ae74d60",
    commitDate: "2026-07-31T16:27:13+05:30",
  },
  telephony: {
    repository: "https://github.com/frappe/telephony",
    commit: "e04272a4d6b78862cfdbde4256a06b2cab79a607",
    commitDate: "2026-07-14T15:23:57+05:30",
  },
  erpnext: {
    repository: "https://github.com/frappe/erpnext",
    commit: "d59c5e36bcb53be84ec46bd5d29b5c0b2f46f929",
    commitDate: "2026-07-30T23:24:59+05:30",
  },
  hrms: {
    repository: "https://github.com/frappe/hrms",
    commit: "fd430b654630becd4ae5298089450c9b2abd3753",
    commitDate: "2026-07-30T15:02:03+05:30",
  },
  payments: {
    repository: "https://github.com/frappe/payments",
    commit: "aa3516827fe51d5557975b74e574e3bca9a3070d",
    commitDate: "2026-06-15T10:44:53+05:30",
  },
  lending: {
    repository: "https://github.com/frappe/lending",
    commit: "ee9269ba08b72fd22295a993986d6502ce1bc399",
    commitDate: "2026-07-29T10:47:12+05:30",
  },
  education: {
    repository: "https://github.com/frappe/education",
    commit: "71aada478bf682f6d034fd4caa6f2f5438b5ace9",
    commitDate: "2026-06-05T15:45:42+03:00",
  },
  helpdesk: {
    repository: "https://github.com/frappe/helpdesk",
    commit: "d51b186dc51b49fa7ac93a40df7e736e1a97708d",
    commitDate: "2026-07-31T03:53:33+05:30",
  },
  crm: {
    repository: "https://github.com/frappe/crm",
    commit: "824fc779b8db3945a6fbd6ea95b08701d6195d60",
    commitDate: "2026-07-31T02:09:52+05:30",
  },
  insights: {
    repository: "https://github.com/frappe/insights",
    commit: "1a78fa6631d158f115c507d1224cc50a3d0de36a",
    commitDate: "2026-07-30T14:31:48+05:30",
  },
  drive: {
    repository: "https://github.com/frappe/drive",
    commit: "cd3438d1ab0b0fc1b8c10e282639ec0bd2ee7d82",
    commitDate: "2026-06-25T08:03:10+05:30",
  },
  gameplan: {
    repository: "https://github.com/frappe/gameplan",
    commit: "1de86a8fce4a16e25ef1797fd890c1fbcc7ea89e",
    commitDate: "2026-07-30T23:28:11+05:30",
  },
};

const projects = ["erpnext", "hrms", "payments", "lending", "education", "helpdesk", "crm", "insights", "drive", "gameplan"];
const interpretations = {
  erpnext: "Three unresolved active DocType references and one unresolved Link target remain; the report also contains historical test and patch notes. Maintainer context is required.",
  hrms: "All errors and warnings target Lending DocTypes while Lending is not part of this bench. Static file scanning cannot prove the runtime installation guards.",
  payments: "All errors target ERPNext-side payment or accounting DocTypes while ERPNext is not part of this bench. Static file scanning cannot prove every optional integration path.",
  lending: "No errors, warnings, or notes for the selected app scope.",
  education: "No errors, warnings, or notes for the selected app scope.",
  helpdesk: "All errors target Customer in ERPNext integration code while ERPNext is not part of this bench. Static file scanning cannot prove every optional integration path.",
  crm: "Errors are concentrated in ERPNext and Frappe WhatsApp integration paths whose optional runtime guards are not fully modeled by the scanner.",
  insights: "No errors or warnings; both notes are historical patch references to the pre-v3 Insights Data Source DocType.",
  drive: "No errors or warnings; all notes come from patch files and are retained as historical review context.",
  gameplan: "No errors, warnings, or notes for the selected app scope.",
};

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const publicProjects = [];

for (const slug of projects) {
  const sourceDir = path.join(artifactsRoot, slug);
  const rawMetadataPath = path.join(sourceDir, "metadata.raw.json");
  const metadata = JSON.parse(fs.readFileSync(rawMetadataPath, "utf8"));
  if (metadata.project !== slug || metadata.cliVersion !== "1.2.8" || metadata.license !== "community") {
    throw new Error(`${slug}: unexpected raw metadata identity`);
  }
  if (!metadata.deterministic || metadata.runs.length !== 2) throw new Error(`${slug}: expected two deterministic runs`);

  const destinationDir = path.join(benchmarkDir, "reports", slug);
  fs.mkdirSync(destinationDir, { recursive: true });
  fs.copyFileSync(rawMetadataPath, path.join(destinationDir, "metadata.json"));

  const checksumLines = [];
  for (const run of metadata.runs) {
    const name = `report-run${run.run}.md`;
    const sourceReport = path.join(sourceDir, name);
    const actual = sha256(sourceReport);
    if (actual !== run.reportSha256) throw new Error(`${slug}: ${name} checksum differs from raw metadata`);
    fs.copyFileSync(sourceReport, path.join(destinationDir, name));
    checksumLines.push(`${actual}  ${name}`);
  }
  fs.writeFileSync(path.join(destinationDir, "checksums.sha256"), `${checksumLines.join("\n")}\n`);

  const target = sources[slug];
  publicProjects.push({
    project: slug,
    repository: target.repository,
    commit: target.commit,
    commitDate: target.commitDate,
    benchApps: metadata.benchApps.map((app) => ({ app, ...sources[app] })),
    indexedFiles: metadata.indexedFiles,
    command: `frappe-inspector scan <bench> --app ${slug} --format markdown --output <report>`,
    status: "completed",
    deterministic: metadata.deterministic,
    runs: metadata.runs,
    interpretation: interpretations[slug],
    artifacts: {
      run1: `reports/${slug}/report-run1.md`,
      run2: `reports/${slug}/report-run2.md`,
      metadata: `reports/${slug}/metadata.json`,
      checksums: `reports/${slug}/checksums.sha256`,
    },
  });
}

const run1 = publicProjects.map((project) => project.runs[0]);
const run2 = publicProjects.map((project) => project.runs[1]);
const sum = (items, key) => items.reduce((total, item) => total + item[key], 0);
const zeroErrorsWarnings = publicProjects.filter((project) => project.runs[0].errors === 0 && project.runs[0].warnings === 0);
const noFindings = zeroErrorsWarnings.filter((project) => project.runs[0].notes === 0);
const results = {
  schemaVersion: "2.0.0",
  benchmark: "Frappe Inspector Community complete-bench archive v2",
  benchmarkDate: "2026-07-31",
  methodology: "methodology.md",
  promotionBlockers: "promotion-blockers.md",
  release: {
    package: "@frappe-inspector/cli",
    version: "1.2.8",
    license: "community",
    registryMetadata: "npm-package.json",
    engineCommit: "6f776f560ae3f26eff043f3fd884842db1a5f520",
    mergeCommit: "b8f536aa17a35b17c4e7332f1c50f186e17a891b",
    publishedGitHead: "c80340cc29d4230fb2866226bd937f796b72edf4",
    installedBundleSha256: "a41a3c90405bbfa986e64ffa57e1b465945988afcfc88b605abf478dcedb1ae7",
  },
  promotionDecision: {
    status: "not-promoted",
    siteIndexing: "keep-noindex",
    rationale: [
      "Determinism proves repeatability, not finding precision.",
      "Fifty-two of fifty-five errors are concentrated in optional app integration paths whose runtime guards are not fully modeled by local static scanning.",
      "ERPNext retains three unresolved active references and one unresolved Link warning that require maintainer context.",
      "No current VS Code 1.2.8 capture or separate Pro evidence campaign exists.",
    ],
  },
  totals: {
    projects: publicProjects.length,
    runs: publicProjects.length * 2,
    completedRuns: publicProjects.flatMap((project) => project.runs).filter((run) => run.completed).length,
    exitZeroProjects: run1.filter((run) => run.exitCode === 0).length,
    exitOneProjects: run1.filter((run) => run.exitCode === 1).length,
    errors: sum(run1, "errors"),
    warnings: sum(run1, "warnings"),
    notes: sum(run1, "notes"),
    run1DurationMs: sum(run1, "durationMs"),
    run2DurationMs: sum(run2, "durationMs"),
    deterministicProjects: publicProjects.filter((project) => project.deterministic).length,
    zeroErrorWarningProjects: zeroErrorsWarnings.length,
    noFindingProjects: noFindings.length,
    notesOnlyProjects: zeroErrorsWarnings.length - noFindings.length,
  },
  sources,
  projects: publicProjects,
};

fs.writeFileSync(path.join(benchmarkDir, "results.json"), `${JSON.stringify(results, null, 2)}\n`);

const csvCell = (value) => `"${String(value).replaceAll('"', '""')}"`;
const csvRows = [[
  "project", "repository", "commit", "bench_apps", "indexed_files", "run1_exit", "run1_errors", "run1_warnings", "run1_notes",
  "run1_duration_ms", "run2_exit", "run2_errors", "run2_warnings", "run2_notes", "run2_duration_ms", "report_sha256", "deterministic", "status",
]];
for (const project of publicProjects) {
  csvRows.push([
    project.project, project.repository, project.commit, project.benchApps.map((app) => app.app).join("+"), project.indexedFiles,
    project.runs[0].exitCode, project.runs[0].errors, project.runs[0].warnings, project.runs[0].notes, project.runs[0].durationMs,
    project.runs[1].exitCode, project.runs[1].errors, project.runs[1].warnings, project.runs[1].notes, project.runs[1].durationMs,
    project.runs[0].reportSha256, project.deterministic, project.status,
  ]);
}
fs.writeFileSync(path.join(benchmarkDir, "results.csv"), `${csvRows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`);

console.log(`Imported ${publicProjects.length} projects, ${results.totals.runs} runs, ${results.totals.errors} errors, ${results.totals.warnings} warnings, and ${results.totals.notes} notes.`);
