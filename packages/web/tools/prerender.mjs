import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = resolve(import.meta.dirname, "..");
const htmlPath = resolve(projectRoot, "dist", "index.html");
const serverEntry = resolve(projectRoot, "dist-ssr", "entry-server.js");

const [{ render }, template] = await Promise.all([
  import(pathToFileURL(serverEntry).href),
  readFile(htmlPath, "utf8"),
]);
const appHtml = render();
const output = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

if (output === template) throw new Error("Elemento #root não encontrado no HTML de produção.");

await writeFile(htmlPath, output, "utf8");
console.log("Página inicial pré-renderizada em dist/index.html.");
