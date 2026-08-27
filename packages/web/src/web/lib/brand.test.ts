import { describe, expect, it } from "vitest";
import { FLAVORS, PRODUCT, WHATSAPP_NUMBER, whatsappLink } from "./brand";

describe("brand data", () => {
  it("exposes only the flavors currently for sale", () => {
    expect(FLAVORS.map((flavor) => flavor.name)).toEqual(["Morango", "Amora", "Abacaxi"]);
    expect(JSON.stringify(FLAVORS)).not.toMatch(/Ameixa|Pêssego/i);
  });

  it("uses the approved Morango description", () => {
    const morango = FLAVORS.find((flavor) => flavor.id === "morango");

    expect(morango?.description).toBe(
      "Morango de verdade, sentido em cada colherada. A geleia é feita com fruta de verdade, não com xarope — por isso o sabor é limpo, fresco, sem aquele doce artificial que a gente já cansou de comer.",
    );
  });

  it("keeps the single product size and price", () => {
    expect(PRODUCT).toEqual({ size: "500 ml", price: "R$ 20", note: "tamanho família" });
    expect(JSON.stringify(PRODUCT)).not.toMatch(/250|R\$ 12/);
  });

  it("creates an encoded WhatsApp link without changing the message", () => {
    const message = "Oi! Quero um TykaYurt de Amora de 500 ml (R$ 20).";
    const link = new URL(whatsappLink(message));

    expect(link.origin).toBe("https://wa.me");
    expect(link.pathname).toBe(`/${WHATSAPP_NUMBER}`);
    expect(link.searchParams.get("text")).toBe(message);
  });
});
