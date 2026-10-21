/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export enum CaseTypes {
  snake,
  hyphen,
  camel,
  pascal,
  capitalizeFirstLetter
}

export const Case = (str: string, type?: CaseTypes): string => {
  switch (type) {
    case CaseTypes.snake:
      return str.toLowerCase().replace(/[\s\.\-]/gi, '_');
    case CaseTypes.hyphen:
      return str.toLowerCase().replace(/[\s\.\_]/gi, '-');
    case CaseTypes.camel:
      const toReturn = str.replace(/^([A-Z]|[a-z])|[\s\.\-\_]/gi, data => {
        return data
          .replace(/[(\-|\_|\.)]/gi, '')
          .trim()
          .toUpperCase();
      });
      return toReturn.charAt(0).toLowerCase() + toReturn.slice(1);
    case CaseTypes.pascal:
      return str.replace(/^([A-Z]|[a-z])|[\s\.\-\_]/gi, data => {
        return data
          .replace(/[(\-|\_|\.)]/gi, '')
          .trim()
          .toUpperCase();
      });
    case CaseTypes.capitalizeFirstLetter:
      return str.charAt(0).toUpperCase() + str.slice(1);
    default:
      return str.toLowerCase().replace(/[\_\.\-]/gi, ' ');
  }
}

export const CaseGroup = (str: string) => {
  return {
    snake: Case(str, CaseTypes.snake),
    hyphen: Case(str, CaseTypes.hyphen),
    camel: Case(str, CaseTypes.camel),
    pascal: Case(str, CaseTypes.pascal),
    original: str
  };
}
