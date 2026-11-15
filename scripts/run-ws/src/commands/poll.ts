/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { parseArgs } from "node:util";

import { globalArgs } from "./index.js";
import type { GlobalOptionValues } from "./index.js";

export const runPoll = (
  args: string[],
  globalValues: GlobalOptionValues = {}
) => {
  const { values: commandValues } = parseArgs({
    args,
    options: {
      ...globalArgs,
      add: { type: "string", short: "a" },
    },
  });
  const values = { ...commandValues, ...globalValues };

  if (values.help) {
    console.log("Usage: run-ws poll [--add]");
    return;
  }

  // Fully typed: values.minify (boolean | undefined)
  console.log(`Building (minify: ${Boolean(values.add)})`);
};
