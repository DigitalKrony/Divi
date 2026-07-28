/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { forwardRef } from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useImageCapture } from './useImageCapture';
import { renderImageCapture } from './renderImageCapture';
import { useImageCaptureStyles } from './useImageCaptureStyles';
import type { ImageCaptureProps } from './ImageCapture.types';

export const ImageCapture: ForwardRefComponent<ImageCaptureProps> = forwardRef((props, ref) => {
  const state = useImageCapture(props, ref);
  useImageCaptureStyles(state);
  return renderImageCapture(state);
});

ImageCapture.displayName = 'ImageCapture';
