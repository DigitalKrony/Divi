/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/**
 * Recursively removes null values from a JSON object or array.
 * @param {any} input - The object, array, or primitive to clean.
 * @returns {any} - The cleaned data structure.
 */
export const cleanObject = (input: any): any => {
  if (input === null || typeof input !== "object") {
    return input;
  }

  if (Array.isArray(input)) {
    return input
      .map((item: any) => cleanObject(item))
      .filter((item: any) => item !== null);
  }

  return Object.keys(input).reduce((acc, key) => {
    const value = input[key];

    if (value !== null) {
      acc[key] = cleanObject(value);
    }

    return acc;
  }, {});
};
