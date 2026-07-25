/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import path from "node:path";
import fs from "node:fs";

import { type StorybookConfig } from "@storybook/react-vite";

const _root = path.join(`./`);
const sBlob = `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`;
const _stories = [];

try {
  let _package = JSON.parse(
    fs.readFileSync(path.resolve(_root, "package.json"), "utf8"),
  );

  for (const i in _package.workspaces) {
    const w = _package.workspaces[i];
    const _sp = path.resolve(path.join(_root, w, sBlob));
    _stories.push(`${_sp.replaceAll("\\", "/")}`);
  }
} catch (error) {
  console.log(`Blob Error: `, error);
}

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  stories: _stories,
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true,
  },
  docs: {
    defaultName: "Documentation",
  },
};

export default config;
