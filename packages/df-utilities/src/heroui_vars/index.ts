/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

type HeroUIPrefix = "heroui";

type HerUIGroundsColors = "background" | "foreground";

type HeroUIBaseColors =
  | HerUIGroundsColors
  | "divider"
  | "overlay"
  | "focus"
  | "content1"
  | "content2"
  | "content3"
  | "content4";

type HeroUIBrandColors =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

type HeroUIColorScales =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "foreground";

export type HeroUICSSVariableKey =
  | `${HeroUIPrefix}-${HeroUIBaseColors}`
  | `${HeroUIPrefix}-${HerUIGroundsColors}-${HeroUIColorScales}`
  | `${HeroUIPrefix}-${HeroUIBrandColors}`
  | `${HeroUIPrefix}-${HeroUIBrandColors}-${HeroUIColorScales}`;

export const hslToColor = (varString: HeroUICSSVariableKey): string => {
  return `hsl(${strToVar(varString)})`;
};

export const strToVar = (varString: string): string => {
  return `var(--${varString})`;
};
