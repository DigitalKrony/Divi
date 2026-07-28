/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { Navbar, extendVariants } from '@heroui/react';

import { mergeJSON } from '@df/utilities';

import type { NavBarProps } from './NavBar.types';
import { useNavBarStyles } from './NavBar.styles';

const ReNavbar = extendVariants(Navbar, {});
/**
 * Render the final JSX of NavBar
 */
export const NavBar: React.FC<NavBarProps> = (props: NavBarProps): JSX.Element => {
  const { children } = props;
  const styles = useNavBarStyles();

  return (
    <ReNavbar
      {...props}
      maxWidth={'full'}
      classNames={mergeJSON(
        {
          base: [styles.root],
          wrapper: ['px-0'],
        },
        props.classNames
      )}
    >
      {children || 'COMPONENT "NavBar" READY TO BUILD'}
    </ReNavbar>
  );
};
