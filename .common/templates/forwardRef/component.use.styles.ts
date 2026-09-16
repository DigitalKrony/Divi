/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, mergeClasses } from '@griffel/react';
import { type SlotClassNames } from '@fluentui/react-utilities';

import { type %name.pascal%Slots, type %name.pascal%State } from './%name.pascal%.types';

export const %name.pascal%ClassNames: SlotClassNames<%name.pascal%Slots> = {
  root: 'som-%name.pascal%',
};

/**
 * Styles for the root slot
 */
export const use%name.pascal%Classes = makeStyles({
  root: {},
});

/**
 * Apply styling to the %name.pascal% slots based on the props
 */
export const use%name.pascal%Styles = (props: %name.pascal%State): %name.pascal%State => {
  const styles = use%name.pascal%Classes();

  props.root.className = mergeClasses(%name.pascal%ClassNames.root, styles.root);

  return props;
};
