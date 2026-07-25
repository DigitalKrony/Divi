/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type Dispatch, type SetStateAction } from 'react';
import { type ValidationError } from '@react-types/shared';
import { type InputProps } from '@heroui/react';

import { ElementPositionEnum } from '@df/utilities';

import { type ComponentProps, type ComponentState, type Slot } from '@fluentui/react-utilities';

/**
 * MultiEntryInputSlots
 */
export type MultiEntryInputSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 *  MultiEntryInputProps
 */
export type MultiEntryInputProps = ComponentProps<MultiEntryInputSlots> &
  Partial<
    Pick<
      InputProps,
      'label' | 'placeholder' | 'size' | 'type' | 'isRequired' | 'validate' | 'isInvalid' | 'disableAnimation'
    >
  > & {
    className?: string;
    id?: string;
    readOnly?: boolean;
    inputLocation?: ElementPositionEnum | `${ElementPositionEnum}`;
    defaultValue?: Array<string>;
    onChange?: (value: string[]) => void;
    onValueChange?: (value: string[]) => void;
    inputRef?: InputProps['baseRef'];
  };

/**
 * MultiEntryInputState
 */
export type MultiEntryInputState = ComponentState<MultiEntryInputSlots> &
  MultiEntryInputProps & {
    addItem: (r: string) => void;
    itemClose: (r: string) => void;
    addedItems: Set<string>;
    setAddedItems: Dispatch<SetStateAction<Set<string>>>;
    inputValue: string;
    setInputValue: Dispatch<SetStateAction<string>>;
  };
