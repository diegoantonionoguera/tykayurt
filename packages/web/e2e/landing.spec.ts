import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("TykaYurt landing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows only products currently for sale", async ({ page }) => {
    const flavors = page.locator("#sabores");
    await expect(flavors.getByRole("button", { name: "Morango", exact: true })).toBeVisible();
    await expect(flavors.getByRole("button", { name: "Amora", exact: true })).toBeVisible();
    await expect(flavors.getByRole("button", { name: "Abacaxi", exact: true })).toBeVisible();
    await expect(page.getByText(/Ameixa|Pêssego|250 ml|R\$ 12/i)).toHaveCount(0);
    await expect(page.getByText("500 ml", { exact: true }).first()).toBeVisible();
  });

  test("updates the selected flavor and creates the correct WhatsApp order", async ({ page }) => {
    const flavors = page.locator("#sabores");
    await flavors.getByRole("button", { name: "Amora", exact: true }).click();
    await expect(flavors.getByRole("button", { name: "Amora", exact: true })).toHaveAttribute("aria-pressed", "true");

    const link = page.getByRole("link", { name: "Pedir Amora 500 ml" });
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(new URL(href!).searchParams.get("text")).toContain("Amora de 500 ml (R$ 20)");
  });

  test("keeps the explanation before the order action", async ({ page }) => {
    const order = page.getByRole("link", { name: "Pedir Morango 500 ml" });
    const explanation = page.getByText("Abre o WhatsApp com o pedido já escrito. É só enviar.");
    await expect(explanation).toBeVisible();
    await expect(order).toBeVisible();
    expect(await explanation.evaluate((node, button) => Boolean(node.compareDocumentPosition(button as Node) & Node.DOCUMENT_POSITION_FOLLOWING), await order.elementHandle())).toBe(true);
  });

  test("has no horizontal overflow in the active viewport", async ({ page }) => {
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  });

  test("adapts to light and dark device preferences", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(248, 246, 243)");

    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(33, 35, 37)");
  });

  test("opens the gallery dialog and closes it with Escape", async ({ page }) => {
    await page.getByRole("button", { name: /Ampliar:/ }).first().click();
    const dialog = page.getByRole("dialog", { name: "Imagem ampliada da galeria TykaYurt" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("has no serious accessibility violations in the main content", async ({ page }) => {
    await page.waitForTimeout(2_000);
    const results = await new AxeBuilder({ page })
      .include("#conteudo")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
  });
});
