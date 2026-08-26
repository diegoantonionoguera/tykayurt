import { gzipSync } from "node:zlib";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");
const limits = {
  javascriptGzip: 150 * 1024,
  cssGzip: 10 * 1024,
  image: 400 * 1024,
};

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const target = path.join(directory, entry.name);
        return entry.isDirectory() ? walk(target) : target;
      }),
    )
  ).flat();
}

const files = await walk(dist);
const failures = [];

for (const file of files) {
  const relative = path.relative(dist, file);
  const extension = path.extname(file).toLowerCase();

  if (extension === ".js" || extension === ".css") {
    const gzipBytes = gzipSync(await readFile(file)).byteLength;
    const limit = extension === ".js" ? limits.javascriptGzip : limits.cssGzip;
    console.log(`${relative}: ${(gzipBytes / 1024).toFixed(1)} KiB gzip`);
    if (gzipBytes > limit) failures.push(`${relative} exceeds ${(limit / 1024).toFixed(0)} KiB gzip`);
  }

  if ([".png", ".webp", ".avif", ".jpg", ".jpeg"].includes(extension)) {
    const bytes = (await stat(file)).size;
    if (relative !== "og-image.png" && bytes > limits.image) {
      failures.push(`${relative} exceeds 400 KiB`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Performance budgets passed.");
