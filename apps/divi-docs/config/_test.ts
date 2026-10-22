/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { join, resolve } from "node:path";
import { readFileSync, globSync } from "node:fs";
import { cwd } from "node:process";

const getStories = () => {
  const _root = join(process.env.INIT_CWD ?? cwd());
  const sBlob = `src/**/*.{mdx,stories.@(js|jsx|mjs|cjs|ts|tsx)}`;
  const _stories = [];

  try {
    let _package = JSON.parse(readFileSync(resolve(_root, "package.json"), "utf8"));

    for (const i in _package.workspaces) {
      const w = _package.workspaces[i];
      const _sp = resolve(join(_root, w, sBlob));
      _sp && _stories.push(`${_sp.replaceAll("\\", "/")}`);

    }
  } catch (error) {
    console.log(`Blob Error: `, error);
  }

  const _g = globSync(_stories)
  console.log(_g)

  return globSync(_g);
};

getStories()