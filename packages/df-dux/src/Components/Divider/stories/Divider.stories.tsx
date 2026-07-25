/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Divider } from '..';
import type { DividerProps } from '..';

export default {
  title: 'HeroUI Controls/Divider',
  component: Divider,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<DividerProps> = (args) => {
  return <Divider {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as DividerProps;
Basic.parameters = {
  options: {},
};
