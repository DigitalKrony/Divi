/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { ModalFooter as HModalFooter, extendVariants } from '@heroui/react';

import type { ModalFooterProps } from './Modal.types';
import { useModalFooterStyles } from './Modal.styles';

const ReModalFooter = extendVariants(HModalFooter, {});
/**
 * Render the final JSX of ModalFooter
 */
export const ModalFooter: React.FC<ModalFooterProps> = (props: ModalFooterProps): JSX.Element => {
  const { children } = props;
  const styles = useModalFooterStyles();

  return (
    <ReModalFooter {...props} className={styles.root}>
      {children}
    </ReModalFooter>
  );
};
