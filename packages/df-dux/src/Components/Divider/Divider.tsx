/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { Divider as HDivider, extendVariants } from '@heroui/react';

import type { DividerProps } from './Divider.types';
import { useDividerStyles } from './Divider.styles';

const ReDivider = extendVariants(HDivider, {});
/**
 * Render the final JSX of Divider
 */
export const Divider: React.FC<DividerProps> = (props: DividerProps): JSX.Element => {
  const styles = useDividerStyles();

  return <ReDivider {...props} {...props} className={mergeClasses(styles.root, props.className)} />;
};
