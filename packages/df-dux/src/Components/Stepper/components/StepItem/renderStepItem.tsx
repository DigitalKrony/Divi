/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { assertSlots } from '@fluentui/react-utilities';

import {
  CheckmarkFilled,
  Incomplete,
  SubtractAlt,
  CheckmarkFilledWarning,
  CheckmarkFilledError,
} from '@Icons';
import { Button } from '@Components/Button';

import { Conditions } from './StepItem.types';
import { useStepItemStyles } from './useStepItemStyles';
import { StepItemContext } from './StepItemContext';
import type { StepItemContextValues, StepItemSlots, StepItemState } from './StepItem.types';

/**
 * Render the final JSX of  StepItem
 */
export const renderStepItem = (state: StepItemState, contextValues: StepItemContextValues): JSX.Element => {
  assertSlots<StepItemSlots>(state);
  const classes = useStepItemStyles();
  const { active = true, title, condition, disabled, tag, callback } = state;
  const [clickCount, setClickCount] = useState(0);

  let buttonColor: 'success' | 'warning' | 'danger' | 'primary' | 'default' | 'secondary' | undefined =
    undefined;

  switch (condition) {
    case Conditions.Complete:
      buttonColor = 'success';
      break;
    case Conditions.Incomplete:
      buttonColor = 'warning';
      break;
    case Conditions.Error:
      buttonColor = 'danger';
      break;
    case Conditions.Pending:
    default:
      buttonColor = 'primary';
      break;
  }

  useEffect(() => {}, [clickCount]);

  return (
    <StepItemContext.Provider value={contextValues.stepItem}>
      <state.root>
        {state.label && <state.label>{title}</state.label>}
        <Button
          aria-label={title}
          isIconOnly
          radius={'full'}
          color={buttonColor}
          isDisabled={disabled}
          onPress={() => {
            setClickCount(clickCount + 1);
            callback && callback();
          }}
          variant={active ? 'solid' : 'bordered'}
        >
          {condition === Conditions.Complete && <CheckmarkFilled className={mergeClasses('h-6', 'w-6')} />}
          {condition === Conditions.Incomplete && (
            <CheckmarkFilledWarning className={mergeClasses('h-6', 'w-6', 'mt-0.5')} />
          )}
          {condition === Conditions.Error && (
            <CheckmarkFilledError className={mergeClasses('h-6', 'w-6', 'mt-0.5')} />
          )}
          {(condition === Conditions.Pending || !!!condition) && (
            <span
              className={mergeClasses(
                'h-6',
                'w-6',
                'text-lg',
                'font-bold',
                'line-hegith[1.3]',
                classes.numberChild
              )}
            >
              {tag || '#'}
            </span>
          )}
        </Button>
      </state.root>
    </StepItemContext.Provider>
  );
};
