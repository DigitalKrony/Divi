/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { NavbarMenuItem, extendVariants } from '@heroui/react';

import type { NavBarMenuItemProps } from './NavBar.types';
import { useNavBarMenuItemStyles } from './NavBar.styles';

const ReNavbarMenuItem = extendVariants(NavbarMenuItem, {});
/**
 * Render the final JSX of NavBarMenuItem
 */
export const NavBarMenuItem: React.FC<NavBarMenuItemProps> = (props: NavBarMenuItemProps): JSX.Element => {
  const { children } = props;
  const styles = useNavBarMenuItemStyles();

  return (
    <ReNavbarMenuItem {...props} className={mergeClasses(styles.root, props.className)}>
      {children || 'COMPONENT "NavBarMenuItem" READY TO BUILD'}
    </ReNavbarMenuItem>
  );
};
