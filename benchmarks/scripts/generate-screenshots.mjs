import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const benchmarkDir = path.resolve(scriptDir, "..");
const results = JSON.parse(fs.readFileSync(path.join(benchmarkDir, "results.json"), "utf8"));
const pages = [{ slug: "overview", html: path.join(benchmarkDir, "rendered", "index.html") }, ...results.projects.map((project) => ({ slug: project.slug, html: path.join(benchmarkDir, "rendered", "projects", `${project.slug}.html`) }))];

for (const page of pages) {
  const png = path.join(benchmarkDir, "screenshots", `${page.slug}.png`);
  const webp = path.join(benchmarkDir, "screenshots", `${page.slug}.webp`);
  const result = spawnSync("npx", ["playwright", "screenshot", "--browser", "chromium", "--viewport-size", "1200,720", "--full-page", pathToFileURL(page.html).href, png], { encoding: "utf8", shell: true });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || `Playwright failed for ${page.slug}`);
  await sharp(png).webp({ quality: 88 }).toFile(webp);
  fs.unlinkSync(png);
}

console.log(`Rendered ${pages.length} browser screenshots as WebP.`);
