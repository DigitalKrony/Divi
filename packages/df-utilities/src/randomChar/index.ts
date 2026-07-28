/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const randomChar = (args: { length: number; type?: 'number' | 'hex' | 'alphaNum' }): string => {
  const { length = 3, type = 'number' } = args;

  switch (type) {
    case 'hex':
      const hexChars = '0123456789abcdef';
      let hexResult = '';
      for (let i = 0; i < length; i++) {
        hexResult += hexChars[Math.floor(Math.random() * hexChars.length)];
      }
      return hexResult;
    case 'alphaNum':
      const aNChars = '0123456789abcdefghijklmnopqrstuvwxyz';
      let aNResult = '';
      for (let i = 0; i < length; i++) {
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
