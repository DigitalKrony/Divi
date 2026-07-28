/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import { cn } from '@heroui/react';

import { Chip, Input, Text } from '@Components';

import type { MultiEntryInputSlots, MultiEntryInputState } from './MultiEntryInput.types';

/**
 * Render the final JSX of MultiEntryInput
 */
export const renderMultiEntryInput = (state: MultiEntryInputState): JSX.Element => {
  assertSlots<MultiEntryInputSlots>(state);
  const {
    id,
    readOnly,
    inputRef,
    defaultValue,
    isRequired,
    isInvalid,
    inputLocation,
    label,
    onChange,
    onValueChange,
    validate,
    placeholder,
    size = 'md',
    type = 'text',
    addItem,
    itemClose,
    addedItems,
    setAddedItems,
    inputValue,
    setInputValue,
  } = state;

  // TODO: Make new component for InputChip
  const InputChip = (
    <Chip size={size} variant={readOnly ? 'light' : 'bordered'}>
      {readOnly ? (
        <Text size={size}>{label}</Text>
      ) : (
        <Input
          baseRef={inputRef}
          classNames={{
            innerWrapper: cn('p-0'),
            label: cn('pl-0', '-ml-1'),
            inputWrapper: cn('min-h-7', 'h-7'),
            input: cn('p-0'),
            clearButton: cn('p-1', 'absolute', 'right-0'),
          }}
          label={label}
          placeholder={placeholder}
          labelPlacement={'outside-left'}
          type={type}
          size={size}
          variant={'underlined'}
          isClearable={!readOnly}
          isRequired={isRequired}
          isInvalid={isInvalid}
          value={inputValue}
          validate={validate}
          onKeyDown={(event) => {
            const { key, target } = event;
            if (key === 'Enter') {
              addItem((target as HTMLInputElement).value);
            }
          }}
          onValueChange={(value) => {
            setInputValue(value);
          }}
        />
      )}
    </Chip>
  );

  return (
    <state.root>
      <div className={cn('flex', 'grow', 'flex-wrap', 'gap-2')}>
        {inputLocation === 'top' && <div className={'w-full'}>{InputChip}</div>}
        {inputLocation === 'before' && InputChip}
        {(() => {
          const items: ReactElement<any, any>[] = [];

          addedItems.forEach((label: any, index: any) => {
            items.push(
              <Chip
                size={size}
                key={`${index}`}
                onClose={!readOnly ? () => itemClose(label) : undefined}
                variant={readOnly ? 'flat' : 'bordered'}
              >
                {label}
              </Chip>
            );
          });
          return items;
        })()}
        {inputLocation === 'after' && InputChip}
        {inputLocation === 'bottom' && <div className={'w-full'}>{InputChip}</div>}
      </div>
    </state.root>
  );
};
