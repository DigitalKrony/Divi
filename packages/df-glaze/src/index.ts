import { glaze_colors } from "./colors";
import type {
  ColorGroup,
  ColorThemeGroup,
  GlazeColorName,
  GlazeFormatOptions,
  GlazeInstance,
  GlazeOptions,
} from "./glaze.types";

class glaze {
  constructor() {
    const { colors } = glaze_colors;

    for (const depth in colors) {
      const theDepth: ColorThemeGroup = (colors as any)[depth];
      for (const level in theDepth) {
        const theLevel: ColorGroup = (theDepth as any)[level];
        for (const color in theLevel) {
          if (!!(this as any)[color]) {
            continue;
          }

          Object.defineProperty(this, `${color}`, {
            enumerable: true,
            writable: false,
            configurable: false,
            value: (str: string, props: GlazeOptions = {}) => {
              return this.wrapString(str, {
                color: color as GlazeColorName,
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

  wrapString(str: string, props: GlazeFormatOptions): string {
    const { colors, close } = glaze_colors;
    const { color, background, bright } = props;

    return `${
      (colors as any)[background ? "background" : "foreground"][
        bright ? "bright" : "standard"
      ][color]
    }${str}${close}`;
  
  }
}

const Glaze = new glaze() as GlazeInstance;

export = Glaze;
