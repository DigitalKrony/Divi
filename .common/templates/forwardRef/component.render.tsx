/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { type JSX } from 'react';
import { assertSlots } from '@fluentui/react-utilities';

import { use%name.pascal%Classes } from './use%name.pascal%.styles';
import { type %name.pascal%Slots, type %name.pascal%State } from './%name.pascal%.types';

/**
 * Render the final JSX of %name.pascal%
 */
export const render%name.pascal% = (state: %name.pascal%State): JSX.Element => {
  const {children} = state;
  assertSlots<%name.pascal%Slots>(state);
  const classes = use%name.pascal%Classes();

  return(
    <state.root>
      <>
        {children}
      </>
    </state.root>
  );
};