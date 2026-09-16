import { defineConfig, globalIgnores } from 'eslint/config';
import Linter from "eslint";
import notice from 'eslint-plugin-notice';
import tsParser from '@typescript-eslint/parser';

if (Linter.RuleContext && !Linter.RuleContext.prototype.getFilename) {
  Linter.RuleContext.prototype.getFilename = function () {
    return this.filename ?? this.sourceCode?.getFilename();
  };
}

export default defineConfig([
  globalIgnores(['_tpl/*']),
  {
    plugins: {
      notice,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {},
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',
    },},
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.jsonc", "**/*.ts", "**/*.jsx", "**/*.tsx", "**/*.scss"],
    rules: {
      'no-unused-vars': 'warn',
      'notice/notice': [
        'error',
        {
          template: `/*!\n * Copyright (C) Design:Funedikly. All rights reserved.\n */\n`,
        },
      ],
    },
  }, {
    files: ["**/*.html", "**/*.css"],
    rules: {
      'notice/notice': [
        'error',
        {
          template: `<!-- Copyright (C) Design:Funedikly. All rights reserved. -->\n\n`,
        }
      ]
    },
  },
]);
