/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { InputProps as HInputProps } from "@heroui/react";

/**
 *  InputProps
 */
export type InputProps = React.PropsWithChildren &
  HInputProps & {
    className?: string;
    useDebouncer?: boolean;
  };
