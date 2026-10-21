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
