/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { Dispatch, ReactElement, RefObject, SetStateAction } from "react";
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from "@fluentui/react-utilities";
import type { InputProps, ButtonProps } from "@heroui/react";

/**
 * MultiInputGroupSlots
 */
export type MultiInputGroupSlots = {
  root: NonNullable<Slot<"div">>;
};

export type MultiInputGroupSlotClassNames = {
  base?: string;
  label?: string;
  labelWrapper?: string;
  groupWrapper?: string;
  addWrapper?: string;
};

type swapType =
  | "size"
  | "variant"
  | "color"
  | "radius"
  | "disableAnimation"
  | "fullWidth"
  | "labelPlacement";

export type InputSchemaType = Partial<Omit<InputProps, swapType>> & {
  key?: string;
};

/**
 *  MultiInputGroupProps
 */
export type MultiInputGroupProps = ComponentProps<MultiInputGroupSlots> &
  Partial<Pick<InputProps, swapType>> & {
    className?: string;
    classNames?: MultiInputGroupSlotClassNames;
    id?: string;
    baseRef?: RefObject<HTMLDivElement>;
    label?: string;
    readOnly?: boolean;
    inputSchema: InputSchemaType[];
    deleteButtonProps?: Omit<ButtonProps, "size">;
    addButtonProps?: Omit<ButtonProps, "size">;
    requiredGroupCount?: number;
    initialGroupCount?: number;
    canAdd?: boolean;
    areDeleatable?: boolean;
    onChange?: (event?: any) => void;
    onValueChage?: (value?: any) => void;
  };

/**
 * MultiInputGroupState
 */
export type MultiInputGroupState = ComponentState<MultiInputGroupSlots> &
  MultiInputGroupProps & {
    lineGroups: any;
    setLineGrups: Dispatch<ReactElement<any, any>[]>;
    lineGroupData: any;
    setLineGroupData: Dispatch<any>;
    addNewLine: () => void;
    removeLine: (count: number) => void;
    inputValueHandler: (args: any) => void;
    buildingGroup: boolean;
    setBuildingGroup: Dispatch<SetStateAction<boolean>>;
  };
