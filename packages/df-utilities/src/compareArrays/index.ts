/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const compareArrays = (arr1: Array<any>, arr2: Array<any>) =>
  arr1.length === arr2.length && arr1.every((el, index) => el === arr2[index]);
