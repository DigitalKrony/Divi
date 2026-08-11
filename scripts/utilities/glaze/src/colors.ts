import { GlazeColors, ColorFormatter } from "./glaze.types";

const _fg = `\x1b`;

export const glaze_colors: GlazeColors = {
  colors: {
    foreground: {
      standard: {
        black: `${_fg}[30m`,
        red: `${_fg}[31m`,
        green: `${_fg}[32m`,
        yellow: `${_fg}[33m`,
        blue: `${_fg}[34m`,
        magenta: `${_fg}[35m`,
        cyan: `${_fg}[36m`,
        white: `${_fg}[37m`,
      },
      bright: {
        black: `${_fg}[90m`,
        red: `${_fg}[91m`,
        green: `${_fg}[92m`,
        yellow: `${_fg}[93m`,
        blue: `${_fg}[94m`,
        magenta: `${_fg}[95m`,
        cyan: `${_fg}[96m`,
        white: `${_fg}[97m`,
      },
    },
    background: {
      standard: {
        black: `${_fg}[40m`,
        red: `${_fg}[41m`,
        green: `${_fg}[42m`,
        yellow: `${_fg}[43m`,
        blue: `${_fg}[44m`,
        magenta: `${_fg}[45m`,
        cyan: `${_fg}[46m`,
        white: `${_fg}[47m`,
      },
      bright: {
        black: `${_fg}[100m`,
        red: `${_fg}[101m`,
        green: `${_fg}[102m`,
        yellow: `${_fg}[103m`,
        blue: `${_fg}[104m`,
        magenta: `${_fg}[105m`,
        cyan: `${_fg}[106m`,
        white: `${_fg}[107m`,
      },
    },
  },
  color_256: {
    foreground: {
      format_string: (args: { code?: string }) => `${_fg}[38;5;${args.code}m`,
      description:
        "Replace {code} with a number from 0 to 255. The first 16 values (0-15) correspond to the standard and bright colors. Values 16-231 are a 6x6x6 RGB cube, and 232-255 are grayscale.",
    },
    background: {
      format_string: (args: { code?: string }) => `${_fg}[48;5;${args.code}m`,
      description:
        "Replace {code} with a number from 0 to 255, similar to foreground.",
    },
  },
  rgb: {
    foreground: {
      format_string: (args: { r?: number; g?: number; b?: number }) =>
        `${_fg}[38;2;${args.r};${args.g};${args.b}m`,
      description:
        "Replace {r}, {g}, and {b} with red, green, and blue values from 0 to 255.",
    },
    background: {
      format_string: (args: { r?: number; g?: number; b?: number }) =>
        `${_fg}[48;2;${args.r};${args.g};${args.b}m`,
      description:
        "Replace {r}, {g}, and {b} with red, green, and blue values from 0 to 255.",
    },
  },
  close: `${_fg}[0m`,
};

export const glaze_styles = {
  bold: `${_fg}[1m`,
  dim: `${_fg}[2m`,
  italic: `${_fg}[3m`,
  underline: `${_fg}[4m`,
  blink_slow: `${_fg}[5m`,
  blink_rapid: `${_fg}[6m`,
  inverse: `${_fg}[7m`,
  hidden: `${_fg}[8m`,
  strikethrough: `${_fg}[9m`,
  reset_bold_dim: `${_fg}[22m`,
  reset_italic_fraktur: `${_fg}[23m`,
  reset_underline: `${_fg}[24m`,
  reset_blink: `${_fg}[25m`,
  reset_inverse: `${_fg}[27m`,
  reset_hidden: `${_fg}[28m`,
  reset_strikethrough: `${_fg}[29m`,
};
