/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, mergeClasses } from "@griffel/react";
import type { StepperSlots, StepperState } from "./Stepper.types";
import type { SlotClassNames } from "@fluentui/react-utilities";

export const stepperClassNames: SlotClassNames<StepperSlots> = {
  root: "som-stepper",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the  Stepper slots based on the state
 */
export const useStepperStyles = (state: StepperState): StepperState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    stepperClassNames.root,
    styles.root,
    state.className,
    "flex",
    "gap-4"
  );

  return state;
};
