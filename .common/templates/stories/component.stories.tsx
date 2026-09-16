/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { type JSX, useState } from 'react';
import { type Meta, type StoryFn } from '@storybook/react';

import { type %name.pascal%Props, %name.pascal% } from './../';

export default {
  title: 'Components/%name.pascal%',
  component: %name.pascal%,
  subcomponents: {  },
  tags: ['autodocs'],
} as Meta;

/* eslint-disable-next-line no-unused-vars */// @ts-ignore
const Template: StoryFn<%name.pascal%Props> = (args: any) => {
  return (
    <%name.pascal% />
  );
};

export const Default = Template.bind({});
Default.args = {} as %name.pascal%Props;
Default.argTypes = {
};

Default.parameters = {
  options: {},
};
