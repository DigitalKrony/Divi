/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { extendVariants, Button as HButton } from '@heroui/react';

import type { ButtonProps } from './Button.types';
import { useButtonStyles } from './Button.styles';

export const ReButton = extendVariants(HButton, {});

/**
 * Render the final JSX of Button
 */
export const Button: React.FC<ButtonProps> = (props: ButtonProps): JSX.Element => {
  const { children, variant, color = 'default', className } = props;
  const styles = useButtonStyles();

  return (
    <ReButton {...props} disableRipple className={mergeClasses(styles.root, className)}>
      {children}
    </ReButton>
  );
};
