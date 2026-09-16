/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const RandomInt = (args: { length: number; type?: 'number' | 'hex' | 'alphaNum' }): string => {
  const { length = 3, type = 'number' } = args;

  switch (type) {
    case 'hex':
      const hexChars = '0123456789abcdef';
      let hexResult = '';
      for (let i = 0;i < length;i++) {
        hexResult += hexChars[Math.floor(Math.random() * hexChars.length)];
      }
      return hexResult;
    case 'alphaNum':
      const aNChars = '0123456789abcdefghijklmnopqrstuvwxyz';
      let aNResult = '';
      for (let i = 0;i < length;i++) {
        aNResult += aNChars[Math.floor(Math.random() * aNChars.length)];
      }
      return aNResult;
    case 'number':
    default:
      const min: number = Math.pow(10, length - 1);
      const max: number = Math.pow(10, length) - 1;
      return `${Math.floor(Math.random() * (max - min + 1)) + min}`;
  }
};

/**
 * Get UniqueId so as to avoid id conflict between multiple fields bind to same attribute
 * @param context The "Input Properties" containing the parameters, control metadata and interface functions.
 * @param passInString input string as suffix
 * @param RandomInt random integer
 * @returns a string of uniqueId includes attribute logicalname + passIn specialized string + random Integer
 */
export const CreateUniqueId = (args: {
  packagePrefix?: string;
  componentName?: string;
  delimiter?: string;
  enumerateWithHex?: boolean;
  RandomIntProps?: {
    length: number;
  };
}): string => {
  const {
    packagePrefix,
    componentName,
    enumerateWithHex = false,
    RandomIntProps = { length: 6 },
    delimiter = '__',
  } = args;

  let idEnumerator: string | number;

  if (enumerateWithHex) {
    idEnumerator = RandomInt({ length: RandomIntProps.length, type: 'hex' });
  } else {
    idEnumerator = RandomInt({ length: RandomIntProps.length });
  }

  return `${!!packagePrefix ? packagePrefix : ''}${!!packagePrefix ? delimiter : ''}${!!componentName ? componentName : ''}${!!componentName ? delimiter : ''}${idEnumerator}`;
};

export const CreateHexKey = (args?: { lengths: number[]; delimiter?: string }): string => {
  const { lengths, delimiter = '-' } = args!;
  let stringToReturn = '';

  for (const [index, value] of lengths.entries()) {
    stringToReturn +=
      RandomInt({ length: value, type: 'hex' }) + (lengths.length > index + 1 ? delimiter : '');
  }

  return stringToReturn;
};
