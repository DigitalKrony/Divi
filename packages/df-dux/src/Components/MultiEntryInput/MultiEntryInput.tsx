/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { forwardRef } from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useMultiEntryInput } from './useMultiEntryInput';
import { renderMultiEntryInput } from './renderMultiEntryInput';
import { useMultiEntryInputStyles } from './useMultiEntryInputStyles';
import type { MultiEntryInputProps } from './MultiEntryInput.types';

export const MultiEntryInput: ForwardRefComponent<MultiEntryInputProps> = forwardRef((props, ref) => {
  const state = useMultiEntryInput(props, ref);
  useMultiEntryInputStyles(state);
  return renderMultiEntryInput(state);
});

MultiEntryInput.displayName = 'MultiEntryInput';
