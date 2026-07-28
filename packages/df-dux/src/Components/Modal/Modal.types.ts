/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */
import type {
  ModalProps as HModalProps,
  ModalContentProps as HModalContentProps,
  ModalHeaderProps as HModalHeaderProps,
  ModalBodyProps as HModalBodyProps,
  ModalFooterProps as HModalFooterProps,
} from "@heroui/react";

/**
 *  ModalProps
 */
export type ModalProps = React.PropsWithChildren &
  HModalProps & {
    isPresistent?: boolean;
  };

export type ModalContentProps = React.PropsWithChildren &
  HModalContentProps & {};

export type ModalHeaderProps = React.PropsWithChildren & HModalHeaderProps & {};

export type ModalBodyProps = React.PropsWithChildren & HModalBodyProps & {};

export type ModalFooterProps = React.PropsWithChildren & HModalFooterProps & {};
