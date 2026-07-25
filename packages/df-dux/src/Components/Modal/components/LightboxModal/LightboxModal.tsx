/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX } from 'react';

import { Button, Modal, ModalHeader, ModalContent, ModalBody, ModalFooter } from '@df/dux/Components';
import { cn } from '@Utilities';

import { useLightboxModalStyles } from './LightboxModal.styles';
import { type LightboxModalProps } from './LightboxModal.types';

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isDev = false,
  isOpen,
  header,
  children,
  onClose,
  onPrimaryAction,
  isPrimaryEnabled,
  primaryLabel = 'Save',
  size = '2xl',
}): JSX.Element => {
  const styles = useLightboxModalStyles();

  return (
    <Modal
      key="custom-modal"
      isOpen={isOpen}
      size={size}
      isDismissable
      onClose={onClose}
      classNames={{ footer: cn('justify-between') }}
      hideCloseButton={true}
    >
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>Close</Button>
          {onPrimaryAction && (
            <Button color="primary" onPress={onPrimaryAction} isDisabled={!!!isPrimaryEnabled}>
              {primaryLabel}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
