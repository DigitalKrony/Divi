/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles } from "@griffel/react";

/**
 * Styles for the ComponentShowcase slots
 */
export const useComponentShowcaseStyles = makeStyles({
  root: {
    "> div ": {
      paddingBlock: "var(--heroui-spacing-sm)",
      borderBottom: `1px solid var(--color-gray-200)`,
    },
  },
});
