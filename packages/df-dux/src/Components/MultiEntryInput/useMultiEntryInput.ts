/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { useRef, useEffect, useState } from "react";
import {
  getIntrinsicElementProps,
  slot,
  useMergedRefs,
} from "@fluentui/react-utilities";

import { createUniqueId } from "@df/utilities";

import type {
  MultiEntryInputProps,
  MultiEntryInputState,
} from "./MultiEntryInput.types";

/**
 * Create the state required to render  MultiEntryInput.
 *
 * The returned state can be modified with hooks such as use MultiEntryInputStyles,
 * before being passed to render MultiEntryInput.
 *
 * @param props - props from this instance of MultiEntryInput
 * @param ref - reference to root HTMLElement of MultiEntryInput
 */
export const useMultiEntryInput = (
  props: MultiEntryInputProps,
  ref: React.Ref<HTMLElement> & React.Ref<HTMLDivElement>
): MultiEntryInputState => {
  const {
    id,
    className,
    readOnly = false,
    defaultValue,
    disableAnimation,
    isRequired,
    isInvalid,
    inputLocation = "after",
    label,
    onChange,
    onValueChange,
    validate,
    placeholder,
    size,
    type,
  } = props;
  const innerRef = useRef<HTMLElement>(null);
  const [rootId, setRootId] = useState(
    id || createUniqueId({ packagePrefix: "som", componentName: "multiEntry" })
  );
  const [addedItems, setAddedItems] = useState<Set<string>>(
    new Set(!!defaultValue ? defaultValue : undefined)
  );
  const [inputValue, setInputValue] = useState<string>("");

  // TODO: change input return catch to halt for verification
  const addItem = (r: string) => {
    setAddedItems((prev) => {
      const newSet = new Set(prev);
      newSet.add(r);
      return newSet;
    });
    setInputValue("");
  };

  const itemClose = (r: string) => {
    setAddedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(r);
      return newSet;
    });
    setInputValue("");
  };

  // Handler that is called when the value changes.
  useEffect(() => {
    onChange && onChange([...addedItems]);
  }, [inputValue]);

  // Handler that is called when the element's selection state changes.
  useEffect(() => {
    onValueChange && onValueChange([...addedItems]);
  }, [addedItems]);

  useEffect(() => {
    // setAddedItems(new Set(defaultValue));
  }, [defaultValue]);

  const root: MultiEntryInputState["root"] = slot.always(
    getIntrinsicElementProps("div", {
      ref: useMergedRefs(
        ref,
        innerRef.current ? innerRef : undefined
      ) as React.Ref<HTMLDivElement>,
      id: rootId,
      ...props,
    }),
    { elementType: "div" }
  );

  const state: MultiEntryInputState = {
    components: { root: "div" },
    root,
    id: rootId,
    inputRef: useRef(null),
    className,
    readOnly,
    defaultValue,
    disableAnimation,
    inputLocation,
    isRequired,
    isInvalid,
    label,
    onChange,
    validate,
    onValueChange,
    placeholder,
    size,
    type,
    addItem,
    itemClose,
    addedItems,
    setAddedItems,
    inputValue,
    setInputValue,
  };

  return state;
};
