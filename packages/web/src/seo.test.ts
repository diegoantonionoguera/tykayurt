import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const canonicalUrl = "https://tykayurt-web.vercel.app/";

describe("SEO assets", () => {
  it("publishes canonical metadata and structured data", async () => {
    const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

    expect(html).toContain(`<link rel="canonical" href="${canonicalUrl}" />`);
    expect(html).toContain('<meta name="robots" content="index, follow, max-image-preview:large" />');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@type": "Organization"');
  });

  it("publishes robots, sitemap and llms files", async () => {
    const [robots, sitemap, llms] = await Promise.all([
      readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
      readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
      readFile(new URL("../public/llms.txt", import.meta.url), "utf8"),
    ]);

    expect(robots).toContain(`Sitemap: ${canonicalUrl}sitemap.xml`);
    expect(sitemap).toContain(`<loc>${canonicalUrl}</loc>`);
    expect(llms).toContain("# TykaYurt");
    expect(llms).toContain("iogurte artesanal em Curitiba");
  });
});
