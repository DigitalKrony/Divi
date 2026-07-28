/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Modal as HModal, extendVariants, cn } from '@heroui/react';

import type { ModalProps } from './Modal.types';
import { useModalStyles } from './Modal.styles';

const ReModal = extendVariants(HModal, {});
/**
 * Render the final JSX of Modal
 */
export const Modal: React.FC<ModalProps> = (props: ModalProps): JSX.Element => {
  const styles = useModalStyles();
  const { children, isOpen, isPresistent = false } = props;

  const visibilityClasses = isPresistent
    ? {
        backdrop: !isOpen && cn('hidden', 'invisible'),
        wrapper: !isOpen && cn('hidden', 'invisible'),
      }
    : {};

  return (
    <ReModal
      {...props}
      className={styles.root}
      isOpen={isPresistent ? true : isOpen}
      classNames={visibilityClasses}
    >
      {children}
    </ReModal>
  );
};
