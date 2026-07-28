/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/**
 * Inserts a value into an array at a given index without overwriting.
 * @param {Array} arr - The original array.
 * @param {number} index - The position to insert at (0-based).
 * @param {*} value - The value to insert.
 * @returns {Array} The updated array.
 */

export const pushIndex = (
  arr: Array<any>,
  index: number,
  value: any
): Array<any> => {
  if (index < 0) index = 0;
  if (index > arr.length) index = arr.length;

  arr.splice(index, 0, value);
  return arr;
};
