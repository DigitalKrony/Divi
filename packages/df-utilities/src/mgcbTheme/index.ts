/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @type {import('tailwindcss').Config} */
import { type LayoutTheme, type ConfigThemes, type BaseThemeUnit, type FontThemeUnit } from '@heroui/theme';

const fontSize: FontThemeUnit = {
  tiny: '11px',
  small: '14px',
  medium: '16px',
  large: '24px',
};

const spacing: BaseThemeUnit = {
  small: '12px',
  medium: '16px',
  large: '24px',
};

const lineHeight: FontThemeUnit = {
  tiny: '.8',
  small: '1',
  medium: '1',
  large: '1.2',
};

const borderWidth: BaseThemeUnit = {
  small: '1px',
  medium: '2px',
  large: '4px',
};

const radius: BaseThemeUnit = {
  small: '1px',
  medium: '2px',
  large: '0',
};

const sharedLayout: LayoutTheme = {
  dividerWeight: '1px',
  disabledOpacity: '60%',
  hoverOpacity: 1,
  fontSize,
  lineHeight,
  borderWidth,
  radius,
};

export const mgcbTheme: ConfigThemes = {
  light: {
    extend: 'light',
    colors: {
      default: {
        100: 'rgba(247, 247, 247)',
        200: 'rgb(224, 224, 225)',
        300: 'rgb(208, 208, 208)',
        400: 'rgb(170, 170, 170)',
        500: 'rgb(153, 153, 153)',
        700: 'rgb(112, 112, 112)',
        800: 'rgb(53, 53, 53)',
        900: 'rgb(22, 22, 24)',
        foreground: 'rgb(22, 22, 24)',
        DEFAULT: 'rgb(208, 208, 208)',
      },
      primary: {
        50: 'rgb(211, 236, 235)',
        100: 'rgb(211, 236, 235)',
        200: 'rgb(174, 216, 214)',
        300: 'rgb(129, 229, 204)',
        400: 'rgb(97, 200, 175)',
        500: 'rgb(97, 200, 175)',
        600: 'rgb(39, 124, 120)',
        700: 'rgb(39, 124, 120)',
        800: 'rgb(23, 95, 92)',
        900: 'rgb(16, 83, 80)',
        foreground: 'rgb(255, 255, 255)',
        DEFAULT: 'rgb(39, 124, 120)',
      },
      secondary: {
        50: 'rgb(234, 241, 244)',
        100: 'rgb(234, 241, 244)',
        200: 'rgb(227, 247, 255)',
        300: 'rgb(197, 219, 227)',
        400: 'rgb(160, 225, 255)',
        500: 'rgb(88, 187, 255)',
        600: 'rgb(0, 119, 167)',
        700: 'rgb(39, 93, 131)',
        800: 'rgb(25, 75, 108)',
        900: 'rgb(20, 45, 62)',
        foreground: 'rgb(224, 224, 225)',
        DEFAULT: 'rgb(20, 45, 62)',
      },
      success: {},
      warning: {},
      danger: {},
      background: {
        50: 'rgb(255, 255, 255)',
        100: 'rgb(224, 224, 225)',
        200: 'rgb(224, 224, 225)',
        300: 'rgb(208, 208, 208)',
        400: 'rgb(170, 170, 170)',
        500: 'rgb(153, 153, 153)',
        600: 'rgb(112, 112, 112)',
        700: 'rgb(112, 112, 112)',
        800: 'rgb(53, 53, 53)',
        900: 'rgb(22, 22, 24)',
        foreground: 'rgb(22, 22, 24)',
        DEFAULT: 'rgb(255, 255, 255)',
      },
      foreground: {
        foreground: 'rgb(22, 22, 24)',
        DEFAULT: 'rgb(22, 22, 24)',
      },
      divider: {
        foreground: 'rgb(22, 22, 24)',
        DEFAULT: 'rgb(208, 208, 208)',
      },
      overlay: {
        foreground: 'rgb(255, 255, 255)',
        DEFAULT: 'rgba(0, 0, 0, .8)',
      },
      focus: {
        foreground: 'rgb(22, 22, 24)',
        DEFAULT: 'rgb(0, 0, 0)',
      },
      content1: {
        foreground: 'rgb(22, 22, 24)',
        DEFAULT: 'rgb(255, 255, 255)',
      },
    },
    layout: {
      ...sharedLayout,
      ...spacing,
      boxShadow: {
        small: '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
        medium: '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
        large: '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  dark: {
    extend: 'dark',
    colors: {
      default: {
        900: 'rgb(247, 247, 247)',
        800: 'rgb(224, 224, 225)',
        700: 'rgb(208, 208, 208)',
        500: 'rgb(170, 170, 170)',
        600: 'rgb(153, 153, 153)',
        300: 'rgb(112, 112, 112)',
        200: 'rgb(53, 53, 53)',
        100: 'rgb(22, 22, 24)',
        foreground: 'rgb(224, 224, 225)',
        DEFAULT: 'rgb(153, 153, 153)',
      },
      primary: {
        50: 'rgb(16, 83, 80)',
        100: 'rgb(16, 83, 80)',
        200: 'rgb(23, 95, 92)',
        300: 'rgb(39, 124, 120)',
        400: 'rgb(97, 200, 175)',
        500: 'rgb(97, 200, 175)',
        600: 'rgb(97, 200, 175)',
        700: 'rgb(97, 200, 175)',
        800: 'rgb(174, 216, 214)',
        900: 'rgb(211, 236, 235)',
        foreground: 'rgb(247, 247, 247)',
        DEFAULT: 'rgb(39, 124, 120)',
      },
      secondary: {
        50: 'rgb(20, 45, 62)',
        100: 'rgb(20, 45, 62)',
        200: 'rgb(25, 75, 108)',
        300: 'rgb(39, 93, 131)',
        400: 'rgb(0, 119, 167)',
        500: 'rgb(88, 187, 255)',
        600: 'rgb(160, 225, 255)',
        700: 'rgb(197, 219, 227)',
        800: 'rgb(227, 247, 255)',
        900: 'rgb(234, 241, 244)',
        foreground: 'rgb(224, 224, 225)',
        DEFAULT: 'rgb(20, 45, 62)',
      },
      success: {},
      warning: {},
      danger: {},
      background: {
        900: 'rgb(247, 247, 247)',
        800: 'rgb(224, 224, 225)',
        700: 'rgb(208, 208, 208)',
        600: 'rgb(170, 170, 170)',
        500: 'rgb(170, 170, 170)',
        400: 'rgb(153, 153, 153)',
        300: 'rgb(112, 112, 112)',
        200: 'rgb(53, 53, 53)',
        100: 'rgb(22, 22, 24)',
        50: 'rgb(0, 0, 0)',
        foreground: 'rgb(224, 224, 225)',
        DEFAULT: 'rgb(22, 22, 24)',
      },
      foreground: {
        foreground: 'rgb(224, 224, 225)',
        DEFAULT: 'rgb(255, 255, 255)',
      },
      divider: {
        foreground: 'rgb(255, 255, 255)',
        DEFAULT: 'rgb(170, 170, 170)',
      },
      overlay: {
        foreground: 'rgb(224, 224, 225)',
        DEFAULT: 'rgba(255, 255, 255, .8)',
      },
      focus: {
        foreground: 'rgb(224, 224, 225)',
        DEFAULT: 'rgb(224, 224, 225)',
      },
      content1: {
        foreground: 'rgb(224, 224, 225)',
        DEFAULT: 'rgb(53, 53, 53)',
      },
    },
    layout: {
      ...sharedLayout,
      ...spacing,
      boxShadow: {
        small: '0px 4px 12px 0px rgba(247, 247, 247, 0.1)',
        medium: '0px 4px 12px 0px rgba(247, 247, 247, 0.1)',
        large: '0px 4px 12px 0px rgba(247, 247, 247, 0.1)',
      },
    },
  },
};
