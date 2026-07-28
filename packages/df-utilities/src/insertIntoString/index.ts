/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/**
 * Inserts a value into an array at a given index without overwriting.
 * @param {string} str - The original string.
 * @param {number | Array<number>} index - The position to insert at (0-based).
 * @param {string} subStr - The sub-string to insert.
 * @returns {string} The updated string.
 */

export const insertIntoString = (
  str: string,
  index: number | Array<number>,
  subStr: string
): string | undefined => {
  if (!!!str) return undefined;

  if (typeof index === "object") {
    const reverseIndex = index.reverse();
    let toRet = str;

    for (let i = 0; i < reverseIndex.length; i++) {
      toRet = insertIntoString(toRet, reverseIndex[i], subStr) || str;
    }

    return toRet;
  }

  return str.substring(0, index) + subStr + str.substring(index);
};
