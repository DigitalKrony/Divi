/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { mergeClasses } from '@griffel/react';
import { NavbarBrand, extendVariants } from '@heroui/react';

import type { NavBarBrandProps } from './NavBar.types';
import { useNavBarBrandStyles } from './NavBar.styles';

const ReNavbarBrand = extendVariants(NavbarBrand, {});
/**
 * Render the final JSX of NavBar
 */
export const NavBarBrand: React.FC<NavBarBrandProps> = (props: NavBarBrandProps): JSX.Element => {
  const { children } = props;
  const styles = useNavBarBrandStyles();

  return (
    <ReNavbarBrand {...props} className={mergeClasses(styles.root, props.className)}>
      {children || 'COMPONENT "NavBar" READY TO BUILD'}
    </ReNavbarBrand>
  );
};
