/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';
import { Link } from '@heroui/react';
import { Button } from '@Components/Button';

import { NavBar, NavBarContent, NavBarItem, NavBarBrand } from '..';
import type { NavBarProps } from '..';

const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default {
  title: 'HeroUI Controls/NavBar',
  component: NavBar,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<NavBarProps> = (args) => {
  return (
    <NavBar>
      <NavBarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavBarBrand>
      <NavBarContent className="hidden sm:flex gap-4" justify="center">
        <NavBarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavBarItem>
        <NavBarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavBarItem>
        <NavBarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavBarItem>
      </NavBarContent>
      <NavBarContent justify="end">
        <NavBarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavBarItem>
        <NavBarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavBarItem>
      </NavBarContent>
    </NavBar>
  );
};

export const Basic = Template.bind({});
Basic.args = {} as NavBarProps;
Basic.parameters = {
  options: {},
};
