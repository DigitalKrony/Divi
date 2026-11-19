/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { GlobalOptionValues } from "./commands/index.js";

export type CommandHandler = (
  args: string[],
  globalValues: GlobalOptionValues
) => void | Promise<void>;
