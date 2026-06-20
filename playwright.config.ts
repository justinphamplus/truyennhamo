import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  webServer: {
    command: "npm run start -- -p 3110 -H 127.0.0.1",
    url: "http://127.0.0.1:3110",
    reuseExistingServer: false,
    timeout: 60_000,
  },
  use: {
    baseURL: "http://127.0.0.1:3110",
    browserName: "chromium",
    channel: "chrome",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  reporter: "line",
});
