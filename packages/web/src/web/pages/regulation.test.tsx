import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Regulation from "./regulation";

describe("Regulation", () => {
  it("renders the complete public regulation and participation CTA", () => {
    const html = renderToStaticMarkup(<Regulation />);

    expect(html).toContain("Regulamento — Programa &quot;Compartilhou, Ganhou&quot; TykaYurt");
    expect(html).toContain("Última atualização: 29/08/2026");
    expect(html).toContain("1. O que é o programa");
    expect(html).toContain("6. Regras para evitar fraude — leitura obrigatória");
    expect(html).toContain("9. Aceite das regras");
    expect(html).toContain("Quero meu código");
    expect(html).toContain("Oi!%20Quero%20participar%20do%20Compartilhou%2C%20Ganhou");
  });
});
