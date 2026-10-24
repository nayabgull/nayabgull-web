import { defineConfig, devices } from "@playwright/test";

const externalBaseUrl = process.env.BASE_URL;
const baseURL = externalBaseUrl ?? "http://localhost:3000";

export default defineConfig({
  testDir: "tests",
  testMatch: ["e2e/**/*.spec.ts", "responsive/**/*.spec.ts", "a11y/**/*.spec.ts"],
  snapshotPathTemplate: "{testDir}/{testFileDir}/__snapshots__/{projectName}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.001, animations: "disabled" },
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  // When BASE_URL points at an already running server (pnpm verify, CI, a preview URL), use it as is.
  webServer: externalBaseUrl
    ? undefined
    : { command: "pnpm start", url: baseURL, reuseExistingServer: true, timeout: 120_000 },
});
