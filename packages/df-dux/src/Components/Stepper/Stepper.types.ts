/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { ReactElement } from "react";
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from "@fluentui/react-utilities";

import { DirectionEnum } from "@df/utilities";
import type { StepItemProps } from "./components";

export enum TitlePlacement {
  Top = "top",
  End = "end",
  Bottom = "bottom",
  Start = "start",
}

/**
 * StepperSlots
 */
export type StepperSlots = {
  root: NonNullable<Slot<"div">>;
};

/**
 *  StepperProps
 */
export type StepperProps = ComponentProps<StepperSlots> &
  Pick<StepItemProps, "titlePlacement"> & {
    /**
     * @type StepItemProps
     * @default []
     * @description
     */
    steps: StepItemProps[];

    /**
     * @type number
     * @default undefined
     * @description
     */
    activeStep?: number;

    /**
     * @type StepItemProps
     * @default []
     * @description
     */
    callback?: (active: number) => void;

    /**
     * @type DirectionEnum
     * @default vertical
     * @description
     */
    direction?: DirectionEnum | `${DirectionEnum}`;

    /**
     * @type 'number' | 'letter'
     * @default 'number'
     * @description
     */
    tagType?: "number" | "letter" | "none";
  };

/**
 * State used in rendering Stepper
 */
export type StepperState = ComponentState<StepperSlots> &
  StepperProps & {
    stepItems?: ReactElement<any, any>[];
  };

export type StepperContextValue = Omit<
  StepperState,
  "root" | "components" | "children"
> & {};

export type StepperContextValues = {
  stepper: StepperContextValue;
};
