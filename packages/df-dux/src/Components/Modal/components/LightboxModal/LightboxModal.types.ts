/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { type ComponentState, type Slot } from '@fluentui/react-utilities';

export interface LightboxModalProps {
  isDev?: boolean;
  isOpen: boolean;
  header: string;
  children?: ReactNode;
  onClose: () => void;
  onPrimaryAction?: () => void;
  primaryLabel?: string;
  isPrimaryEnabled: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export type LightboxModalSlots = {
  root: NonNullable<Slot<'div'>>;
  header?: Slot<'div'>;
  body?: Slot<'div'>;
  footer?: Slot<'div'>;
};

export type LightboxModalState = ComponentState<LightboxModalSlots> &
  LightboxModalProps & {
    isCommentsModal: boolean;
    setIsCommentsModal: Dispatch<SetStateAction<boolean>>;
    handleScannerShow: (vis: boolean) => void;
  };
