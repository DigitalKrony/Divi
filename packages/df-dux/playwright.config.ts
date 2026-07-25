/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run start:docs -- --no-open",
    url: "http://localhost:6006",
    reuseExistingServer: true,
  },
  outputDir: "./.temp/tests/images",
  reporter: [
    ["list"],
    ["json", { outputFile: "./.temp/tests/visual-test-results.json" }],
  ],
  projects: [
    {
      name: "visual",
      testDir: "./src",
      testMatch: "tests/*.spec*",
      // TODO: secure a cloud location for testing screenshots
      snapshotPathTemplate:
        "{testDir}/{testFileDir}/__screenshots__/{arg}-{projectName}{ext}",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:6006",
      },
    },
  ],
});
