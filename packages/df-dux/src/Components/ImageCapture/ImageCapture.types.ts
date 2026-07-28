/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { Dispatch, SetStateAction, RefObject } from "react";
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from "@fluentui/react-utilities";
export type ErrorProps = {
  message: string;
  error: string;
};

/**
 * ImageCaptureSlots
 */
export type ImageCaptureSlots = {
  root: NonNullable<Slot<"div">>;
};

/**
 *  ImageCaptureProps
 */
export interface ImageCaptureProps extends ComponentProps<ImageCaptureSlots> {
  webcamOnStart?: boolean;
  className?: string;
  imageName?: string;
  isMirrored?: boolean;
  uploadError?: () => { message: string; error: string };
  uploadSuccessfull?: boolean;
  uploadPhoto?: () => void;
  getCapturedImage?: (imgUrl: any) => void;
}

/**
 * ImageCaptureState
 */
export type ImageCaptureState = ComponentState<ImageCaptureSlots> &
  Omit<ImageCaptureProps, "getCapturedImage"> & {
    webcamRef: RefObject<any | null>;
    fileInputRef?: RefObject<HTMLInputElement | null>;
    devices: MediaDeviceInfo[];
    error?: ErrorProps;
    setError: Dispatch<SetStateAction<ErrorProps | undefined>>;
    countdown?: number;
    setCountdown: Dispatch<SetStateAction<number | undefined>>;
    takePhoto?: boolean;
    setTakePhoto: Dispatch<SetStateAction<boolean | undefined>>;
    isUploading?: boolean;
    setIsUploading: Dispatch<SetStateAction<boolean | undefined>>;
    uploadSuccess?: boolean;
    setUploadSuccess: Dispatch<SetStateAction<boolean | undefined>>;
    previewUrl?: string;
    setPreviewUrl: Dispatch<SetStateAction<string | undefined>>;
    startCamera?: () => void;
    stopCamera?: () => void;
    handleFileSelect?: (event: any) => void;
    clearSelection?: () => void;
    selectedFile?: File;
  };
