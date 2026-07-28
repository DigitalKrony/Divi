/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { SizeEnum, ColorsEnum, PlacementEnum, VarientEnum_Inputs } from '@df/utilities';

import { StateSelection } from './..';
import type { StateSelectionProps } from './..';

export default {
  title: 'DUX Controls/Address/StateSelection',
  component: StateSelection,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<StateSelectionProps> = (args) => {
  return <StateSelection {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Pick your state',
  size: 'md',
  color: 'default',
  variant: 'flat',
  labelPlacement: 'inside',
} as StateSelectionProps;
Basic.argTypes = {
  className: {
    description: 'ClassName applied to the root element of the control',
    type: 'string',
    default: 'root',
    control: 'text',
  },
  label: {
    description: `Lable for the group of inputs.`,
    type: 'string',
    default: undefined,
    control: 'text',
  },
  labelPlacement: {
    description: 'Position of the input labels',
    type: 'string',
    default: 'outside',
    control: 'select',
    options: Object.keys(PlacementEnum).map((key) => (PlacementEnum as any)[key]),
  },
  size: {
    description: `Visual size of the input components.`,
    type: 'string',
    default: 'md',
    control: 'select',
    options: Object.keys(SizeEnum).map((key) => (SizeEnum as any)[key]),
  },
  color: {
    description: 'Color of the inputs',
    type: 'string',
    default: 'default',
    control: 'select',
    options: Object.keys(ColorsEnum).map((key) => (ColorsEnum as any)[key]),
  },
  variant: {
    description: '',
    type: 'string',
    default: 'flat',
    control: 'select',
    options: Object.keys(VarientEnum_Inputs).map((key) => (VarientEnum_Inputs as any)[key]),
  },
};
Basic.parameters = {
  options: {},
};
