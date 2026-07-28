/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { NavbarItem, extendVariants } from '@heroui/react';

import type { NavBarItemProps } from './NavBar.types';
import { useNavBarItemStyles } from './NavBar.styles';

const ReNavbarItem = extendVariants(NavbarItem, {});
/**
 * Render the final JSX of NavBarItem
 */
export const NavBarItem: React.FC<NavBarItemProps> = (props: NavBarItemProps): JSX.Element => {
  const { children } = props;
  const styles = useNavBarItemStyles();

  return (
    <ReNavbarItem {...props} className={mergeClasses(styles.root, props.className)}>
      {children || 'COMPONENT "NavBarItem" READY TO BUILD'}
    </ReNavbarItem>
  );
};
