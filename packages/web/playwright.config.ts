import { defineConfig, devices } from "@playwright/test";

const localEdge = process.env.CI ? undefined : "msedge";
const production = process.env.PLAYWRIGHT_PRODUCTION === "1";
const baseURL = production ? "http://127.0.0.1:4210" : "http://127.0.0.1:4200";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: localEdge },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["iPhone 13"], browserName: "chromium", channel: localEdge },
    },
    ...(process.env.CI
      ? [
          { name: "firefox", use: { ...devices["Desktop Firefox"] } },
          { name: "webkit", use: { ...devices["Desktop Safari"] } },
        ]
      : []),
  ],
  webServer: {
    command: production ? "bun src/__server.ts" : process.env.CI
      ? "bun run dev -- --host 127.0.0.1"
      : "npm run dev -- --host 127.0.0.1",
    url: `${baseURL}/api/health`,
    env: production ? { PORT: "4210" } : undefined,
    reuseExistingServer: !production && !process.env.CI,
    timeout: 120_000,
  },
});
