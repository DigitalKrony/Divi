/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { forwardRef } from 'react';
import { type ForwardRefComponent } from '@fluentui/react-utilities';

import { use%name.pascal% } from './use%name.pascal%';
import { render%name.pascal% } from './render%name.pascal%';
import { use%name.pascal%Styles } from './use%name.pascal%.styles';
import { type %name.pascal%Props, type %name.pascal%State } from './%name.pascal%.types';

export const %name.pascal%: ForwardRefComponent<%name.pascal%Props> = forwardRef((props, ref) => {
  const state: %name.pascal%State = use%name.pascal%(props, ref) as %name.pascal%State;
  use%name.pascal%Styles(state);
  return render%name.pascal%(state);
});

%name.pascal%.displayName = '%name.pascal%';