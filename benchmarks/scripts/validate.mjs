import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const benchmarkDir = path.resolve(scriptDir, "..");
const repoDir = path.resolve(benchmarkDir, "..");
const results = JSON.parse(fs.readFileSync(path.join(benchmarkDir, "results.json"), "utf8"));
const schema = JSON.parse(fs.readFileSync(path.join(benchmarkDir, "schema.json"), "utf8"));
const failures = [];
const fail = (message) => failures.push(message);
const expectedTotals = { projects: 10, success: 10, failure: 0, errors: 2374, warnings: 1044, rawFindings: 3418, reviewed: 30, likelyActionable: 2, needsMaintainerContext: 9, falsePositive: 19, deterministic: 10 };

const ajv = new Ajv2020({ allErrors: true, strict: false, validateFormats: false });
const validateSchema = ajv.compile(schema);
if (!validateSchema(results)) for (const error of validateSchema.errors ?? []) fail(`schema ${error.instancePath || "/"}: ${error.message}`);

for (const [key, value] of Object.entries(expectedTotals)) if (results.totals[key] !== value) fail(`totals.${key}: expected ${value}, got ${results.totals[key]}`);
if (results.projects.length !== 10) fail("Expected exactly 10 projects");

for (const project of results.projects) {
  if (project.reviewed.total !== 3 || project.reviewed.findings.length !== 3) fail(`${project.slug}: expected exactly 3 reviewed findings`);
  if (project.scan.rawFindings !== project.scan.errors + project.scan.warnings) fail(`${project.slug}: raw finding count mismatch`);
  if (!project.deterministic || project.status !== "success") fail(`${project.slug}: expected deterministic success`);
  if (project.cli.version !== "1.2.3" || project.cli.license !== "community") fail(`${project.slug}: expected CLI 1.2.3 Community`);
  const reportPath = path.join(benchmarkDir, project.artifacts.report);
  const checksumPath = path.join(benchmarkDir, project.artifacts.checksum);
  const metadataPath = path.join(benchmarkDir, project.artifacts.metadata);
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  const actual = crypto.createHash("sha256").update(fs.readFileSync(reportPath)).digest("hex");
  const declared = fs.readFileSync(checksumPath, "utf8").trim().split(/\s+/)[0];
  if (actual !== declared || actual !== project.scan.reportSha256) fail(`${project.slug}: report checksum mismatch`);
  if (metadata.project !== project.slug || metadata.repository !== project.repository || metadata.branch !== project.branch || metadata.commit !== project.commit || metadata.commitDate !== project.commitDate || metadata.benchmarkDate !== project.benchmarkDate) fail(`${project.slug}: result identity does not match raw metadata`);
  if (metadata.cliVersion !== project.cli.version || metadata.license !== project.cli.license || metadata.nodeVersion !== project.environment.nodeVersion || metadata.npmVersion !== project.environment.npmVersion || metadata.command !== project.command) fail(`${project.slug}: result environment does not match raw metadata`);
  if (metadata.runs[0].errors !== project.scan.errors || metadata.runs[0].warnings !== project.scan.warnings || metadata.runs[0].durationMs !== project.scan.durationMs || metadata.runs[0].exitCode !== project.scan.exitCode || metadata.runs[0].reportSha256 !== actual) fail(`${project.slug}: run-1 result does not match raw metadata`);
  if (!metadata.deterministic || metadata.runs.length !== 2 || metadata.runs[1].reportSha256 !== actual) fail(`${project.slug}: deterministic run metadata mismatch`);
  for (const artifact of Object.values(project.artifacts)) if (!fs.existsSync(path.join(benchmarkDir, artifact))) fail(`${project.slug}: missing ${artifact}`);
}

const textFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(md|json|csv|html|sha256|mjs)$/i.test(entry.name)) textFiles.push(full);
  }
};
walk(benchmarkDir);

const forbidden = [/[A-Z]:\\/i, /\/Users\//i, /\/home\//i, /OneDrive/i, /TEMP\\Temp/i, /(?:api[_ -]?key|password|secret|private[_ -]?key)\s*[:=]/i];
const publicTextFiles = textFiles.filter((file) => !file.startsWith(path.join(benchmarkDir, "scripts") + path.sep));
for (const file of publicTextFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of forbidden) if (pattern.test(content)) fail(`${path.relative(repoDir, file)} contains forbidden local-path or secret-like text: ${pattern}`);
  if (/\bvulnerabilit(?:y|ies)\b/i.test(content)) fail(`${path.relative(repoDir, file)} uses forbidden vulnerability terminology`);
}

const markdownFiles = textFiles.filter((file) => file.endsWith(".md"));
for (const file of markdownFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/!?(?:\[[^\]]*\])\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^(?:https?:|mailto:)/i.test(target)) continue;
    const resolved = path.resolve(path.dirname(file), decodeURIComponent(target));
    if (!fs.existsSync(resolved)) fail(`${path.relative(repoDir, file)} has broken link ${target}`);
  }
}

if (failures.length) {
  console.error(failures.map((message) => `- ${message}`).join("\n"));
  process.exit(1);
}

console.log(`Validated schema, ${results.projects.length} projects, ${results.totals.rawFindings} raw findings, ${results.totals.reviewed} reviewed findings, checksums, links, and privacy constraints.`);
