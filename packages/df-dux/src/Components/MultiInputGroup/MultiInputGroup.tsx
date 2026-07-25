/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { forwardRef } from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useMultiInputGroup } from './useMultiInputGroup';
import { renderMultiInputGroup } from './renderMultiInputGroup';
import { useMultiInputGroupStyles } from './useMultiInputGroupStyles';
import type { MultiInputGroupProps } from './MultiInputGroup.types';

export const MultiInputGroup: ForwardRefComponent<MultiInputGroupProps> = forwardRef((props, ref) => {
  const state = useMultiInputGroup(props, ref);
  useMultiInputGroupStyles(state);
  return renderMultiInputGroup(state);
});

MultiInputGroup.displayName = 'MultiInputGroup';
