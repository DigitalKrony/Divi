/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { Dispatch, RefObject } from "react";
import type Webcam from "react-webcam";
import type {
  ComponentProps,
  ComponentState,
  Slot,
} from "@fluentui/react-utilities";

export type RecordingState = {
  isRecording: boolean;
  isPaused: boolean;
  recordedChunks: Blob[];
  recordingTime?: number;
};

export type ErrorProps = {
  message: string;
  error: string;
};

/**
 * VideoCaptureSlots
 */
export type VideoCaptureSlots = {
  root: NonNullable<Slot<"div">>;
};

/**
 *  VideoCaptureProps
 */
export type VideoCaptureProps = ComponentProps<VideoCaptureSlots> & {
  webcamOnStart?: boolean;
  videoName?: string;
  className?: string;
  isMirrored?: boolean;
  canPause?: boolean;
  allowFrameCapture?: boolean;
  uploadError?: () => { message: string; error: string };
  uploadSuccessfull?: boolean;
  uploadVideo?: () => void;
  showDownloadButton?: boolean;
  getCapturedVideo?: (vidUrl: any) => void;
};

/**
 * VideoCaptureState
 */
export type VideoCaptureState = ComponentState<VideoCaptureSlots> &
  VideoCaptureProps & {
    fileInputRef: RefObject<HTMLInputElement>;
    videoPreviewRef: RefObject<Webcam>;
    mediaRecorderRef: any;
    devices: MediaDeviceInfo[];
    videoOn: boolean;
    setVideoOn: Dispatch<React.SetStateAction<boolean>>;
    isCloudUploading: boolean;
    setIsCloudUploading: Dispatch<React.SetStateAction<boolean>>;
    uploadSuccess?: boolean;
    setUploadSuccess: Dispatch<React.SetStateAction<boolean | undefined>>;
    setDevices: Dispatch<React.SetStateAction<MediaDeviceInfo[]>>;
    selectedFile?: File;
    setSelectedFile: Dispatch<React.SetStateAction<File | undefined>>;
    previewUrl?: string;
    setPreviewUrl: Dispatch<React.SetStateAction<string | undefined>>;
    previewVideoUrl?: string;
    setPreviewVideoUrl: Dispatch<React.SetStateAction<string | undefined>>;
    error?: ErrorProps;
    setError: Dispatch<React.SetStateAction<ErrorProps | undefined>>;
    recordingState: RecordingState;
    setRecordingState: Dispatch<React.SetStateAction<RecordingState>>;
    handleFileSelect: (event: any) => void;
    handleImageDownload: () => void;
    handleVideoDownload: () => void;
    startCamera: () => void;
    stopCamera: () => void;
    startRecording: () => void;
    stopRecording: () => void;
    pauseRecording: () => void;
    resumeRecording: () => void;
    formatTime: (seconds?: number) => void;
    formatFileSize: (bytes: number) => void;
  };
