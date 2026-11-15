export type CSSDeclarations = Record<string, string>;

export type CssJsonValue =
  | Record<string, never>
  | CSSDeclarations
  | CSSDeclarations[]
  | Record<string, CSSDeclarations>;

export type CssJsonObject = Record<string, CssJsonValue>;
