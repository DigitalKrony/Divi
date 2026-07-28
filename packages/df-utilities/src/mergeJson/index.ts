/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const mergeJSON = (target: any, source: any) => {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      target[key] = mergeJSON(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
};
