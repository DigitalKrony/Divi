/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */
import type { SkeletonProps as HSkeletonProps } from "@heroui/react";

/**
 *  SkeletonProps
 */
export type SkeletonProps = React.PropsWithChildren &
  HSkeletonProps & {
    className?: string;
  };
