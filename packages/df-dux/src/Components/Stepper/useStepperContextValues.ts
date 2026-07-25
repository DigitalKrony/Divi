/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type {
  StepperContextValue,
  StepperContextValues,
  StepperState,
} from "./Stepper.types";

export const useStepperContextValues = (
  state: StepperState
): StepperContextValues => {
  // const {  } = state;

  const stepper: StepperContextValue = {};

  return { stepper };
};
