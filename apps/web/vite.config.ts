/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @type {import('vite').UserConfig} */
/** <reference types="vitest" /> */

import { loadEnv, searchForWorkspaceRoot } from "vite";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(
    `${env.USERNAME} is starting RDG APP v${env.npm_package_version} Server in ${env.NODE_ENV} environment`
  );
  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5174,
      open: true,
      proxy: {
        "/api":
          env.NODE_ENV === "development"
            ? "http://localhost:8000"
            : "http://localhost:8000",
      },
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["node_modules", "dist", "tests/**"],
      include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    },
  };
});
