/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { join, resolve } from "node:path";
import { readFileSync, globSync } from "node:fs";
import { cwd } from "node:process";

import { type StorybookConfig } from "@storybook/react-vite";

const getStories = () => {
  const _root = join(process.env.INIT_CWD ?? cwd());
  const sBlob = `src/**/*.{mdx,stories.@(js|jsx|ts|tsx|mjs|cjs)}`;
  const _stories = [];

  try {
    let _package = JSON.parse(readFileSync(resolve(_root, "package.json"), "utf8"));

    for (const i in _package.workspaces) {
      _stories.push(`${resolve(join(_root, _package.workspaces[i], sBlob)).replaceAll("\\", "/")}`);
    }
  } catch (error) {
    console.log(`Blob Error: `, error);
  }

  return globSync(_stories);
};

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  addons: [
    "@chromatic-com/storybook",
    {
      name: "@storybook/addon-docs",
      options: { transcludeMarkdown: true },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  stories: getStories(),
  docs: {
    defaultName: "Documentation",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true,
    reactDocgenTypescriptOptions: {
      compilerOptions: {
          allowJs: false,
          skipLibCheck: true,
        },
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      include: ['**/*.tsx', resolve(__dirname, '../../../{apps,packages}/*/src/**/*.@(tsx|ts)')],
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    }
  },
  async viteFinal(config) {
    if (config.optimizeDeps) {
      config.optimizeDeps.entries = [
        ...(config.optimizeDeps.entries || []),
        "src/**/*.stories.@(js|jsx|ts|tsx)",
      ];
    }
    
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': resolve(__dirname, '../src'),
        },
      },
    };
  },

};

export default config;
