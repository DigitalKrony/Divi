/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useEffect } from 'react';
import { cn } from '@Utilities';

import { type TypographyProps } from './Typography.types';
import { useTypographyStyles } from './Typography.styles';

/**
 * Render the final JSX of Typography
 */
export const Text: React.FC<TypographyProps> = (props: TypographyProps): JSX.Element => {
  const { children, className, as, color, size, weight, isDisplay, isRequired = false } = props;
  const AS = as || 'p';
  const classes = useTypographyStyles();
  const typeClasses: Array<string> = [];

  if (!!isDisplay && isDisplay > 0) {
    typeClasses.push('font-bold');
    switch (isDisplay) {
      case 4:
        typeClasses.push('text-xl');
        break;
      case 3:
        typeClasses.push('text-2xl');
        break;
      case 2:
        typeClasses.push('text-3xl');
        break;
      case 1:
      default:
        typeClasses.push('text-4xl');
        break;
    }
  } else if (!!as && as[0] === 'h') {
    typeClasses.push('font-semibold');
  } else {
    typeClasses.push('font-normal');
  }

  switch (as) {
    case 'h1':
    case 'h2':
      typeClasses.push('fg-secondary');
    case 'h3':
      typeClasses.push('text-secondary');
      !isDisplay && typeClasses.push('text-lg');
      break;
    case 'h4':
    case 'h5':
    case 'h6':
      !isDisplay && typeClasses.push('text-sm');
      break;
  }

  if (!!size && size !== 'base') typeClasses.push(`text-${size}`);
  if (!!weight && weight !== 'normal') typeClasses.push(`font-${weight}`);
  if (!!color && color !== 'default') typeClasses.push(`text-${color}`);

  useEffect(() => {
    //
  }, [isRequired]);
  return (
    <AS className={cn(classes.root, cn(typeClasses), className)}>
      {children} {isRequired && <span className={classes.star}>*</span>}
    </AS>
  );
};
