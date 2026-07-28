/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export enum TypographyElements {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  P = "p",
  B = "b",
  STRONG = "strong",
  EM = "em",
  MARK = "mark",
  SMALL = "small",
  DEL = "del",
  INS = "ins",
  SUB = "sub",
  SUP = "sup",
  SPAN = "span",
  DIV = "div",
}

export enum TypographyColors {
  DEFAULT = "default",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}

export enum TypographySizes {
  EXTRA_SMALL = "xs",
  SMALL = "sm",
  MEDIUM = "md",
  DEFAULT = "base",
  LARGE = "lg",
  EXTRA_LARGE = "xl",
}

export enum TypographyWeight {
  LIGHT = "light",
  MEDIUM = "normal",
  NORMAL = "normal",
  SEMI_BOLD = "semibold",
  BOLD = "bold",
  EXTRA_BOLD = "extrabold",
}

/**
 *  TypographyProps
 */
export type TypographyProps = React.PropsWithChildren & {
  className?: string;
  as?: TypographyElements | `${TypographyElements}`;
  color?: TypographyColors | `${TypographyColors}`;
  size?: TypographySizes | `${TypographySizes}`;
  weight?: TypographyWeight | `${TypographyWeight}`;
  isDisplay?: false | 1 | 2 | 3 | 4;
  isRequired?: boolean;
};
