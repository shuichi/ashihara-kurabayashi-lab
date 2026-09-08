import { defineConfig, devices } from "@playwright/test";
import { base } from "./config/site.mjs";
const url = `http://127.0.0.1:4322${base === "/" ? "/" : base + "/"}`;
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 3,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: url, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit-mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "webkit" } },
  ],
  webServer: {
    command: "node scripts/serve-static.mjs",
    url,
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});
