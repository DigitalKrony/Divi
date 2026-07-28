/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */
import { type TooltipProps as HTooltipProps } from '@heroui/react';

/**
 *  TooltipProps
 */
export type TooltipProps = React.PropsWithChildren &
  HTooltipProps & {
    className?: string;
  };
