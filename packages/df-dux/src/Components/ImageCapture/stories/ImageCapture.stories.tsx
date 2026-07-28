/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { type ImageCaptureProps, ImageCapture } from './..';

export default {
  title: 'DUX Controls/ImageCapture',
  component: ImageCapture,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ImageCaptureProps> = (args) => {
  return <ImageCapture {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  webcamOnStart: false,
  isMirrored: true,
} as ImageCaptureProps;
Basic.argTypes = {
  webcamOnStart: {
    control: 'boolean',
  },
  isMirrored: {
    control: 'boolean',
  },
  as: {
    control: 'select',
  },
};
Basic.parameters = {
  options: {},
};
