/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, mergeClasses } from "@griffel/react";
import type { SlotClassNames } from "@fluentui/react-utilities";

import type { DataTableSlots, DataTableState } from "./DataTable.types";

export const DataTableClassNames: SlotClassNames<DataTableSlots> = {
  root: "som-dataTable",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the DataTable slots based on the props
 */
export const useDataTableStyles = (state: DataTableState): DataTableState => {
  const { className } = state;
  const styles = useStyles();

  state.root.className = mergeClasses(
    DataTableClassNames.root,
    styles.root,
    "flex",
    "flex-col",
    "gap-4",
    className
  );

  return state;
};
