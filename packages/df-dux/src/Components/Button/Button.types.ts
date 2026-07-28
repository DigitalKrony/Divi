/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */
import type { ButtonProps as HButtonProps } from "@heroui/react";

/**
 *  ButtonProps
 */
export type ButtonProps = React.PropsWithChildren &
  HButtonProps & {
    className?: string;
  };
