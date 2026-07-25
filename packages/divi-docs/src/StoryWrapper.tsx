/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { type FC, type PropsWithChildren } from "react";
import { BrowserRouter as Router } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import { mergeClasses, makeStyles } from "@griffel/react";

import { isDark } from "@df/utilities";
import "@df/dux/index.css";

import { SchemeToggle } from "./SchemeToggle";

const useStyles = makeStyles({
  storyWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  storyHeader: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "stretch",
    borderBottom: "1px solid rgb(30, 30, 30)",
  },
  childWrapper: {
    padding: "12px",
  },
});

export const StoryWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={mergeClasses(classes.storyWrapper)}>
      <Router>
        <HeroUIProvider>
          <div className={mergeClasses(classes.storyHeader, "story-header")}>
            <SchemeToggle />
          </div>
          <div
            className={mergeClasses(
              classes.childWrapper,
              isDark() ? "dark" : "light",
              "text-foreground",
              "bg-background",
            )}
          >
            {children}
          </div>
        </HeroUIProvider>
      </Router>
    </div>
  );
};
