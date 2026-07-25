/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { useRef } from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';

import type { StepperProps, StepperState } from './Stepper.types';

/**
 * Create the state required to render  Stepper.
 *
 * The returned state can be modified with hooks such as use StepperStyles,
 * before being passed to render Stepper.
 *
 * @param props - props from this instance of Stepper
 * @param ref - reference to root HTMLElement of Stepper
 */
export const useStepper = (
  props: StepperProps,
  ref: React.Ref<HTMLElement> & React.Ref<HTMLDivElement>
): StepperState => {
  const { activeStep, direction, steps, titlePlacement, tagType = 'number', callback, className } = props;
  const innerRef = useRef<HTMLElement>(null);

  const root: StepperState['root'] = slot.always(
    getIntrinsicElementProps('div', {
      ref: useMergedRefs(ref, innerRef.current ? innerRef : undefined) as React.Ref<HTMLDivElement>,
      ...props,
    }),
    { elementType: 'div' }
  );

  const state: StepperState = {
    components: { root: 'div' },
    root,
    className,
    activeStep,
    direction,
    steps,
    titlePlacement,
    tagType,
    callback,
  };

  return state;
};
