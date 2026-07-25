/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { VideoCapture } from './..';
import type { VideoCaptureProps } from './..';

export default {
  title: 'DUX Controls/VideoCapture',
  component: VideoCapture,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<VideoCaptureProps> = (args) => {
  return <VideoCapture {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  webcamOnStart: false,
  isMirrored: true,
  canPause: false,
  allowFrameCapture: true,
  uploadSuccessfull: false,
  showDownloadButton: false,
  as: 'div',
} as VideoCaptureProps;
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
