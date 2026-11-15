/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { fixupPluginRules } from '@eslint/compat';
import notice from 'eslint-plugin-notice';
import tsParser from '@typescript-eslint/parser';

const findCopyrightTemplate = () => {
  const workingDirectory = process.cwd();
  let directory = resolve(workingDirectory);

  while (true) {
    const templateFile = resolve(directory, '.common', 'config', 'eslint', 'copyright.js');
    if (existsSync(templateFile)) return templateFile;

    const parent = dirname(directory);
    if (parent === directory) break;
    directory = parent;
  }

  throw new Error(`Could not find the copyright template from ${workingDirectory}`);
};

export default [
  {
    ignores: ['_tpl/*'],
  },
  {
    plugins: {
      notice: fixupPluginRules(notice),
    },
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      globals: {},
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'notice/notice': [
        'error',
        {
          template: readFileSync(findCopyrightTemplate(), 'utf8'),
        },
      ],
      'no-unused-vars': 'warn',
    },
  },
];
