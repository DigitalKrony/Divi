/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type InputProps } from '@Components';

export interface StateDto {
  stateAbbr: string;
}

export interface CompleteAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string | StateDto;
  zipCode?: string;
  country?: string;
}

/**
 *  AddressProps
 */
export type AddressProps = {} & Partial<
  Pick<InputProps, 'size' | 'color' | 'variant' | 'label' | 'labelPlacement'>
> & {
    id?: string;
    className?: string;
    readOnly?: boolean;
    isItValid?: (isit: boolean) => void;
    defaultValues?: CompleteAddress;
    onValueChange?: (value: CompleteAddress) => void;
    onChange?: (event: Event) => void;
    isRequired: boolean;
  };
