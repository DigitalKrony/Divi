/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { Skeleton as HSkeleton, extendVariants } from '@heroui/react';

import type { SkeletonProps } from './Skeleton.types';
import { useSkeletonStyles } from './Skeleton.styles';

const ReSkeleton = extendVariants(HSkeleton, {});
/**
 * Render the final JSX of Skeleton
 */
export const Skeleton: React.FC<SkeletonProps> = (props: SkeletonProps): JSX.Element => {
  const { children } = props;
  const styles = useSkeletonStyles();

  return (
    <ReSkeleton {...props} className={styles.root}>
      {children || 'COMPONENT "Skeleton" READY TO BUILD'}
    </ReSkeleton>
  );
};
