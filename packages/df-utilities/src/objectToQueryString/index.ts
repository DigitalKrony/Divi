/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const objectToQueryString = (params: any) => {
  const searchParams = new URLSearchParams();

  if (typeof params !== "object" || params === null) {
    throw new TypeError("Input must be a non-null object");
  }

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, String(item)));
    } else {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
};
