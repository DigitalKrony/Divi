/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Link } from '..';
import type { LinkProps } from '..';

export default {
  title: 'HeroUI Controls/Link',
  component: Link,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<LinkProps> = (args) => {
  return <Link {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as LinkProps;
Basic.parameters = {
  options: {},
};
