import { glaze_colors } from "./colors";
import { ColorThemeGroup, ColorGroup, GlazeColors } from "./glaze.types";

class glaze {
  constructor() {
    const { colors } = glaze_colors as GlazeColors;

    for (const depth in colors) {
      const theDepth: ColorThemeGroup = (colors as any)[depth];
      for (const level in theDepth) {
        const theLevel: ColorGroup = (theDepth as any)[level];
        for (const color in theLevel) {
          // const theColor = theLevel[color];

          if (!!(this as any)[color]) {
            continue;
          }

          Object.defineProperty(this, `${color}`, {
            enumerable: true,
            writable: false,
            configurable: false,
            value: (str: string, props: any) => {
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
      value: (str: string) => {
        console.log(`Help: VALUE`);
      },
    });
  }

  wrapString(str: string, props: any) {
    const { colors, close } = glaze_colors;
    const { color, background, bright } = props;
    return `${
      (colors as any)[background ? "background" : "foreground"][
        bright ? "bright" : "standard"
      ]
    }${str}${close}`;
  }
}

const Glaze = new glaze();

module.exports = Glaze;
