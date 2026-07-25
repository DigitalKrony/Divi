/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { SizeEnum, ColorsEnum, PlacementEnum, VarientEnum_Button } from '@df/utilities';

import { Button } from '..';
import type { ButtonProps } from '..';

export default {
  title: 'HeroUI Controls/Button',
  component: Button,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => {
  return (
    <>
      <div>
        <Button {...args}>{args.children || 'New Button'}</Button>
      </div>
      <br />
      <div>
        <Button color={'primary'}>Primary</Button> &emsp;
        <Button color={'secondary'}>Secondary</Button> &emsp;
        <Button color={'default'}>Deafult</Button>
      </div>
    </>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  children: 'New Button',
  size: 'md',
  color: 'primary',
  variant: 'solid',
  isDisabled: false,
} as ButtonProps;

Basic.argTypes = {
  children: {
    type: 'string',
    control: 'text',
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
    default: 'primary',
    control: 'select',
    options: Object.keys(ColorsEnum).map((key) => (ColorsEnum as any)[key]),
  },
  variant: {
    description: '',
    type: 'string',
    default: 'solid',
    control: 'select',
    options: Object.keys(VarientEnum_Button).map((key) => (VarientEnum_Button as any)[key]),
  },
  isDisabled: {
    type: 'boolean',
  },
  className: {
    description: 'ClassName applied to the root element of the control',
    type: 'string',
    default: 'root',
    control: 'text',
  },
  as: {
    type: 'string',
    control: 'select',
    options: ['button', 'a'],
  },
};

Basic.parameters = {
  options: { showPanel: false },
};
