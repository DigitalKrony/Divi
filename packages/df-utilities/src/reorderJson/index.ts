/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const reorderJson = (data: any, descending: boolean = false): any => {
  if (Array.isArray(data)) {
    return data.map((item) => reorderJson(item, descending));
  } else if (data && typeof data === "object") {
    // Sort child keys by their values if all values are primitive
    const sortedEntries = Object.entries(data).sort((a, b) => {
      const valA = a[1];
      const valB = b[1];

      // If both values are numbers or strings, compare them
      if (typeof valA === "number" && typeof valB === "number") {
        return descending ? valB - valA : valA - valB;
      }
      if (typeof valA === "string" && typeof valB === "string") {
        return descending ? valB.localeCompare(valA) : valA.localeCompare(valB);
      }
      // Keep original order if incomparable
      return 0;
    });

    // Rebuild object with sorted keys
    const reordered: any = {};
    for (const [key, value] of sortedEntries) {
      reordered[key] = reorderJson(value, descending);
    }
    return reordered;
  }
  return data; // Primitive value
};
