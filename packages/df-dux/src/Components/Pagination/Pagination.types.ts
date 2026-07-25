/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type PaginationProps as HPaginationProps } from '@heroui/react';

/**
 *  PaginationProps
 */
export type PaginationProps = Pick<
  HPaginationProps,
  | 'className'
  | 'size'
  | 'color'
  | 'initialPage'
  | 'siblings'
  | 'boundaries'
  | 'isCompact'
  | 'isDisabled'
  | 'onChange'
> & {
  itemCount?: number;
  itemsDisplayed?: number;
};
