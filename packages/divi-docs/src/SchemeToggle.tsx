/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { type FC, type PropsWithChildren, useState } from "react";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import { isDark } from "@df/utilities";

/**
 * Styles for the Card slots
 */
const useStyles = makeStyles({
  wrapper: {
    height: "24px",
  },
  visuallyHidden: {
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    border: 0,
    padding: 0,
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    margin: "-1px",
  },
  label: {
    width: "auto",
    minWidth: "8em",
    display: "inline-block",
    position: "relative",
    margin: 0,
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
    lineHeight: 1.5,
    textIndent: "-9999px",
    verticalAlign: "baseline",
    transition: "all 200ms",
    userSelect: "none",
    "::before": {
      content: '""',
      display: "inline-block",
      transition: "all 200ms",
      width: "2.5rem",
      height: "1.5rem",
      margin: " 0 0 0 .5em",
      float: "right",
      verticalAlign: "baseline",
      lineHeight: 1,
      borderRadius: "4rem",
      background: "orange",
      boxShadow: "inset 0 1px 5px rgba(0, 0, 0,0.25)",
    },
    "::after": {
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0,0,0,0.25), 0 0 8px rgba(255,165,0,0.25)",
      width: "1.5rem",
      height: "1.5rem",
      textAlign: "center",
      border: "2px solid rgba(255,255,255,0.35)",
      content: '""',
      display: "inline-block",
      borderRadius: "2rem",
      position: "absolute",
      right: "1rem",
      lineHeight: 1,
      transition: "all 200ms",
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23ffa500'%3E%3Crect y='11' width='3' height='2'%3E%3C/rect%3E %3Crect x='3.575' y='3.075' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -1.8951 4.5752)' width='2' height='3'%3E%3C/rect%3E %3Crect x='11' width='2' height='3'%3E%3C/rect%3E %3Crect x='17.925' y='3.575' transform='matrix(0.7071 -0.7071 0.7071 0.7071 2.4542 15.0755)' width='3' height='2'%3E%3C/rect%3E %3Crect x='21' y='11' width='3' height='2'%3E%3C/rect%3E %3Crect x='18.425' y='17.925' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -8.046 19.4248)' width='2' height='3'%3E%3C/rect%3E %3Crect x='11' y='21' width='2' height='3'%3E%3C/rect%3E %3Crect x='3.075' y='18.425' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -12.3954 8.9245)' width='3' height='2'%3E%3C/rect%3E %3Ccircle fill='%23ffa500' cx='12' cy='12' r='7'%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")`,
      backgroundPosition: "center center",
      backgroundSize: ".75rem",
      backgroundRepeat: "no-repeat",
    },
  },
  toggle: {
    cursor: "pointer",
    transition: "all 200ms",
    fontSize: "1em",
    lineHeight: 1,
    textAlign: "left",
    margin: 0,
    padding: 0,
    ":checked + label": {
      "::before": {
        backgroundColor: "darkslateblue",
        boxShadow: "inset 0 3px 5px rgba(0, 0, 0,0.5)",
      },
      "::after": {
        right: 0,
        ...shorthands.borderColor("rgba(255, 255, 255, 0.125)"),
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg fill='%23181970'%3E%3Cpath fill='%23181970' d='M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
  },
});

export const SchemeToggle: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const classes = useStyles();
  const html = document.documentElement as HTMLElement;

  const [isLoaded, setIsLoaded] = useState(false);
  const [colorScheme, setColorScheme] = useState(isDark());

  const changeColorScheme = (event?: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event !== undefined ? event?.target.checked : colorScheme;

    switch (isChecked) {
      case false:
        setColorScheme(false);
        html.style.setProperty("color-scheme", "light");
        localStorage.setItem("color-scheme", "light");
        const darkClasses = document.querySelectorAll("html.dark, div.dark");
        darkClasses?.forEach((ele) => {
          ele.classList.remove("dark");
        });
        darkClasses?.forEach((ele) => {
          ele.classList.add("light");
        });
        break;
      case true:
      default:
        setColorScheme(true);
        html.style.setProperty("color-scheme", "dark");
        localStorage.setItem("color-scheme", "dark");
        const ligthClasses = document.querySelectorAll("html.light, div.light");
        ligthClasses?.forEach((ele) => {
          ele.classList.remove("light");
        });
        ligthClasses?.forEach((ele) => {
          ele.classList.add("dark");
        });
        break;
    }
  };

  if (!isLoaded) {
    setIsLoaded(true);
    changeColorScheme();
  }

  return (
    <div className={classes.wrapper}>
      <input
        type="checkbox"
        title="color-scheme-switch"
        id="color-scheme-switch"
        className={mergeClasses(classes.toggle, classes.visuallyHidden)}
        aria-checked="false"
        onChange={changeColorScheme}
        checked={colorScheme}
      />
      <label
        title="Color Scheme"
        htmlFor="color-scheme-switch"
        className={mergeClasses(classes.label)}
      >
        Theme Switcher
      </label>
    </div>
  );
};
