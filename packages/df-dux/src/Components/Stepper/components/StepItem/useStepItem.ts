/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { useRef } from "react";
import {
  getIntrinsicElementProps,
  slot,
  useMergedRefs,
} from "@fluentui/react-utilities";

import type { StepItemProps, StepItemState } from "./StepItem.types";

/**
 * Create the state required to render StepItem.
 *
 * The returned state can be modified with hooks such as use StepItemStyles,
 * before being passed to render StepItem.
 *
 * @param props - props from this instance of StepItem
 * @param ref - reference to root HTMLElement of StepItem
 */
export const useStepItem = (
  props: StepItemProps,
  ref: React.Ref<HTMLElement> & React.Ref<HTMLDivElement>
): StepItemState => {
  const { active, condition, titlePlacement, title, disabled, tag, callback } =
    props;
  const innerRef = useRef<HTMLElement>(null);

  const root: StepItemState["root"] = slot.always(
    getIntrinsicElementProps("div", {
      ref: useMergedRefs(
        ref,
        innerRef.current ? innerRef : undefined
      ) as React.Ref<HTMLDivElement>,
      ...props,
    }),
    { elementType: "div" }
  );

  const state: StepItemState = {
    components: { root: "div", label: "label" },
    root,
    label: slot.optional(props.label || {}, { elementType: "label" }),
    title,
    condition,
    titlePlacement,
    disabled,
    tag,
    active,
    callback,
  };

  return state;
};
