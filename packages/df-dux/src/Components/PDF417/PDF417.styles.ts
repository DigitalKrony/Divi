/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles } from '@griffel/react';
import { cn } from '@Utilities';

import { type PDF417Props } from './PDF417.types';

/**
 * Styles for the PDF417 slots
 */
export const getPDF417Styles = makeStyles({
  root: {},
  inputWrapper: {
    cursor: 'default !important',
    userSelect: 'none',
  },
  input: {
    cursor: 'default',
    userSelect: 'none',
  },
});

export const usePDF417SClasses = (props: PDF417Props) => {
  const { className } = props;
  const classes = getPDF417Styles();

  classes.root = cn(classes.root, className);
  classes.input = cn(classes.input);

  return classes;
};
