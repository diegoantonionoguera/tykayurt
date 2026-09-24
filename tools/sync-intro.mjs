import { copyFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

// The main site owns these assets; each app stays independently deployable.
const root = fileURLToPath(new URL("../", import.meta.url));
const source = path.join(root, "packages/web/public/intro");
const targets = [
  path.resolve(root, "../tykayurt-link-da-bio/intro"),
  path.resolve(root, "../TykaYurt Sabores/flavors-showcase/public/intro"),
];
const files = ["intro.js", "intro.css", "logo.webp", "logo-reveal.mp4"];
const checkOnly = process.argv.includes("--check");
let differences = 0;
for (const target of targets) {
  for (const file of files) {
    const from = path.join(source, file);
    const to = path.join(target, file);
    const expected = await readFile(from);
    const actual = await readFile(to).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (actual?.equals(expected)) continue;
    differences++;
    if (checkOnly) console.error(`Out of sync: ${to}`);
    else {
      await copyFile(from, to);
      console.log(`Synced: ${to}`);
    }
  }
}
if (checkOnly && differences) process.exitCode = 1;
else console.log(checkOnly ? "All intro copies match." : "Intro synchronization complete.");
