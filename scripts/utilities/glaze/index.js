const glazeColors = {
  colors: {
    foreground: {
      standard: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
      },
      bright: {
        black: "\x1b[90m",
        red: "\x1b[91m",
        green: "\x1b[92m",
        yellow: "\x1b[93m",
        blue: "\x1b[94m",
        magenta: "\x1b[95m",
        cyan: "\x1b[96m",
        white: "\x1b[97m",
      },
    },
    background: {
      standard: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
      },
      bright: {
        black: "\x1b[100m",
        red: "\x1b[101m",
        green: "\x1b[102m",
        yellow: "\x1b[103m",
        blue: "\x1b[104m",
        magenta: "\x1b[105m",
        cyan: "\x1b[106m",
        white: "\x1b[107m",
      },
    },
  },
  styles: {
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    blink_slow: "\x1b[5m",
    blink_rapid: "\x1b[6m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
    reset_bold_dim: "\x1b[22m",
    reset_italic_fraktur: "\x1b[23m",
    reset_underline: "\x1b[24m",
    reset_blink: "\x1b[25m",
    reset_inverse: "\x1b[27m",
    reset_hidden: "\x1b[28m",
    reset_strikethrough: "\x1b[29m",
  },
  color_256: {
    foreground: {
      format_string: (code) => `\x1b[38;5;${code}m`,
      description:
        "Replace {code} with a number from 0 to 255. The first 16 values (0-15) correspond to the standard and bright colors. Values 16-231 are a 6x6x6 RGB cube, and 232-255 are grayscale.",
    },
    background: {
      format_string: (code) => `\x1b[48;5;${code}m`,
      description:
        "Replace {code} with a number from 0 to 255, similar to foreground.",
    },
  },
  rgb: {
    foreground: {
      format_string: (r, g, b) => `\x1b[38;2;${r};${g};${b}m`,
      description:
        "Replace {r}, {g}, and {b} with red, green, and blue values from 0 to 255.",
    },
    background: {
      format_string: (r, g, b) => `\x1b[48;2;${r};${g};${b}m`,
      description:
        "Replace {r}, {g}, and {b} with red, green, and blue values from 0 to 255.",
    },
  },
  close: "\x1b[0m",
};

class glaze {
  constructor() {
    const { colors } = glazeColors;

    for (const depth in colors) {
      const theDepth = colors[depth];
      for (const level in theDepth) {
        const theLevel = theDepth[level];
        for (const color in theLevel) {
          // const theColor = theLevel[color];

          if (!!this[color]) {
            continue;
          }

          Object.defineProperty(this, `${color}`, {
            enumerable: true,
            writable: false,
            configurable: false,
            value: (str, props) => {
              return this.wrapString(str, {
                color,
                background: false,
                bright: false,
                ...props,
              });
            },
          });
        }
      }
    }

    Object.defineProperty(this, "help", {
      enumerable: true,
      writable: false,
      configurable: false,
      value: (str) => {
        console.log(`Help: VALUE`);
      },
    });
  }

  wrapString(str, props) {
    const { colors, close } = glazeColors;
    const { color, background, bright } = props;
    return `${colors[!background ? "foreground" : "backgorund"][!bright ? "standard" : "bright"][color]}${str}${close}`;
  }
}

const Glaze = new glaze();
module.exports = Glaze;
