/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { InterstitialView } from './..';
import type { InterstitialViewProps } from './..';

export default {
  title: 'DUX Controls/InterstitialView',
  component: InterstitialView,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<InterstitialViewProps> = (args) => {
  return <InterstitialView {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as InterstitialViewProps;
Basic.parameters = {
  options: {  },
};
