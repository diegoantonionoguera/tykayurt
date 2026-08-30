import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = resolve(import.meta.dirname, "..");
const htmlPath = resolve(projectRoot, "dist", "index.html");
const serverEntry = resolve(projectRoot, "dist-ssr", "entry-server.js");

const [{ render }, template] = await Promise.all([
  import(pathToFileURL(serverEntry).href),
  readFile(htmlPath, "utf8"),
]);

const routes = [
  { pathname: "/", outputPath: htmlPath },
  {
    pathname: "/regulamento",
    outputPath: resolve(projectRoot, "dist", "regulamento", "index.html"),
    title: "Regulamento — Compartilhou, Ganhou | TykaYurt",
    description:
      "Consulte o regulamento completo do programa de indicação Compartilhou, Ganhou da TykaYurt.",
  },
];

for (const route of routes) {
  const appHtml = render(route.pathname);
  let output = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  if (output === template) throw new Error("Elemento #root não encontrado no HTML de produção.");

  if (route.title && route.description) {
    output = output
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
        `<meta name="description" content="${route.description}" />`,
      )
      .replace(
        '<link rel="canonical" href="https://tykayurt-web.vercel.app/" />',
        '<link rel="canonical" href="https://tykayurt-web.vercel.app/regulamento" />',
      );
  }

  await mkdir(dirname(route.outputPath), { recursive: true });
  await writeFile(route.outputPath, output, "utf8");
}

console.log("Rotas / e /regulamento pré-renderizadas.");
