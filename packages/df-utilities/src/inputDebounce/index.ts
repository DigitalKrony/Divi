/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/**
 * @param fn <(value: any) => void> The Function to be called after time delay runs down without reset.
 * @param delay <Number> Delay timer in milliseconds.
 * @returns <(...args) => void> Function to apply as a proxy for the `fn` property.
 */
export const inputDebounce = (fn: Function, delay: number = 300) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
