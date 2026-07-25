/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { useEffect, useState } from 'react';
import type { JSX, ReactElement } from 'react';
import { assertSlots } from '@fluentui/react-utilities';

import { StepItem } from '@Components/Stepper';
import type { StepperContextValues, StepperSlots, StepperState } from './Stepper.types';
import { StepperContext } from './StepperContext';

/**
 * Render the final JSX of  Stepper
 */
export const renderStepper = (state: StepperState, contextValues: StepperContextValues): JSX.Element => {
  assertSlots<StepperSlots>(state);
  const { activeStep, steps, titlePlacement, tagType, callback } = state;
  const [stepItems, setStepItems] = useState<ReactElement<any, any>[]>([]);
  const [activeItem, setActiveItem] = useState(activeStep);

  const buildStepItems = () => {
    const theSteps: JSX.Element[] = [];

    steps.forEach((v, i, a) => {
      theSteps.push(
        <StepItem
          {...v}
          key={`item-${i}-${i === activeItem}`}
          titlePlacement={titlePlacement}
          tag={tagType === 'number' ? i + 1 : String.fromCharCode(64 + (i + 1))}
          active={i === activeItem}
          callback={() => {
            setActiveItem(i);
            v.callback && v.callback(i);
            callback && callback(i);
          }}
        />
      );
    });

    setStepItems(theSteps);
  };

  useEffect(() => {
    setActiveItem(activeStep);
    buildStepItems();
  }, [activeItem, activeStep, steps]);

  return (
    <StepperContext.Provider value={contextValues.stepper}>
      <state.root>{stepItems}</state.root>
    </StepperContext.Provider>
  );
};
