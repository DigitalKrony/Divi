/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */
import { useEffect, useState } from "react";
/**
 * Custom hook for debouncing a value
 * @param { any } value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - Debounced value
 */
export const useDebounce = (value, delay) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const bouncer = setTimeout(() => {
            setDebounced(value);
        }, delay);
        return () => clearTimeout(bouncer);
    }, [value, delay]);
    return debounced;
};
