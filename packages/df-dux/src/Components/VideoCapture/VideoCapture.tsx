/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { forwardRef } from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useVideoCapture } from './useVideoCapture';
import { renderVideoCapture } from './renderVideoCapture';
import { useVideoCaptureStyles } from './useVideoCaptureStyles';
import type { VideoCaptureProps } from './VideoCapture.types';

export const VideoCapture: ForwardRefComponent<VideoCaptureProps> = forwardRef((props, ref) => {
  const state = useVideoCapture(props, ref);
  useVideoCaptureStyles(state);
  return renderVideoCapture(state);
});

VideoCapture.displayName = 'VideoCapture';
