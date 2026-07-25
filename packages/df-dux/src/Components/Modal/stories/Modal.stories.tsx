/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Modal } from '..';
import type { ModalProps } from '..';

export default {
  title: 'HeroUI Controls/Modal',
  component: Modal,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ModalProps> = (args) => {
  return <Modal {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {} as ModalProps;
Basic.parameters = {
  options: {},
};
