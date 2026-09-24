import { expect, test } from "@playwright/test";

test("production CSP permits analytics without inline script execution", async ({ page }) => {
  test.skip(process.env.PLAYWRIGHT_PRODUCTION !== "1", "Requires the production Bun server");
  // Stub vendors: verify our integration without sending test events to real accounts.
  await page.route("https://www.googletagmanager.com/**", route => route.fulfill({ contentType: "text/javascript", body: "" }));
  await page.route("https://connect.facebook.net/**", route => route.fulfill({ contentType: "text/javascript", body: "" }));
  await page.addInitScript(() => {
    (window as any).__cspViolations = [];
    document.addEventListener("securitypolicyviolation", event => {
      (window as any).__cspViolations.push(event.violatedDirective);
    });
  });
  const response = await page.goto("/");
  expect(response?.headers()["x-frame-options"]).toBe("DENY");
  expect(response?.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  const intro = page.getByRole("dialog", { name: "Abertura TykaYurt" });
  if (await intro.isVisible()) await page.getByRole("button", { name: "Pular abertura" }).click();
  await expect(intro).toBeHidden();
  await page.evaluate(() => document.addEventListener("click", event => event.preventDefault(), { capture: true }));
  await page.getByRole("link", { name: "Pedir Morango 500 ml" }).click();
  const result = await page.evaluate(() => ({
    events: (window as any).dataLayer.map((args: any) => Array.from(args)),
    pixel: (window as any).fbq.queue.map((args: any) => Array.from(args)),
    violations: (window as any).__cspViolations,
  }));
  expect(result.events.some((args: any[]) => args[1] === "click_whatsapp")).toBe(true);
  expect(result.pixel.some((args: any[]) => args[1] === "Lead")).toBe(true);
  expect(result.violations).toEqual([]);
});
