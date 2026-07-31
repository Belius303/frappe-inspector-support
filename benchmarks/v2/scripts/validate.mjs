import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const benchmarkDir = path.resolve(scriptDir, "..");
const results = JSON.parse(fs.readFileSync(path.join(benchmarkDir, "results.json"), "utf8"));
const schema = JSON.parse(fs.readFileSync(path.join(benchmarkDir, "schema.json"), "utf8"));
const npmPackage = JSON.parse(fs.readFileSync(path.join(benchmarkDir, "npm-package.json"), "utf8"));
const failures = [];
const fail = (message) => failures.push(message);
const expectedProjects = ["erpnext", "hrms", "payments", "lending", "education", "helpdesk", "crm", "insights", "drive", "gameplan"];
const expectedTotals = {
  projects: 10,
  runs: 20,
  completedRuns: 20,
  exitZeroProjects: 5,
  exitOneProjects: 5,
  errors: 55,
  warnings: 4,
  notes: 79,
  run1DurationMs: 432909,
  run2DurationMs: 338069,
  deterministicProjects: 10,
  zeroErrorWarningProjects: 5,
  noFindingProjects: 3,
  notesOnlyProjects: 2,
};

if (schema.properties?.schemaVersion?.const !== "2.0.0") fail("schema.json does not describe schemaVersion 2.0.0");
if (results.schemaVersion !== "2.0.0") fail(`Unexpected schemaVersion ${results.schemaVersion}`);
if (results.release?.package !== "@frappe-inspector/cli" || results.release?.version !== "1.2.8" || results.release?.license !== "community") fail("Expected npm CLI 1.2.8 Community");
if (results.promotionDecision?.status !== "not-promoted" || results.promotionDecision?.siteIndexing !== "keep-noindex") fail("Promotion decision must remain not-promoted and keep-noindex");
if (npmPackage.name !== results.release.package || npmPackage.version !== results.release.version || npmPackage.publishedGitHead !== results.release.publishedGitHead) fail("npm package identity differs from results release metadata");
if (npmPackage.integritySha512 !== "sha512-rM+uwexBnmihJggbpjwGNV9a23TWjaT9I8g359NV7TjS/G3pEenrZyE/W3+zc2MZcHYK5HM8JnjjBdcpk4yLsA==") fail("Unexpected npm 1.2.8 registry integrity");

for (const [key, value] of Object.entries(expectedTotals)) {
  if (results.totals?.[key] !== value) fail(`totals.${key}: expected ${value}, got ${results.totals?.[key]}`);
}

if (results.projects?.length !== 10) fail("Expected exactly 10 projects");
const actualProjects = results.projects?.map((project) => project.project) ?? [];
if (new Set(actualProjects).size !== 10 || expectedProjects.some((project) => !actualProjects.includes(project))) fail("Project set is incomplete or duplicated");

const computed = { errors: 0, warnings: 0, notes: 0, run1DurationMs: 0, run2DurationMs: 0 };
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
for (const project of results.projects ?? []) {
  if (project.status !== "completed" || !project.deterministic || project.runs?.length !== 2) fail(`${project.project}: expected two deterministic completed runs`);
  if (!project.command.includes(`--app ${project.project}`)) fail(`${project.project}: command does not use its --app scope`);
  if (!/^[0-9a-f]{40}$/.test(project.commit)) fail(`${project.project}: invalid target commit`);
  if (project.benchApps?.some((app) => !/^[0-9a-f]{40}$/.test(app.commit))) fail(`${project.project}: invalid dependency commit`);

  const reportPaths = [project.artifacts.run1, project.artifacts.run2].map((relative) => path.join(benchmarkDir, relative));
  const metadataPath = path.join(benchmarkDir, project.artifacts.metadata);
  const checksumsPath = path.join(benchmarkDir, project.artifacts.checksums);
  for (const artifact of [...reportPaths, metadataPath, checksumsPath]) if (!fs.existsSync(artifact)) fail(`${project.project}: missing ${path.relative(benchmarkDir, artifact)}`);
  if (reportPaths.some((report) => !fs.existsSync(report)) || !fs.existsSync(metadataPath) || !fs.existsSync(checksumsPath)) continue;

  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  if (metadata.project !== project.project || metadata.cliVersion !== "1.2.8" || metadata.license !== "community") fail(`${project.project}: raw metadata identity mismatch`);
  if (!metadata.deterministic || metadata.runs?.length !== 2) fail(`${project.project}: raw metadata determinism mismatch`);
  const declaredChecksums = new Map(fs.readFileSync(checksumsPath, "utf8").trim().split(/\r?\n/).map((line) => {
    const match = /^([0-9a-f]{64})\s{2}(.+)$/.exec(line);
    return match ? [match[2], match[1]] : [line, "invalid"];
  }));

  for (let index = 0; index < 2; index += 1) {
    const run = project.runs[index];
    const rawRun = metadata.runs[index];
    const reportName = `report-run${index + 1}.md`;
    const actual = sha256(reportPaths[index]);
    if (!run.completed || !run.stderrEmpty || ![0, 1].includes(run.exitCode)) fail(`${project.project}: run ${index + 1} did not complete cleanly`);
    if (actual !== run.reportSha256 || actual !== rawRun.reportSha256 || actual !== declaredChecksums.get(reportName)) fail(`${project.project}: ${reportName} checksum mismatch`);
    for (const key of ["durationMs", "exitCode", "completed", "errors", "warnings", "notes", "stderrEmpty"]) if (run[key] !== rawRun[key]) fail(`${project.project}: run ${index + 1} ${key} differs from raw metadata`);
  }
  if (project.runs[0].reportSha256 !== project.runs[1].reportSha256) fail(`${project.project}: reports are not deterministic`);
  if (project.runs[0].errors !== project.runs[1].errors || project.runs[0].warnings !== project.runs[1].warnings || project.runs[0].notes !== project.runs[1].notes) fail(`${project.project}: counts differ across runs`);
  computed.errors += project.runs[0].errors;
  computed.warnings += project.runs[0].warnings;
  computed.notes += project.runs[0].notes;
  computed.run1DurationMs += project.runs[0].durationMs;
  computed.run2DurationMs += project.runs[1].durationMs;
}

for (const [key, value] of Object.entries(computed)) if (results.totals?.[key] !== value) fail(`Computed ${key} ${value} differs from totals`);
for (const [name, source] of Object.entries(results.sources ?? {})) if (!/^[0-9a-f]{40}$/.test(source.commit) || !source.repository.startsWith("https://github.com/")) fail(`sources.${name} is not pinned to a public commit`);

const csvLines = fs.readFileSync(path.join(benchmarkDir, "results.csv"), "utf8").trim().split(/\r?\n/);
if (csvLines.length !== 11) fail(`results.csv: expected header plus 10 rows, got ${csvLines.length}`);

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full);
  }
};
walk(benchmarkDir);

for (const file of files) {
  const relative = path.relative(benchmarkDir, file).replaceAll("\\", "/");
  if (/(?:optional-local|scoped-local|stderr-run)/i.test(relative)) fail(`Forbidden intermediate artifact: ${relative}`);
  if (/\.(?:png|jpe?g|webp)$/i.test(relative)) fail(`v2 must not contain screenshots: ${relative}`);
}

const publicTextFiles = files.filter((file) => !file.startsWith(`${scriptDir}${path.sep}`) && /\.(?:md|json|csv|sha256)$/i.test(file));
const forbidden = [/(?:^|["'\s(])[A-Za-z]:[\\/]/m, /\/Users\//i, /\/home\//i, /OneDrive/i, /TEMP[\\/]+Temp/i, /(?:api[_ -]?key|password|private[_ -]?key)\s*[:=]/i];
for (const file of publicTextFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of forbidden) if (pattern.test(content)) fail(`${path.relative(benchmarkDir, file)} contains a local path or secret-like marker`);
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Validated npm CLI 1.2.8, 10 projects, 20 completed runs, exact commits, report checksums, determinism, totals, no screenshots, and privacy constraints.");
