/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { forwardRef } from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useStepper } from './useStepper';
import { renderStepper } from './renderStepper';
import { useStepperStyles } from './useStepperStyles';
import { useStepperContextValues } from './useStepperContextValues';
import type { StepperProps } from './Stepper.types';

export const Stepper: ForwardRefComponent<StepperProps> = forwardRef((props, ref) => {
  const state = useStepper(props, ref);
  const contextValues = useStepperContextValues(state);
  useStepperStyles(state);
  return renderStepper(state, contextValues);
});

Stepper.displayName = 'Stepper';
