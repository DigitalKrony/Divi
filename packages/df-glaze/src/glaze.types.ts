export interface Color {
  [key: string]: string;
}

export type ColorFormatter = {
  format_string: (args: {
    r?: number;
    g?: number;
    b?: number;
    code?: string;
  }) => string;
  description: string;
};

export interface ColorGroup {
  standard: Color;
  bright: Color;
}

export interface ColorThemeGroup {
  foreground: ColorGroup | ColorFormatter;
  background: ColorGroup | ColorFormatter;
}

export interface GlazeColors {
  colors: ColorThemeGroup;
  color_256: ColorThemeGroup;
  rgb: ColorThemeGroup;
  close: string;
}

export type GlazeColorName =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

export interface GlazeOptions {
  color?: GlazeColorName;
  background?: boolean;
  bright?: boolean;
}

export interface GlazeFormatOptions extends GlazeOptions {
  color: GlazeColorName;
}

export type GlazeColorMethod = (
  str: string,
  options?: GlazeOptions
) => string;

export type GlazeInstance = {
  readonly [color in GlazeColorName]: GlazeColorMethod;
} & {
  readonly help: (str: string) => void;
  wrapString: (str: string, options: GlazeFormatOptions) => string;
};
