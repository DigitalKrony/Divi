/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Skeleton } from '..';
import type { SkeletonProps } from '..';

export default {
  title: 'HeroUI Controls/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<SkeletonProps> = (args) => {
  return <Skeleton {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as SkeletonProps;
Basic.parameters = {
  options: {},
};
