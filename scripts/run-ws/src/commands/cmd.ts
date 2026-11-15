/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { parseArgs } from "node:util";

import {
  getWorkspacePackages,
  getWorkspacePackageWeb,
  findCircularWorkspaceDependencies,
} from "./../utilities/index.js";
import { globalArgs } from "./index.js";
import type { GlobalOptionValues } from "./index.js";

export const runWorkspaceCommand = (
  args: string[],
  globalValues: GlobalOptionValues = {}
) => {
  const { values: commandValues, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      ...globalArgs,
      env: { type: "string", short: "e", default: "DEV" },
      force: { type: "boolean", short: "f" },
    },
  });
  const values = { ...commandValues, ...globalValues };

  if (values.help) {
    console.log("Usage: run-ws cmd [script...] --env <env> [--force]");
    return;
  }

  const _ws = getWorkspacePackages();

  if (_ws === null) return;

  const packageWeb = getWorkspacePackageWeb(_ws);
  const circularDependencies = findCircularWorkspaceDependencies(packageWeb);

  if (circularDependencies.length > 0) {
    console.warn(
      "Circular workspace dependencies detected:",
      circularDependencies.map((cycle) => cycle.join(" -> "))
    );

    process.exit(1);
  }

  const runCommand = positionals[0];
  const hasCommand = Object.values(_ws)
    .filter((workspacePackage) =>
      Boolean(runCommand && workspacePackage.scripts?.[runCommand])
    )
    .map((workspacePackage) => workspacePackage.name)
    .filter((name): name is string => Boolean(name));

  (values.verbose || values.debug) && console.log("packageWeb: ", packageWeb);
  (values.verbose || values.debug) && console.log("hasCommand: ", hasCommand);

  console.log(`Running ${positionals.join(", ")} as ${values.env}`);
};
