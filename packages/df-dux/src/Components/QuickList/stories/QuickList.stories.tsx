/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { QuickList } from './..';
import type { QuickListProps } from './..';

export default {
  title: 'HeroUI Controls/QuickList',
  component: QuickList,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<QuickListProps> = (args) => {
  return <QuickList {...args} items={['Item 1', 'Item 2', 'Item 3']} />;
};

export const Basic = Template.bind({});
Basic.args = {} as QuickListProps;
Basic.parameters = {
  options: {  },
};
