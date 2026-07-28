/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { randomChar } from '../randomChar';

/**
 * Get UniqueId so as to avoid id conflict between multiple fields bind to same attribute
 * @param context The "Input Properties" containing the parameters, control metadata and interface functions.
 * @param passInString input string as suffix
 * @param randomChar random integer
 * @returns a string of uniqueId includes attribute logicalname + passIn specialized string + random Integer
 */
export const createUniqueId = (args: {
  packagePrefix?: string;
  componentName?: string;
  delimiter?: string;
  enumerateWithHex?: boolean;
  randomCharProps?: {
    length: number;
  };
}): string => {
  const {
    packagePrefix,
    componentName,
    enumerateWithHex = false,
    randomCharProps = { length: 6 },
    delimiter = '__',
  } = args;

  let idEnumerator: string | number;

  if (enumerateWithHex) {
    idEnumerator = randomChar({ length: randomCharProps.length, type: 'hex' });
  } else {
    idEnumerator = randomChar({ length: randomCharProps.length });
  }

  return `${!!packagePrefix ? packagePrefix : ''}${!!packagePrefix ? delimiter : ''}${!!componentName ? componentName : ''}${!!componentName ? delimiter : ''}${idEnumerator}`;
};
