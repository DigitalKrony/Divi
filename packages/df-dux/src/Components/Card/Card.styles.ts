/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, shorthands } from "@griffel/react";

/**
 * Styles for the Card slots
 */
export const useCardStyles = makeStyles({
  parent_root: {
    borderInlineStartWidth: "0px",
    ...shorthands.borderStyle(`none none inside none`),
  },
  header_root: {},
  body_root: {},
  footer_root: {},
  has_status: {
    borderInlineStartWidth: "4px",
  },
  status_default: {
    ...shorthands.borderColor(`hsl(var(--heroui-default))`),
  },
  status_info: {
    ...shorthands.borderColor(`hsl(var(--heroui-info))`),
  },
  status_primary: {
    ...shorthands.borderColor(`hsl(var(--heroui-primary))`),
  },
  status_secondary: {
    ...shorthands.borderColor(`hsl(var(--heroui-secondary))`),
  },
  status_success: {
    ...shorthands.borderColor(`hsl(var(--heroui-success))`),
  },
  status_warning: {
    ...shorthands.borderColor(`hsl(var(--heroui-warning))`),
  },
  status_danger: {
    ...shorthands.borderColor(`hsl(var(--heroui-danger))`),
  },
});
