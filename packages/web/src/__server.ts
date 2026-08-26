import app from "./api";
import { withSecurityHeaders } from "./security";
import { resolveStaticFilePath } from "./static-files";

const port = Number(process.env.PORT ?? 3000);
const distDir = `${import.meta.dirname}/../dist`;
const indexPath = `${distDir}/index.html`;

const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api")) {
      return withSecurityHeaders(await app.fetch(request), request.url);
    }

    const filePath = resolveStaticFilePath(distDir, url.pathname);
    if (!filePath) {
      return withSecurityHeaders(
        new Response("Not found", {
          status: 404,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
        request.url,
      );
    }
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return withSecurityHeaders(new Response(file), request.url);
    }

    const index = Bun.file(indexPath);
    if (await index.exists()) {
      return withSecurityHeaders(
        new Response(index, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }),
        request.url,
      );
    }

    return withSecurityHeaders(
      new Response("Build output not found. Run `bun run build` first.", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
      request.url,
    );
  },
});

console.log(`Web server listening on http://localhost:${server.port}`);
