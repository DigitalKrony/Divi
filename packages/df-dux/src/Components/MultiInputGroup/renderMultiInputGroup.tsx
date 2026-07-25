/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type { JSX, ReactElement } from 'react';
import { useEffect } from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import { cn } from '@heroui/react';

import { Button, Input, StateSelection } from '@Components';
import { inputDebounce } from '@df/utilities';

import type { MultiInputGroupSlots, MultiInputGroupState } from './MultiInputGroup.types';

/**
 * Render the final JSX of MultiInputGroup
 */
export const renderMultiInputGroup = (state: MultiInputGroupState): JSX.Element => {
  const {
    id,
    inputSchema,
    classNames,
    disableAnimation,
    areDeleatable,
    labelPlacement,
    requiredGroupCount = 1,
    fullWidth,
    label,
    lineGroups,
    size,
    color,
    radius,
    variant,
    readOnly,
    addNewLine,
    addButtonProps,
    lineGroupData,
    setLineGrups,
    canAdd,
    deleteButtonProps,
    removeLine,
    inputValueHandler,
    buildingGroup,
    setBuildingGroup,
  } = state;
  assertSlots<MultiInputGroupSlots>(state);

  const groupLabelSize = size === 'sm' ? 'base' : size === 'md' ? 'lg' : '2xl';

  const inputValueHandlerDebounce = inputDebounce((args: any) => {
    inputValueHandler(args);
  });

  const buildLine = (count: number) => {
    const newLine: ReactElement<any, any>[] = [];

    inputSchema.forEach((v: any, i: number, a: any) => {
      const lineData = lineGroupData[count].values;
      const props = lineGroupData[count].schema[i];
      const { type, label, key, validate } = props;

      if (!!!lineData) return false;

      if (type === 'state') {
        newLine.push(
          <StateSelection
            key={`${count}-${key}`}
            label={label}
            onChange={(value?: string) => {
              inputValueHandler({ value, key, group: count });
            }}
          />
        );
      } else {
        newLine.push(
          <Input
            key={`${count}-${key}`}
            isDisabled={readOnly}
            radius={radius}
            disableAnimation={disableAnimation}
            size={size}
            color={color}
            variant={variant}
            labelPlacement={labelPlacement}
            type={type}
            label={label}
            validate={validate}
            defaultValue={lineData[key]}
            onValueChange={(value) => {
              inputValueHandlerDebounce({ value, key, group: count });
            }}
          />
        );
      }
    });

    return (
      <div
        key={`${id}-group-${count}`}
        className={cn(fullWidth && 'w-full', 'flex', 'gap-2', 'items-start', classNames?.groupWrapper)}
      >
        {newLine}
        {areDeleatable && lineGroupData.length > requiredGroupCount && (
          <div className={cn('flex', 'items-center', 'pt-5')}>
            <Button
              size={size}
              color={'danger'}
              radius={radius}
              disableAnimation={disableAnimation}
              isDisabled={readOnly}
              children={'delete'}
              {...deleteButtonProps}
              onPress={() => removeLine(count)}
            />
          </div>
        )}
      </div>
    );
  };

  const buildLineGroups = () => {
    const lineGroups: ReactElement<any, any>[] = [];

    lineGroupData.forEach((v: any, i: number, a: any) => {
      lineGroups.push(buildLine(i));
    });

    setLineGrups(lineGroups);
  };

  useEffect(() => {
    if (!!buildingGroup) {
      buildLineGroups();
    }
  }, [lineGroupData, areDeleatable, canAdd, readOnly, size, variant, color, radius]);

  return (
    <state.root>
      {label && (
        <div className={cn(classNames?.labelWrapper)}>
          <label
            className={cn(
              'w-full',
              'text-forground',
              'font-semibold',
              `text-${groupLabelSize}`,
              classNames?.label
            )}
          >
            {label}
          </label>
        </div>
      )}
      {lineGroups}
      {!readOnly && canAdd && (
        <div className={cn(classNames?.addWrapper)}>
          <Button
            children={'Add'}
            size={size}
            radius={radius}
            color={color}
            disableAnimation={disableAnimation}
            isDisabled={readOnly}
            {...addButtonProps}
            onPress={() => addNewLine()}
          />
        </div>
      )}
    </state.root>
  );
};
