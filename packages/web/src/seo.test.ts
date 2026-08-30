import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { FLAVORS } from "./web/lib/brand";

const canonicalUrl = "https://tykayurt-web.vercel.app/";
const projectFile = (...segments: string[]) => resolve(process.cwd(), ...segments);

function structuredDataFrom(html: string) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    ([, json]) => JSON.parse(json),
  );
}

describe("SEO assets", () => {
  it("publishes canonical metadata and structured data", async () => {
    const html = await readFile(projectFile("index.html"), "utf8");

    expect(html).toContain(`<link rel="canonical" href="${canonicalUrl}" />`);
    expect(html).toContain('<meta name="robots" content="index, follow, max-image-preview:large" />');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@type": "Organization"');
  });

  it("publishes robots, sitemap and llms files", async () => {
    const [robots, sitemap, llms] = await Promise.all([
      readFile(projectFile("public", "robots.txt"), "utf8"),
      readFile(projectFile("public", "sitemap.xml"), "utf8"),
      readFile(projectFile("public", "llms.txt"), "utf8"),
    ]);

    expect(robots).toContain(`Sitemap: ${canonicalUrl}sitemap.xml`);
    expect(sitemap).toContain(`<loc>${canonicalUrl}</loc>`);
    expect(sitemap).toContain(`<loc>${canonicalUrl}regulamento</loc>`);
    expect(llms).toContain("# TykaYurt");
    expect(llms).toContain("iogurte artesanal em Curitiba");
  });

  it("publishes valid offers for every currently available flavor", async () => {
    const html = await readFile(projectFile("index.html"), "utf8");
    const itemList = structuredDataFrom(html).find((item) => item["@type"] === "ItemList");
    const products = itemList?.itemListElement.map(
      (entry: { item: Record<string, unknown> }) => entry.item,
    );

    expect(itemList?.numberOfItems).toBe(3);
    expect(products).toHaveLength(3);

    for (const flavor of ["Morango", "Amora", "Abacaxi"]) {
      const product = products?.find((item: { name: string }) => item.name.includes(flavor));
      const visibleFlavor = FLAVORS.find((item) => item.name === flavor);

      expect(product).toMatchObject({
        "@type": "Product",
        brand: { "@type": "Organization", name: "TykaYurt" },
        offers: {
          "@type": "Offer",
          price: "20.00",
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
      });
      expect(product?.description).toBe(visibleFlavor?.description);
      expect(product?.image).toBe(`${canonicalUrl}${visibleFlavor?.image.slice(1)}`);
    }

    expect(JSON.stringify(itemList)).not.toMatch(/Ameixa|Pêssego|250 ml|12\.00/);
  });
});
