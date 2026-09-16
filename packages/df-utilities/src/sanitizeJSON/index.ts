/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const SanitizeJSON = (inputString: string) => {
  inputString = inputString.trim();
  if (!inputString.startsWith('{')) {
    inputString = '{' + inputString;
  }
  if (!inputString.endsWith('}')) {
    inputString = inputString + '}';
  }
  inputString = inputString.replace(/'/g, '"');

  const result: Record<string, any> = {};
  const keyValuePairs = inputString.slice(1, -1).split(/,(?![^\[]*\]|[^{]*})/);

  for (const pair of keyValuePairs) {
    const parts = pair.split(/:(.*)/g);
    if (parts.length === 3) {
      const key = parts[0].trim().replace(/^"/, '').replace(/"$/, '');
      let value = parts[1].trim();

      try {
        result[key] = JSON.parse(value);
      } catch (jsonError) {
        if (value === 'true') {
          result[key] = true;
        } else if (value === 'false') {
          result[key] = false;
        } else if (!isNaN(Number(value)) && value !== '') {
          result[key] = Number(value);
        } else if (value.startsWith('"') && value.endsWith('"')) {
          result[key] = value.slice(1, -1);
        } else {
          result[key] = value;
        }
      }
    }
  }

  return result;
};
