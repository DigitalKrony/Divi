/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useEffect, useState } from 'react';
import { Input as HInput, extendVariants } from '@heroui/react';

import { cn, useDebounce } from '@df/utilities';

import type { InputProps } from './Input.types';
import { useInputStyles } from './Input.styles';

const ReInput = extendVariants(HInput, {});
/**
 * Render the final JSX of Input
 */
export const Input: React.FC<InputProps> = (props: InputProps): JSX.Element => {
  const { className, useDebouncer, onValueChange, labelPlacement = 'outside-top' } = props;
  const classes = useInputStyles();
  const [good, setGood] = useState<any>(undefined);
  const theDebounced = useDebounce(good, 500);

  const [comp_props, setComp_props] = useState<Partial<InputProps>>(props);

  useEffect(() => {
    onValueChange && onValueChange(theDebounced);
  }, [theDebounced]);

  useEffect(() => {
    setComp_props(props);
  }, [props]);

  return (
    <ReInput
      {...comp_props}
      labelPlacement={labelPlacement}
      className={cn(classes.root, className)}
      onValueChange={(value: any) => {
        if (useDebouncer) setGood(value);
        else onValueChange && onValueChange(value);
      }}
    />
  );
};
