/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type {
  NavbarProps as HNavbarProps,
  NavbarContentProps as HNavbarContentProps,
  NavbarBrandProps as HNavbarBrandProps,
  NavbarItemProps as HNavbarItemProps,
  NavbarMenuProps as HNavbarMenuProps,
  NavbarMenuToggleProps as HNavbarMenuToggleProps,
  NavbarMenuItemProps as HNavbarMenuItemProps,
} from "@heroui/react";

/**
 *  NavBarProps
 */
export type NavBarProps = React.PropsWithChildren &
  HNavbarProps & {
    className?: string;
  };

export type NavBarContentProps = React.PropsWithChildren &
  HNavbarContentProps & {
    className?: string;
  };

export type NavBarBrandProps = React.PropsWithChildren &
  HNavbarBrandProps & {
    className?: string;
  };

export type NavBarItemProps = React.PropsWithChildren &
  HNavbarItemProps & {
    className?: string;
  };

export type NavBarMenuProps = React.PropsWithChildren &
  HNavbarMenuProps & {
    className?: string;
  };

export type NavBarMenuToggleProps = React.PropsWithChildren &
  HNavbarMenuToggleProps & {
    className?: string;
  };

export type NavBarMenuItemProps = React.PropsWithChildren &
  HNavbarMenuItemProps & {
    className?: string;
  };
