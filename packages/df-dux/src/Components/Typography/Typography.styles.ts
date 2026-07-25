/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles } from "@griffel/react";

import { hslToColor, strToVar } from "@df/utilities";

/**
 * Styles for the Typography slots
 */
export const useTypographyStyles = makeStyles({
  root: {},
  star: {
    marginBlockStart: strToVar("spacing"),
    color: `${hslToColor("heroui-danger")}`,
  },
});
