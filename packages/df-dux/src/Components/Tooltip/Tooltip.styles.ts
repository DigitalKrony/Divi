/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, shorthands } from "@griffel/react";

import { hslToColor } from "@df/utilities";

/**
 * Styles for the Tooltip slots
 */
export const useTooltipStyles = makeStyles({
  base: {
    "::after": {
      position: "absolute",
      borderRadius: "0",
      content: "''",
      bottom: "100%",
      ...shorthands.borderRadius("0"),
      ...shorthands.borderStyle("solid"),
      ...shorthands.borderColor(
        "transparent",
        "transparent",
        hslToColor("heroui-foreground-800"),
        "transparent"
      ),
    },
  },
  base_sm: {
    "::after": {
      left: "12px",
      ...shorthands.borderWidth("6px"),
    },
  },
  base_md: {
    "::after": {
      left: "16px",
      ...shorthands.borderWidth("8px"),
    },
  },
  base_lg: {
    "::after": {
      left: "24px",
      ...shorthands.borderWidth("12px"),
    },
  },
  content: {
    padding: "18px 16px",
    backgroundColor: hslToColor("heroui-foreground-800"),
  },
  arrow: {},
});
