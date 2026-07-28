/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Pagination } from './..';
import type { PaginationProps } from './..';

export default {
  title: 'HeroUI Controls/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<PaginationProps> = (args) => {
  return <Pagination {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  initialPage: 1,
  itemCount: 423,
  itemsDisplayed: 20,
  size: 'md',
  isDisabled: false,
  isCompact: false,
  disableAnimation: false,
  showShadow: false,
  disableCursorAnimation: false,
} as PaginationProps;
Basic.argTypes = {
  size: {
    control: 'select',
  },
};
Basic.parameters = {
  options: {},
};
