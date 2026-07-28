/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { NavbarMenu, extendVariants } from '@heroui/react';

import type { NavBarMenuProps } from './NavBar.types';
import { useNavBarMenuStyles } from './NavBar.styles';

const ReNavbarMenu = extendVariants(NavbarMenu, {});
/**
 * Render the final JSX of NavBarMenu
 */
export const NavBarMenu: React.FC<NavBarMenuProps> = (props: NavBarMenuProps): JSX.Element => {
  const { children } = props;
  const styles = useNavBarMenuStyles();

  return (
    <ReNavbarMenu {...props} className={mergeClasses(styles.root, props.className)}>
      {children || 'COMPONENT "NavBarMenu" READY TO BUILD'}
    </ReNavbarMenu>
  );
};
