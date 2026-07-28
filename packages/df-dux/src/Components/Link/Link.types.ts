/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */
import type { LinkProps as HLinkProps } from "@heroui/react";

/**
 *  LinkProps
 */
export type LinkProps = React.PropsWithChildren &
  HLinkProps & {
    className?: string;
  };
