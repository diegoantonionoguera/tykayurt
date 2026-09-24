const { chromium, expect } = require(
  require.resolve("@playwright/test", { paths: [__dirname + "/../packages/web"] }),
);

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  try {
    for (const [name, url] of [
      ["site", "http://localhost:4200"],
      ["bio", "http://localhost:3000"],
      ["sabores", process.env.SABORES_URL || "http://localhost:4174"],
    ]) {
      if (process.env.TEST_PROJECT && process.env.TEST_PROJECT !== name) continue;
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.route(/googletagmanager|facebook\.net|facebook\.com\/tr/, (route) =>
        route.abort(),
      );
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(
        () => document.querySelector(".brand-intro video")?.currentTime > 0.2,
      );
      const video = page.locator(".brand-intro video");
      await expect(video).toHaveJSProperty("playbackRate", 2);
      await expect(video).toHaveJSProperty("loop", false);
      await expect(video).toHaveCSS("object-fit", "cover");
      await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 8000 });
      await page.reload({ waitUntil: "domcontentloaded" });
      await page.getByRole("button", { name: "Pular abertura" }).click();
      await expect(page.locator(".brand-intro")).toHaveCount(0);
      await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(page.locator(".brand-intro")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator(".brand-intro")).toHaveCount(0);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(page.locator(".brand-intro video")).toHaveCount(0);
      await expect(page.locator(".brand-intro")).toHaveCount(0);

      if (name === "site") {
        await page.getByRole("button", { name: "Abrir menu" }).click();
        await expect(page.locator("#mobile-nav")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.locator("#mobile-nav")).toBeHidden();
        const trigger = page.getByRole("button", { name: /Ampliar:/ }).first();
        await trigger.click();
        await expect(page.locator("#galeria dialog")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.locator("#galeria dialog")).toHaveCount(0);
        await expect(trigger).toBeFocused();
        await page.getByRole("button", { name: "Amora", exact: true }).click();
        await expect(page.locator(".flavor-details h3")).toHaveText("Amora");
        expect(await page.locator(".purchase-group .order-button").getAttribute("href")).toContain(
          "Amora",
        );
      }
      if (name === "sabores") {
        await page.locator("#notes-input").fill("Entregar depois das 18h");
        await page.locator('[data-action="increase"]').click();
        const tab = page.locator('.tab[data-flavor-id="amora"]');
        const identity = await tab.elementHandle();
        await tab.click();
        await expect(tab).toBeFocused();
        expect(await tab.evaluate((node, original) => node === original, identity)).toBe(true);
        await expect(page.locator("#quantity-input")).toHaveValue("2");
        await expect(page.locator("#notes-input")).toHaveValue("Entregar depois das 18h");
        await expect(page.locator("#product-name")).toHaveText("Amora");
        for (const id of ["morango", "amora", "abacaxi"]) {
          await page.locator(`.tab[data-flavor-id="${id}"]`).click();
          await expect
            .poll(() =>
              page
                .locator("#product-image")
                .evaluate((image) => image.complete && image.naturalWidth > 0),
            )
            .toBe(true);
        }
        await page.locator(".flavor-choice-button").click();
        await expect(page.locator(".flavor-choice-button")).toHaveAttribute(
          "aria-expanded",
          "true",
        );
        await page.keyboard.press("Escape");
        await expect(page.locator(".flavor-choice-button")).toHaveAttribute(
          "aria-expanded",
          "false",
        );
        await page.evaluate(() => {
          window.open = (url) => {
            window.__orderUrl = url;
            return null;
          };
        });
        await page.locator("#order-form").evaluate((form) => form.requestSubmit());
        const order = new URL(await page.evaluate(() => window.__orderUrl));
        expect(order.searchParams.get("text")).toContain("2 Abacaxi 500 ml por R$ 20");
        expect(order.searchParams.get("text")).toContain("Entregar depois das 18h");
      }
      if (name === "bio") {
        await page.evaluate(() => {
          window.__events = [];
          window.gtag = (...args) => window.__events.push(args);
          window.fbq = (...args) => window.__events.push(args);
          document.addEventListener("click", (event) => event.preventDefault());
        });
        await page.locator("#whatsapp-card .cta").click();
        const events = await page.evaluate(() => window.__events);
        expect(events.map((event) => event[1])).toEqual([
          "click_bio_card",
          "CliqueCardBio",
          "Lead",
        ]);
        expect(events[0][2].card_origem).toBe("whatsapp");
      }
      expect(errors).toEqual([]);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.route("**/logo-reveal.mp4", (route) => route.abort());
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(page.locator(".brand-intro")).toHaveCount(0, { timeout: 6000 });
      await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
      await page.close();
      console.log(`${name}: intro, interactions and error handling passed`);
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
