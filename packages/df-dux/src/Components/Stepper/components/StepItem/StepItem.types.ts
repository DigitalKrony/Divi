/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type {
  ComponentProps,
  ComponentState,
  Slot,
} from "@fluentui/react-utilities";

import { TitlePlacement } from "../../Stepper.types";

export enum Conditions {
  Pending = "pending",
  Complete = "complete",
  Incomplete = "incomplete",
  Error = "error",
}

/**
 * StepItemSlots
 */
export type StepItemSlots = {
  root: NonNullable<Slot<"div">>;
  label?: Slot<"label">;
};

/**
 *  StepItemProps
 */
export type StepItemProps = ComponentProps<StepItemSlots> & {
  /**
   * @type string
   * @default ''
   * @description
   */
  title: string;

  /**
   * @type string | number
   * @default '''
   * @description
   */
  tag?: string | number;

  /**
   * @type Conditions
   * @default Conditions
   * @description a
   */
  condition?: `${Conditions}`;

  /**
   * @type TitlePlacement
   * @default 'bottom'
   * @description
   */
  titlePlacement?: `${TitlePlacement}`;

  /**
   * @type boolean
   * @default false
   * @description
   */
  active?: boolean;

  /**
   * @type boolean
   * @default false
   * @description
   */
  disabled?: boolean;

  /**
   * @type Function
   * @description
   */
  callback?: (i?: number) => void;
};

/**
 * State used in rendering StepItem
 */
export type StepItemState = ComponentState<StepItemSlots> & StepItemProps & {};

/**
 * Context used in rendering StepItem
 */
export type StepItemContextValue = Omit<
  StepItemState,
  "root" | "components" | "children" | "callback"
> & {};

export type StepItemContextValues = {
  stepItem: StepItemContextValue;
};
