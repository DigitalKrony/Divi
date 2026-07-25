/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const HasChildValue = (arr: { [key: string]: any }[], value: unknown): boolean => {
  for (const i of arr) {
    for (const a in i) {
      if (a) {
        if (i[a] === value) {
          return true;
        }
      }
    }
  }
  return false;
};
