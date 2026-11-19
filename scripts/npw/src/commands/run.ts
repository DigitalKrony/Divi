/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { parseArgs } from "node:util";
import { spawn } from 'node:child_process';

import Glaze from '@df/glaze';

import {
  getWorkspacePackages,
  getWorkspacePackageWeb,
  findCircularWorkspaceDependencies,
  getWorkspacePackageOrder,
} from "../utilities/index.js";
import { globalArgs } from "./index.js";
import type { GlobalOptionValues } from "./index.js";

export const runWorkspaceCommand = async (
  args: string[],
  globalValues: GlobalOptionValues = {}
) => {
  const { values: commandValues, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      ...globalArgs,
      env: { type: "string", short: "e" },
      force: { type: "boolean", short: "f" },
    },
  });
  const values = { ...commandValues, ...globalValues };

  if (values.help) {
    console.log("Usage: npw cmd [script...] --env <env> [--force]");
    return;
  }

  const workspacePackages = getWorkspacePackages();

  if (workspacePackages === null) return;

  const script = positionals[0];
  const _ws = script
    ? Object.fromEntries(
        Object.entries(workspacePackages).filter(
          ([, workspacePackage]) =>
            typeof workspacePackage.scripts?.[script] === "string"
        )
      )
    : workspacePackages;

  const packageWeb = getWorkspacePackageWeb(_ws);
  const circularDependencies = findCircularWorkspaceDependencies(packageWeb);

  if (circularDependencies.length > 0) {
    console.warn(
      "Circular workspace dependencies detected:",
      circularDependencies.map((cycle) => cycle.join(" -> "))
    );

    process.exit(1);
  }

  const commandOrder = getWorkspacePackageOrder(_ws, packageWeb);

  console.log(
    `Running ${positionals[0]}${values.env ? ` as ${values.env}` : ""}`
  );

  for (const group of commandOrder) {
    await GroupRunner(group, positionals[0]);
  }
};

const GroupRunner = async (group: string[], command: string) => {
  await Promise.all(
    group.map(
      (packageName) =>
        new Promise<void>((resolve) => {
          const cmd = spawn(
            `npm run ${command} --workspace=${packageName}`,
            [],
            {
              stdio: "pipe",
              shell: true,
              env: {
                ...process.env,
                FORCE_COLOR: "1",
              },
            }
          );

          cmd.stdout.on("data", (data) => {
            process.stdout.write(`${data}`);
          });

          cmd.stderr.on("data", (data) => {
            process.stdout.write(`${data}`);
          });

          cmd.on("error", (err) => {
            console.error(Glaze.red(`Failed to start child process:\n${err}`));
          });

          cmd.on("close", (code) => {
            if (code !== 0) {
              console.log(
                Glaze.yellow(`child process exited with code ${code}`)
              );
            }

            resolve();
          });
        })
    )
  );
};
