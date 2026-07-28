/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const JSONMerge = (obj1: any, obj2: any) => {
  for (const p in obj2) {
    try {
      if (obj2[p].constructor === Object) {
        obj1[p] = JSONMerge(obj1[p], obj2[p]);
      } else {
        if (obj1[p] === obj2[p]) {
          delete obj1[p];
        } else {
          obj1[p] = obj2[p];
        }
      }
    } catch (e) {
      obj1[p] = obj2[p];
    }
  }

  return obj1;
};
