/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const isDark = () => {
  const storeKey = "color-scheme";
  const localStoreScheme = localStorage.getItem(storeKey);
  const localPrefers = localStoreScheme === "dark";
  const systemPrefers = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const schemeSet = localStoreScheme !== null ? localPrefers : false;

  if (!!!localStoreScheme) {
    localStorage.setItem(storeKey, schemeSet ? "dark" : "light");
  }

  return schemeSet;
};
