/*!
 * Copyright (C) State of Michigan. All rights reserved.
 */

/** @jsxRuntime automatic */
import type { Meta, StoryFn } from '@storybook/react';

import { API } from './../';

export default {
  title: 'Documentation/API',
  component: API,
} as Meta;

const Template: StoryFn<{}> = (args: {}) => {
  return <API {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as {};
Basic.parameters = {
  options: { showPanel: false, bottomPanelHeight: 0 },
};
