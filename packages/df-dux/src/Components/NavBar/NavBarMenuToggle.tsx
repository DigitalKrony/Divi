/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { NavbarMenuToggle, extendVariants } from '@heroui/react';

import type { NavBarMenuToggleProps } from './NavBar.types';
import { useNavBarMenuToggleStyles } from './NavBar.styles';

const ReNavbarMenuToggle = extendVariants(NavbarMenuToggle, {});
/**
 * Render the final JSX of NavBarMenuToggle
 */
export const NavBarMenuToggle: React.FC<NavBarMenuToggleProps> = (
  props: NavBarMenuToggleProps
): JSX.Element => {
  const { children } = props;
  const styles = useNavBarMenuToggleStyles();

  return (
    <ReNavbarMenuToggle {...props} className={mergeClasses(styles.root, props.className)}>
      {children || 'COMPONENT "NavBarMenuToggle" READY TO BUILD'}
    </ReNavbarMenuToggle>
  );
};
