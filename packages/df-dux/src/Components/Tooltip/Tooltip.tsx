/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useRef, useState } from 'react';
import { mergeClasses } from '@griffel/react';
import { Tooltip as HTooltip, extendVariants } from '@heroui/react';

import { type TooltipProps } from './Tooltip.types';
import { useTooltipStyles } from './Tooltip.styles';

const ReTooltip = extendVariants(HTooltip, {});
/**
 * Render the final JSX of Tooltip
 */
export const Tooltip: React.FC<TooltipProps> = (props: TooltipProps): JSX.Element => {
  const {
    children,
    delay = 500,
    closeDelay = 1000,
    radius = 'none',
    size = 'md',
    offset = 12,
    color = 'foreground',
    placement = 'bottom-start',
    showArrow = false,
    shouldFlip = true,
    classNames,
    onOpenChange,
    onClose,
  } = props;
  const styles = useTooltipStyles();
  const tipRef = useRef(null);
  const [arrowPosition, setArrowPosition] = useState('');

  const cn = classNames
    ? {
        base: mergeClasses(styles.base, classNames.base as string),
        content: mergeClasses(styles.content, classNames.content as string),
        arrow: mergeClasses(styles.arrow, classNames.arrow as string),
      }
    : {
        base: mergeClasses(styles.base, styles[`base_${size}`]),
        content: styles.content,
        arrow: styles.arrow,
      };

  return (
    <ReTooltip
      ref={tipRef}
      size={size}
      color={color}
      delay={delay}
      closeDelay={closeDelay}
      radius={radius}
      offset={offset}
      placement={placement}
      showArrow={showArrow}
      shouldFlip={shouldFlip}
      {...props}
      classNames={cn}
      onOpenChange={(isOpen: boolean) => {
        if (isOpen) {
          //
        }

        onOpenChange && onOpenChange(isOpen);
      }}
      onClose={() => {
        onClose && onClose();
      }}
    >
      {children}
    </ReTooltip>
  );
};
