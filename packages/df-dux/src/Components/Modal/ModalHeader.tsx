/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { ModalHeader as HModalHeader, extendVariants } from '@heroui/react';

import type { ModalHeaderProps } from './Modal.types';
import { useModalHeaderStyles } from './Modal.styles';

const ReModalHeader = extendVariants(HModalHeader, {});
/**
 * Render the final JSX of ModalHeader
 */
export const ModalHeader: React.FC<ModalHeaderProps> = (props: ModalHeaderProps): JSX.Element => {
  const { children } = props;
  const styles = useModalHeaderStyles();

  return (
    <ReModalHeader {...props} className={styles.root}>
      {children}
    </ReModalHeader>
  );
};
