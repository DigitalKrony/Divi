/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { ComponentShowcase } from './../ComponentShowcase';
import type { ComponentShowcaseProps } from './../ComponentShowcase.types';

export default {
  title: 'Documentation/ComponentShowcase',
  component: ComponentShowcase,
} as Meta;

const Template: StoryFn<ComponentShowcaseProps> = (args: ComponentShowcaseProps) => {
  return <ComponentShowcase {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as ComponentShowcaseProps;
Basic.parameters = {
  options: { showPanel: false, bottomPanelHeight: 0 },
};
