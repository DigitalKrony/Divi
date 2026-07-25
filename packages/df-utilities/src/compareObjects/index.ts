/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const compareObjects = (objA: Object, objB: Object) => {
  const normalize = (obj: Object) => JSON.stringify(Object.entries(obj).sort());
  if (!objA || !objB) return !objA && !objB;
  return normalize(objA) === normalize(objB);
};
