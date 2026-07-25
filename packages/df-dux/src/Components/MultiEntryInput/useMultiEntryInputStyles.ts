/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, mergeClasses } from "@griffel/react";
import type { SlotClassNames } from "@fluentui/react-utilities";

import type {
  MultiEntryInputSlots,
  MultiEntryInputState,
} from "./MultiEntryInput.types";

export const MultiEntryInputClassNames: SlotClassNames<MultiEntryInputSlots> = {
  root: "som-multiEntryInput",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the MultiEntryInput slots based on the props
 */
export const useMultiEntryInputStyles = (
  state: MultiEntryInputState
): MultiEntryInputState => {
  const { className } = state;
  const styles = useStyles();

  state.root.className = mergeClasses(
    MultiEntryInputClassNames.root,
    styles.root,
    "w-full",
    "flex",
    className
  );

  return state;
};
