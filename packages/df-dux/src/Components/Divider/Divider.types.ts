/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */
import type { DividerProps as HDividerProps } from "@heroui/react";

/**
 *  DividerProps
 */
export type DividerProps = React.PropsWithChildren &
  HDividerProps & {
    className?: string;
  };
