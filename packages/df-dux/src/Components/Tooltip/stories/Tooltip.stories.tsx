/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { type Meta, type StoryFn } from '@storybook/react';
import { Button } from '@Components';
import { type TooltipProps, Tooltip } from './..';

export default {
  title: 'HeroUI Controls/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<TooltipProps> = (args) => {
  return (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  content: 'This is a tooltip',
  placement: 'bottom',
  size: 'md',
} as TooltipProps;
Basic.argTypes = {
  content: {
    type: 'string',
  },
  placement: {
    type: 'string',
    defautl: 'bottom',
    control: 'select',
    options: [
      'top-start',
      'top',
      'top-end',
      'bottom-start',
      'bottom',
      'bottom-end',
      'left-start',
      'left',
      'left-end',
      'right-start',
      'right',
      'right-end',
    ],
  },
  size: {
    type: 'string',
    default: 'md',
    control: 'select',
    options: ['sm', 'md', 'lg'],
  },
};
Basic.parameters = {
  options: {},
};
