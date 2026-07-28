/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { DirectionEnum } from '@df/utilities';

import { Stepper, TitlePlacement, type StepperProps } from '..';
import { StepItem } from './../components';

export default {
  title: 'DUX Controls/Stepper',
  component: Stepper,
  subcomponents: { StepItem },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<StepperProps> = (args) => {
  return <Stepper {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  titlePlacement: TitlePlacement.Bottom,
  tagType: 'number',
  steps: [
    {
      title: 'New Step',
      condition: 'pending',
    },
    {
      title: 'New Step',
      condition: 'pending',
    },
    {
      title: 'New Step',
      condition: 'pending',
    },
    {
      title: 'New Step',
      condition: 'pending',
    },
  ],
  direction: 'horizontal',
  callback: (activeItem) => {
    console.log('Active Step: ', activeItem + 1);
  },
} as StepperProps;
Basic.argTypes = {
  tagType: {
    control: 'select',
  },
  activeStep: {
    control: 'number',
  },
  direction: {
    control: 'select',
    default: 'horizontal',
    options: Object.keys(DirectionEnum).map((key) => (DirectionEnum as any)[key]),
  },
  as: {
    control: 'select',
  },
};
Basic.parameters = {
  options: {},
};
