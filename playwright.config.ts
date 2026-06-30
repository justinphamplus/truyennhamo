import { defineConfig } from "@playwright/test";

const localChromeChannel = process.env.CI ? {} : { channel: "chrome" as const };

export default defineConfig({
  testDir: "./tests",
  outputDir: ".tmp/playwright-results",
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  webServer: {
    command: "npm run start -- -p 3110 -H 127.0.0.1",
    env: {
      ADMIN_EMAILS: "admin-shell@example.com",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
      SUPABASE_SECRET_KEY:
        process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    },
    url: "http://127.0.0.1:3110",
    reuseExistingServer: false,
    timeout: 60_000,
  },
  use: {
    baseURL: "http://127.0.0.1:3110",
    browserName: "chromium",
    ...localChromeChannel,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  reporter: "line",
});
