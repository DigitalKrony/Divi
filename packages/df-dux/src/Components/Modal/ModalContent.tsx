/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { ModalContent as HModalContent, extendVariants } from '@heroui/react';

import type { ModalContentProps } from './Modal.types';
import { useModalContentStyles } from './Modal.styles';

const ReModalContent = extendVariants(HModalContent, {});
/**
 * Render the final JSX of ModalContent
 */
export const ModalContent: React.FC<ModalContentProps> = (props: ModalContentProps): JSX.Element => {
  const { children } = props;
  const styles = useModalContentStyles();

  const onClose = () => {};

  return (
    <ReModalContent {...props} className={styles.root}>
      {children}
    </ReModalContent>
  );
};
