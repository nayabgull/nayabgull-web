import { defineConfig, devices } from "@playwright/test";

/**
 * Coming-soon mode tests (SITE_MODE=coming-soon). The main suites run against a "live" server, so
 * this config starts its own server from the same production build on another port. SITE_MODE is
 * read at request time, so no second build is needed. `pnpm build` must have run first.
 */
const PORT = Number(process.env.COMING_SOON_PORT ?? 3201);
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "tests/coming-soon",
  fullyParallel: true,
  forbidOnly: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: `pnpm start --port ${PORT}`,
    url: baseURL,
    env: { ...process.env, SITE_MODE: "coming-soon" },
    // Never reuse a server that may run in live mode: these tests would pass or fail for the wrong reason.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
