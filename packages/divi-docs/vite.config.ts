/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @type {import('vite').UserConfig} */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));
const reportingPath = `./.temp/tests`;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(
    `${env.USERNAME} is starting RDG APP v${env.npm_package_version} Server in ${env.NODE_ENV} environment`
  );

  return {
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    define: {
      "process.env": {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        AZ_CLIENT_ID: JSON.stringify(env.AZ_CLIENT_ID),
        AZ_TENANT_ID: JSON.stringify(env.AZ_TENANT_ID),
      },
    },
    server: {
      host: true,
      port: 5174,
      open: true,
      proxy: {
        "/api": {
          target:
            env.NODE_ENV === "development" || env.NODE_ENV === "test"
              ? "http://localhost:5128/"
              : "https://app-gva-l9ssf-d05.azurewebsites.us",
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: true,
      port: 8080,
    },
    build: {
      target: "es6",
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          globals: true,
          environment: "jsdom",
          include: ["./src/**/*.test.*"],
          exclude: ["./src/**/*.snap"],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          expandSnapshotDiff: true,
          exclude: ["./src/**/*.snap"],
        },
      },
    ],
    test: {
      setupFiles: ["./.storybook/vitest.setup.ts"],
      snapshotFormat: {
        printBasicPrototype: true,
      },
      reporters: ["default", "json"],
      outputFile: {
        json: `${reportingPath}/unit-test-results.json`,
      },
      projects: [
        {
          extends: true,
          test: {
            name: "unit",
            globals: true,
            environment: "jsdom",
            include: ["./src/**/*.test.*"],
            exclude: ["./src/**/*.snap"],
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({ configDir: path.join(dirname, ".storybook") }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: "playwright",
              instances: [
                {
                  browser: "chromium",
                },
              ],
            },
            expandSnapshotDiff: true,
            exclude: ["./src/**/*.snap"],
          },
        },
      ],
    },
  };
});
