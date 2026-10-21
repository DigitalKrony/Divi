/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export function SortBy<T>(objArray: T[], property: string, nullValue?: string | number) {
  const jsonSort = (prop: string) => {
    return (a: T, b: T) => {
      // @ts-ignore-next-line
      const argA = a[prop] || nullValue;
      // @ts-ignore-next-line
      const argB = b[prop] || nullValue;

      if (argA > argB) {
        return 1;
      } else if (argA < argB) {
        return -1;
      }
      return 0;
    };
  };

  objArray.sort(jsonSort(property));

  return objArray;
}
