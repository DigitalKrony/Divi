/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import {
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import type {
  Context,
  ContextSelector,
} from "@fluentui/react-context-selector";

import type { StepperContextValue } from "./Stepper.types";

const setDefaultStepperContextValues: StepperContextValue = {
  steps: [],
  stepItems: [],
};

export const StepperContext: Context<StepperContextValue> = createContext<
  StepperContextValue | undefined
>(undefined) as Context<StepperContextValue>;

export const StepperProvider = StepperContext.Provider;

export const useStepperContext = <T>(
  selector: ContextSelector<StepperContextValue, T>
): T =>
  useContextSelector(StepperContext, (ctx = setDefaultStepperContextValues) =>
    selector(ctx)
  );
