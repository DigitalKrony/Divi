#!/usr/bin/env node
/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { parseArgs } from "node:util";

import { globalArgs, runWorkspaceCommand, runPoll } from "./commands/index.js";
import type { GlobalOptionValues } from "./commands/index.js";
import type { CommandHandler } from "./cli.types.js";
import Glaze from "@df/glaze";

const commands: Record<string, CommandHandler> = {
  run: runWorkspaceCommand,
  poll: runPoll,
};

const args = process.argv.slice(2);
const { values, positionals } = parseArgs({
  args,
  allowPositionals: true,
  strict: false,
  options: globalArgs,
});

const subCommand = positionals[0];

if (!subCommand) {
  console.log("Usage: npw <command> [options]");
  console.log(`Available commands: ${Object.keys(commands).join(", ")}`);
  process.exit(values.help ? 0 : 1);
}

const handler = commands[subCommand];

if (!handler) {
  console.error(Glaze.red(`Unknown command: `), Glaze.red(`${subCommand}`, {background:true}));
  process.exit(1);
}

const commandIndex = args.indexOf(subCommand);
const commandArgs = args.slice(commandIndex + 1);
const globalValues: GlobalOptionValues = {
  help: typeof values.help === "boolean" ? values.help : undefined,
  version: typeof values.version === "boolean" ? values.version : undefined,
  verbose: typeof values.verbose === "boolean" ? values.verbose : undefined,
  debug: typeof values.debug === "boolean" ? values.debug : undefined,
};

await handler(commandArgs, globalValues);
