/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type SelectProps } from '@Components';

/**
 *  StateSelectionProps
 */
export type StateSelectionProps = Partial<
  Pick<
    SelectProps,
    'size' | 'color' | 'label' | 'labelPlacement' | 'variant' | 'onSelectionChange' | 'isRequired'
  >
> & {
  className?: string;
  readOnly?: boolean;
  defaultSelection?: string;
  onChange?: (value?: string) => void;
};
