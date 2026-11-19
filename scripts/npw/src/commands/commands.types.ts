/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export type GlobalOptionValues = Partial<
  Record<keyof typeof globalArgs, boolean>
>;

export const globalArgs = {
  help: { type: "boolean", short: "h" },
  version: { type: "boolean", short: "v" },
  verbose: { type: "boolean" },
  debug: { type: "boolean", short: "d" },
} as const;
