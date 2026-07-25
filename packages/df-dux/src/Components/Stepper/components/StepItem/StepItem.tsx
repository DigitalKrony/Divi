/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { forwardRef } from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useStepItem } from './useStepItem';
import { renderStepItem } from './renderStepItem';
import { useStepItemClasses } from './useStepItemStyles';
import { useStepItemContextValues } from './useStepItemContextValues';
import type { StepItemProps } from './StepItem.types';

export const StepItem: ForwardRefComponent<StepItemProps> = forwardRef((props, ref) => {
  const state = useStepItem(props, ref);
  const contextValues = useStepItemContextValues(state);
  useStepItemClasses(state);
  return renderStepItem(state, contextValues);
});

StepItem.displayName = 'StepItem';
