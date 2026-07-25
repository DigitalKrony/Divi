/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { randomChar } from '../randomChar';

export const createHexKey = (args: { lengths: number[]; delimiter?: string }): string => {
  const { lengths, delimiter = '-' } = args;
  let stringToReturn = '';

  for (const [index, value] of lengths.entries()) {
    stringToReturn +=
      randomChar({ length: value, type: 'hex' }) + (lengths.length > index + 1 ? delimiter : '');
  }

  return stringToReturn;
};
