/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles } from "@griffel/react";

/**
 * Styles for the HeroUI_Catalog slots
 */
export const useHeroUI_CatalogStyles = makeStyles({
  root: {
    "> div ": {
      paddingBlock: "var(--heroui-spacing-sm)",
      borderBottom: `1px solid var(--color-gray-200)`,
    },
  },
});
