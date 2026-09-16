/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const reorderJson = (data: any, descending: boolean = false): any => {
  if (Array.isArray(data)) {
    return data.map((item) => reorderJson(item, descending));
  } else if (data && typeof data === "object") {
    const sortedEntries = Object.entries(data).sort((a, b) => {
      const valA = a[1];
      const valB = b[1];

      if (typeof valA === "number" && typeof valB === "number") {
        return descending ? valB - valA : valA - valB;
      }
      if (typeof valA === "string" && typeof valB === "string") {
        return descending ? valB.localeCompare(valA) : valA.localeCompare(valB);
      }

      return 0;
    });

    const reordered: any = {};
    for (const [key, value] of sortedEntries) {
      reordered[key] = reorderJson(value, descending);
    }
    return reordered;
  }
  return data;
};
