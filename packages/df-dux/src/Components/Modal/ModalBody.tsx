/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { ModalBody as HModalBody, extendVariants } from '@heroui/react';

import type { ModalBodyProps } from './Modal.types';
import { useModalBodyStyles } from './Modal.styles';

const ReModalBody = extendVariants(HModalBody, {});
/**
 * Render the final JSX of ModalBody
 */
export const ModalBody: React.FC<ModalBodyProps> = (props: ModalBodyProps): JSX.Element => {
  const { children } = props;
  const styles = useModalBodyStyles();

  return (
    <ReModalBody {...props} className={styles.root}>
      {children}
    </ReModalBody>
  );
};
