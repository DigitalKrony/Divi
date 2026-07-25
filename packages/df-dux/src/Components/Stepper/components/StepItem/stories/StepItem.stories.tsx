/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { type Meta, type StoryFn } from '@storybook/react';

import { TitlePlacement } from '../../..';
import { StepItem, Conditions } from '..';
import { type StepItemProps } from '..';

export default {
  title: 'DUX Controls/Stepper/StepItem',
  component: StepItem,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<StepItemProps> = (args: StepItemProps) => {
  return <StepItem {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  title: 'New Item',
  titlePlacement: TitlePlacement.Bottom,
  active: true,
  condition: Conditions.Pending,
  disabled: false,
  callback: () => {
    console.log('clicked');
  },
} as StepItemProps;
Basic.argTypes = {
  titlePlacement: {
    control: 'select',
    options: Object.keys(TitlePlacement).map((key) => (TitlePlacement as any)[key]),
  },
  condition: {
    control: 'select',
    options: Object.keys(Conditions).map((key) => (Conditions as any)[key]),
  },
  active: {
    control: 'boolean',
  },
  tag: {
    control: 'select',
    options: [0, ''],
  },
  as: {
    control: 'select',
  },
};
Basic.parameters = {
  options: {},
};
