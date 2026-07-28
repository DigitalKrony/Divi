/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { NavbarContent, extendVariants } from '@heroui/react';

import type { NavBarContentProps } from './NavBar.types';
import { useNavBarContentStyles } from './NavBar.styles';

const ReNavbarContent = extendVariants(NavbarContent, {});
/**
 * Render the final JSX of NavBarContent
 */
export const NavBarContent: React.FC<NavBarContentProps> = (props: NavBarContentProps): JSX.Element => {
  const { children } = props;
  const styles = useNavBarContentStyles();

  return (
    <ReNavbarContent {...props} className={mergeClasses(styles.root, props.className)}>
      {children || 'COMPONENT "NavBarContent" READY TO BUILD'}
    </ReNavbarContent>
  );
};
