/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { Link as HLink, extendVariants } from '@heroui/react';

import { type LinkProps } from './Link.types';
import { useLinkStyles } from './Link.styles';

const ReLink = extendVariants(HLink, {});
/**
 * Render the final JSX of Link
 */
export const Link: React.FC<LinkProps> = (props: LinkProps): JSX.Element => {
  const styles = useLinkStyles();

  return <ReLink {...props} className={mergeClasses(styles.root, props.className)} />;
};
