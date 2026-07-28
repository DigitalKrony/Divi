/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '@Components';

import { MultiInputGroup } from '..';
import type { MultiInputGroupProps } from '..';

export default {
  title: 'DUX Controls/MultiInputGroup',
  component: MultiInputGroup,
  subcomponents: { Button },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<MultiInputGroupProps> = (args) => {
  return <MultiInputGroup {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Group Title',
  color: 'default',
  size: 'sm',
  variant: 'flat',
  radius: 'none',
  inputSchema: [
    { type: 'text', label: 'Name' },
    { type: 'text', label: 'Position' },
    { type: 'text', label: 'Notes' },
  ],
  areDeleatable: true,
  canAdd: true,
  isDisabled: false,
  initialGroupCount: 2,
  requiredGroupCount: 1,
} as MultiInputGroupProps;
Basic.argTypes = {
  canAdd: {
    control: 'boolean',
  },
  areDeleatable: {
    control: 'boolean',
  },
  isDisabled: {
    control: 'boolean',
  },
  initialGroupCount: {
    control: 'number',
  },
  requiredGroupCount: {
    control: 'number',
  },
  size: {
    control: 'select',
  },
  color: {
    control: 'select',
    options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
  },
  variant: {
    control: 'select',
    options: ['flat', 'bordered', 'faded', 'underlined'],
  },
  radius: {
    control: 'select',
  },
  labelPlacement: {
    control: 'select',
  },
  fullWidth: {
    control: 'boolean',
  },
  disableAnimation: {
    control: 'boolean',
  },
  className: {
    control: 'text',
  },
  as: {
    control: 'select',
  },
};
Basic.parameters = {
  options: {},
};
