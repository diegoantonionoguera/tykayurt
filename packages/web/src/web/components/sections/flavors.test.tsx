import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Flavors } from "./flavors";

describe("Flavors", () => {
  it("renders only current flavors and the 500 ml product", () => {
    render(<Flavors />);

    expect(screen.getByRole("button", { name: "Morango" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Amora" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Abacaxi" })).toBeVisible();
    expect(screen.queryByText(/Ameixa|Pêssego/i)).not.toBeInTheDocument();
    expect(screen.getByText("500 ml")).toBeVisible();
    expect(screen.queryByText(/250 ml|R\$ 12/i)).not.toBeInTheDocument();
  });

  it("updates the content and WhatsApp message when a flavor is selected", async () => {
    const user = userEvent.setup();
    render(<Flavors />);

    await user.click(screen.getByRole("button", { name: "Amora" }));

    expect(screen.getByRole("button", { name: "Amora" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Amora" })).toBeVisible();

    const orderLink = screen.getByRole("link", { name: "Pedir Amora 500 ml" });
    const destination = new URL(orderLink.getAttribute("href")!);
    expect(destination.searchParams.get("text")).toContain("Amora de 500 ml (R$ 20)");
  });

  it("places the explanatory text before the order button", () => {
    render(<Flavors />);

    const explanation = screen.getByText("Abre o WhatsApp com o pedido já escrito. É só enviar.");
    const orderLink = screen.getByRole("link", { name: "Pedir Morango 500 ml" });

    expect(
      explanation.compareDocumentPosition(orderLink) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("uses the approved small-batch copy", () => {
    render(<Flavors />);

    expect(
      screen.getByText(/Feito em lote pequeno, com atenção em cada pote\./i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/uma panela (por|de cada) vez/i)).not.toBeInTheDocument();
  });
});
