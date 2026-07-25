/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { cn } from "@heroui/react";
import { makeStyles, mergeClasses } from "@griffel/react";

import { TitlePlacement } from "../..";
import type { StepItemSlots, StepItemState } from "./StepItem.types";
import type { SlotClassNames } from "@fluentui/react-utilities";

export const stepItemClassNames: SlotClassNames<StepItemSlots> = {
  root: "som-step_item",
  label: "som-step_item--label",
};

/**
 * Styles for the root slot
 */
export const useStepItemStyles = makeStyles({
  root: {
    alignItems: "center",
  },
  numberChild: {
    lineHeight: "1.3",
  },
});

/**
 * Apply styling to the  StepItem slots based on the state
 */
export const useStepItemClasses = (state: StepItemState): StepItemState => {
  const { active = true, className, titlePlacement } = state;
  const styles = useStepItemStyles();
  const rootTWClass = ["inline-flex", "align-center", "gap-2"];

  switch (titlePlacement) {
    case TitlePlacement.Top:
      rootTWClass.push("flex-col");
      break;
    case TitlePlacement.Start:
      rootTWClass.push("flex-row");
      break;
    case TitlePlacement.End:
      rootTWClass.push("flex-row-reverse");
      break;
    case TitlePlacement.Bottom:
    default:
      rootTWClass.push("flex-col-reverse");
      break;
  }

  state.root.className = mergeClasses(
    stepItemClassNames.root,
    styles.root,
    cn(rootTWClass, className)
  );
  state.label &&
    (state.label.className = mergeClasses("text-md", "font-semibold"));

  return state;
};
