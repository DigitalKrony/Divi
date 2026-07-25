/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type {
  StepItemContextValue,
  StepItemContextValues,
  StepItemState,
} from "./StepItem.types";

export const useStepItemContextValues = (
  state: StepItemState
): StepItemContextValues => {
  // const {  } = state;

  const stepItem: StepItemContextValue = {};

  return { stepItem };
};
