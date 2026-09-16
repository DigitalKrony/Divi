/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type ComponentProps, type ComponentState, type Slot } from '@fluentui/react-utilities';

/**
 * %name.pascal%Slots
 */
export type %name.pascal%Slots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 *  %name.pascal%Props
 */
export type %name.pascal%Props = ComponentProps<%name.pascal%Slots> & {
  id?: string;
  className?: string;
};

/**
 * %name.pascal%State
 */
export type %name.pascal%State = ComponentState<%name.pascal%Slots> &
  %name.pascal%Props & {
  isLoaded?: boolean;
};
