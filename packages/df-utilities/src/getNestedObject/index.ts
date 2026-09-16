/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const getNestedObject = <T>(
  obj: any,
  dotDelimitedSelector: string
): T => {
  const parts = dotDelimitedSelector.split(".");
  let current = obj;

  for (const part of parts) {
    current = current[part];
  }

  return current as T;
};
