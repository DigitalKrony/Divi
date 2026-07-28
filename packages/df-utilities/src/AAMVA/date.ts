/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/**
 * Converts an AAMVA date string into a JavaScript Date object.
 * Handles both "MMDDYYYY" (US Standard) and "YYYYMMDD" (International/Canada) formats.
 * @param {string} dateString - The raw 8-digit date string (e.g., "01011950" or "19500101").
 * @returns {Date|null} - A valid JavaScript Date object (set to local midnight) or null if invalid.
 */
export const parseAAMVADate = (dateString: string) => {
  if (!dateString || dateString.length !== 8 || isNaN(parseInt(dateString))) {
    console.warn(`Invalid AAMVA Date: ${dateString}`);
    return null;
  }

  const prefix = parseInt(dateString.substring(0, 2), 10);
  let year, month, day;

  if (prefix === 19 || prefix === 20) {
    year = parseInt(dateString.substring(0, 4), 10);
    month = parseInt(dateString.substring(4, 6), 10);
    day = parseInt(dateString.substring(6, 8), 10);
  } else {
    month = parseInt(dateString.substring(0, 2), 10);
    day = parseInt(dateString.substring(2, 4), 10);
    year = parseInt(dateString.substring(4, 8), 10);
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  return new Date(year, month - 1, day);
};
