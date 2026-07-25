/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type InputProps, type SpinnerProps } from '@Components';

/**
 *  PDF417Props
 */
export type PDF417Props = Partial<
  Pick<InputProps, 'size' | 'variant' | 'color' | 'label' | 'onValueChange' | 'placeholder'>
> & {
  className?: string;
  classNames?: {
    root?: string;
    input?: string;
  };
  getInput: (input: HTMLInputElement) => void;
  spinnerProps?: Partial<Pick<SpinnerProps, 'size' | 'variant' | 'color'>>;
};
