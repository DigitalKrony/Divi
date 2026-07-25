/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import {
  getIntrinsicElementProps,
  slot,
  useMergedRefs,
} from "@fluentui/react-utilities";

import { createUniqueId } from "@df/utilities";

import type {
  MultiInputGroupProps,
  MultiInputGroupState,
} from "./MultiInputGroup.types";

/**
 * Create the state required to render  MultiInputGroup.
 *
 * The returned state can be modified with hooks such as use MultiInputGroupStyles,
 * before being passed to render MultiInputGroup.
 *
 * @param props - props from this instance of MultiInputGroup
 * @param ref - reference to root HTMLElement of MultiInputGroup
 */
export const useMultiInputGroup = (
  props: MultiInputGroupProps,
  ref: React.Ref<HTMLElement> & React.Ref<HTMLDivElement>
): MultiInputGroupState => {
  const {
    inputSchema,
    id = createUniqueId({}),
    className,
    classNames,
    label,
    variant,
    fullWidth,
    labelPlacement,
    requiredGroupCount = 1,
    initialGroupCount = 1,
    canAdd = true,
    areDeleatable,
    size,
    radius,
    readOnly,
    onChange,
    onValueChage,
    deleteButtonProps,
    disableAnimation,
    addButtonProps,
  } = props;
  const innerRef = useRef<HTMLElement>(null);

  const [lineGroups, setLineGrups] = useState<ReactElement<any, any>[]>([]);
  const [lineGroupData, setLineGroupData] = useState<any>([]);
  const [buildingGroup, setBuildingGroup] = useState<boolean>(true);

  const root: MultiInputGroupState["root"] = slot.always(
    getIntrinsicElementProps("div", {
      ref: useMergedRefs(
        ref,
        innerRef.current ? innerRef : undefined
      ) as React.Ref<HTMLDivElement>,
      id,
      ...props,
    }),
    { elementType: "div" }
  );

  const blockLineData = () => {
    const newLine: any = {
      schema: [],
      values: {},
    };

    inputSchema.forEach((v, i, a) => {
      const { key } = v;
      newLine.values[`${key}`] = undefined;
      newLine.schema.push(v);
    });

    return newLine;
  };

  const addNewLine = () => {
    setBuildingGroup(true);
    setLineGroupData([...lineGroupData, blockLineData()]);
  };

  const inputValueHandler = (args: any) => {
    setBuildingGroup(false);
    const lineToUpdate = lineGroupData[args.group].values;
    lineToUpdate[args.key] = args.value;

    const newLineGroupData = [...lineGroupData];
    lineGroupData[args.group].values = lineToUpdate;

    setLineGroupData(newLineGroupData);
  };

  const removeLine = (count: number) => {
    setBuildingGroup(true);
    if (lineGroupData.length === requiredGroupCount) return false;

    const amendedData: any = [];
    lineGroupData.forEach((v: any, i: number, a: any) => {
      if (i !== count) {
        amendedData.push(v);
      }
    });

    setLineGroupData(amendedData);
  };

  useEffect(() => {
    const iv: any = [];

    Array.from({ length: initialGroupCount }).forEach((_, i) => {
      iv.push(blockLineData());
    });

    setLineGroupData(iv);
  }, []);

  useEffect(() => {
    onChange && onChange();
  }, [lineGroups]);

  useEffect(() => {
    const groupValues: any = [];
    lineGroupData.forEach((line: any) => {
      groupValues.push(line.values);
    });
    onValueChage && onValueChage(groupValues);
  }, [lineGroupData, areDeleatable, canAdd, readOnly]);

  const state: MultiInputGroupState = {
    components: { root: "div" },
    root,
    id,
    className,
    classNames,
    label,
    size,
    variant,
    radius,
    inputSchema,
    initialGroupCount,
    labelPlacement,
    fullWidth,
    canAdd,
    areDeleatable,
    readOnly,
    lineGroups,
    setLineGrups,
    lineGroupData,
    setLineGroupData,
    onValueChage,
    onChange,
    addNewLine,
    addButtonProps,
    removeLine,
    deleteButtonProps,
    disableAnimation,
    inputValueHandler,
    buildingGroup,
    setBuildingGroup,
  };

  return state;
};
