/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Input } from '..';
import type { InputProps } from '..';

export default {
  title: 'HeroUI Controls/Input',
  component: Input,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<InputProps> = (args) => {
  return <Input {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as InputProps;
Basic.parameters = {
  options: {},
};
