/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getIntrinsicElementProps,
  slot,
  useMergedRefs,
} from "@fluentui/react-utilities";

import type {
  ImageCaptureProps,
  ImageCaptureState,
} from "./ImageCapture.types";

/**
 * Create the state required to render  ImageCapture.
 *
 * The returned state can be modified with hooks such as use ImageCaptureStyles,
 * before being passed to render ImageCapture.
 *
 * @param props - props from this instance of ImageCapture
 * @param ref - reference to root HTMLElement of ImageCapture
 */
export const useImageCapture = (
  props: ImageCaptureProps,
  ref: React.Ref<HTMLElement> & React.Ref<HTMLDivElement>
): ImageCaptureState => {
  const {
    webcamOnStart,
    getCapturedImage = (img) => {},
    uploadError,
    uploadSuccessfull,
    uploadPhoto,
    imageName,
    isMirrored = true,
  } = props;

  // Element Refs
  const innerRef = useRef<HTMLElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Visual States
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [takePhoto, setTakePhoto] = useState<boolean | undefined>(
    webcamOnStart || false
  );
  const [isUploading, setIsUploading] = useState<boolean | undefined>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>(
    undefined
  );
  const [countdown, setCountdown] = useState<number | undefined>(undefined);

  // Photo States
  const [selectedFile, setSelectedFile] = useState<any | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<
    { message: string; error: string } | undefined
  >(undefined);

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
      getCapturedImage(file);

      setError(undefined);
      setUploadSuccess(false);
    } else {
      setError({
        message: "Please select a valid image file",
        error: "Please select a valid image file",
      });
    }
  };

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  const startCamera = () => {
    setTakePhoto(true);
    setCountdown(undefined);
    setError(undefined);
  };

  const stopCamera = () => {
    setTakePhoto(false);
    setCountdown(undefined);
    setError(undefined);
  };

  const capturePhoto = async () => {
    const imageSrc = (webcamRef.current as any).getScreenshot();

    if (imageSrc) {
      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File(
          [blob],
          `${imageName}.jpeg` || `captured-photo.jpeg`,
          {
            type: "image/jpeg",
          }
        );

        setSelectedFile(file);
        setPreviewUrl(imageSrc);
        getCapturedImage(file);

        setCountdown(undefined);
        setError(undefined);
        setUploadSuccess(undefined);
        setTakePhoto(false);
      } catch (error) {
        setError({
          message: "Failed to capture photo. Please try again.",
          error: `Capture error: ${error}`,
        });
      }
    } else {
      setError({
        message: "Unable to capture photo. Please ensure camera is working.",
        error: "Unable to capture photo. Please ensure camera is working.",
      });
    }
  };

  const clearSelection = () => {
    setSelectedFile(undefined);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(undefined);
    }
    setUploadSuccess(false);
    setError(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Countdown effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!!!countdown) return () => {};

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((prev: any) => {
          if (prev <= 1) {
            capturePhoto();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [countdown]);

  useEffect(() => {
    if (error !== undefined) {
      console.error(error.error);
    }
  }, [setError]);

  useEffect(() => {
    setError(uploadError);

    // TODO: Set prop for auto close one success /  with timeout?
  }, [uploadError]);

  useEffect(() => {
    setUploadSuccess(uploadSuccessfull);
  }, [uploadSuccessfull]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const root: ImageCaptureState["root"] = slot.always(
    getIntrinsicElementProps("div", {
      ref: useMergedRefs(
        ref,
        innerRef.current ? innerRef : undefined
      ) as React.Ref<HTMLDivElement>,
      ...props,
    }),
    { elementType: "div" }
  );

  const state: ImageCaptureState = {
    components: { root: "div" },
    root,
    webcamRef,
    fileInputRef,

    devices,
    isMirrored,

    error,
    setError,

    countdown,
    setCountdown,

    takePhoto,
    setTakePhoto,

    isUploading,
    setIsUploading,

    uploadSuccess,
    setUploadSuccess,

    previewUrl,
    setPreviewUrl,

    selectedFile,

    handleFileSelect,
    startCamera,
    stopCamera,

    uploadPhoto,

    clearSelection,
  };

  return state;
};
