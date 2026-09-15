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
    files: ["**/*.js", "**/*.mjs", "**/*.cjs", "**/*.json", "**/*.ts", "**/*.jsx", "**/*.tsx"],
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
      'no-unused-vars': 'warn',
      'notice/notice': [
        'error',
        {
          // templateFile: './.common/config/eslint/eslint.config.mjs',
          template: `/*!\n * Copyright (C) Design:Funedikly. All rights reserved.\n */\n`,
        },
      ],
    },
  },
]);
