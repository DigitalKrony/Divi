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

import type { StepItemContextValue } from "./StepItem.types";

const setDefaultStepItemContextValues: StepItemContextValue = {
  label: "",
  title: "",
};

export const StepItemContext: Context<StepItemContextValue> = createContext<
  StepItemContextValue | undefined
>(undefined) as Context<StepItemContextValue>;

export const StepItemProvider = StepItemContext.Provider;

export const useStepItemContext = <T>(
  selector: ContextSelector<StepItemContextValue, T>
): T =>
  useContextSelector(StepItemContext, (ctx = setDefaultStepItemContextValues) =>
    selector(ctx)
  );
