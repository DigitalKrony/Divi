/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, mergeClasses } from "@griffel/react";
import type { SlotClassNames } from "@fluentui/react-utilities";

import type {
  MultiInputGroupSlots,
  MultiInputGroupState,
} from "./MultiInputGroup.types";

export const MultiInputGroupClassNames: SlotClassNames<MultiInputGroupSlots> = {
  root: "som-multiInputGroup",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the MultiInputGroup slots based on the props
 */
export const useMultiInputGroupStyles = (
  state: MultiInputGroupState
): MultiInputGroupState => {
  const { className, classNames } = state;
  const styles = useStyles();

  state.root.className = mergeClasses(
    MultiInputGroupClassNames.root,
    styles.root,
    "flex",
    "flex-col",
    "align-start",
    "gap-2",
    className,
    classNames?.base
  );

  return state;
};
