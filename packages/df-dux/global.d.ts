/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
