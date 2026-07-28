/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import {
  getIntrinsicElementProps,
  slot,
  useMergedRefs,
} from "@fluentui/react-utilities";
import type Webcam from "react-webcam";

import type {
  VideoCaptureProps,
  VideoCaptureState,
  RecordingState,
} from "./VideoCapture.types";

/**
 * Create the state required to render  VideoCapture.
 *
 * The returned state can be modified with hooks such as use VideoCaptureStyles,
 * before being passed to render VideoCapture.
 *
 * @param props - props from this instance of VideoCapture
 * @param ref - reference to root HTMLElement of VideoCapture
 */
export const useVideoCapture = (
  props: VideoCaptureProps,
  ref: React.Ref<HTMLElement> & React.Ref<HTMLDivElement>
): VideoCaptureState => {
  const {
    videoName,
    webcamOnStart,
    getCapturedVideo = (vid) => {},
    uploadError,
    uploadSuccessfull,
    allowFrameCapture = true,
    isMirrored = true,
    canPause = false,
    showDownloadButton = false,
  } = props;
  const innerRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPreviewRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Visual States
  const [videoOn, setVideoOn] = useState(webcamOnStart || false);
  const [isCloudUploading, setIsCloudUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>(
    undefined
  );

  // Video States
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<
    { message: string; error: string } | undefined
  >(undefined);
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    recordingTime: undefined,
    recordedChunks: [],
  });

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setPreviewVideoUrl(url);
      setSelectedFile(file);
      getCapturedVideo(file);

      setPreviewUrl(undefined);
      setError(undefined);
      setUploadSuccess(false);
    } else {
      setError({
        message: "Please select a valid video file",
        error: "Please select a valid video file",
      });
    }
  };

  const startCamera = () => {
    setPreviewUrl(undefined);
    setPreviewVideoUrl(undefined);
    setVideoOn(true);
    setError(undefined);
  };

  const stopCamera = () => {
    setPreviewUrl(undefined);
    setPreviewVideoUrl(undefined);
    setVideoOn(false);
    setError(undefined);
  };

  const startRecording = useCallback(() => {
    setRecordingState({
      ...recordingState,
      isRecording: true,
      isPaused: false,
      recordingTime: 0,
    });

    mediaRecorderRef.current = new MediaRecorder(
      (videoPreviewRef.current as any).stream,
      {
        mimeType: "video/mp4",
      }
    );

    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [videoPreviewRef, mediaRecorderRef, setRecordingState]);

  const stopRecording = useCallback(() => {
    const { current } = mediaRecorderRef;

    current && current.stop();

    setRecordingState({
      ...recordingState,
      isRecording: false,
      isPaused: false,
      recordingTime: undefined,
    });
  }, [mediaRecorderRef, recordingState, setRecordingState]);

  const pauseRecording = () => {};

  const resumeRecording = () => {};

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  const handleDataAvailable = useCallback(
    ({ data }: { data: Blob }) => {
      if (data.size > 0) {
        setRecordingState((prev) => ({
          ...prev,
          recordedChunks: prev.recordedChunks.concat(data),
        }));
      }
    },
    [setRecordingState]
  );

  const handleVideoDownload = useCallback(() => {
    const { recordedChunks } = recordingState;

    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4",
      });

      const url = URL.createObjectURL(blob);
      const today = new Date();
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = videoName ? `${videoName}.mp4` : `interview-recording.mp4`;
      a.click();
      window.URL.revokeObjectURL(url);

      setRecordingState((prev) => ({
        ...prev,
        recordedChunks: [],
      }));
    }
  }, [recordingState]);

  const handleImageDownload = useCallback(async () => {
    const today = new Date();

    if (!previewUrl) return;

    const response = await fetch(previewUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `interview-picture-${today.getFullYear()}${padTo2Digits(
      today.getMonth() + 1
    )}${padTo2Digits(today.getDate())}_${padTo2Digits(
      today.getHours()
    )}-${padTo2Digits(today.getMinutes())}-${padTo2Digits(
      today.getSeconds()
    )}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [previewUrl, setPreviewUrl]);

  const resetCloudUpload = () => {};

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  const formatTime = (seconds?: number) => {
    if (!seconds) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  useEffect(() => {
    const { recordingTime, isRecording, recordedChunks } = recordingState;
    let timer: any;

    if (recordingState.isRecording) {
      timer = setInterval(() => {
        setRecordingState({
          ...recordingState,
          recordingTime: (recordingTime ?? 0) + 1,
        });
      }, 1000);
    } else if (!isRecording && !!recordingTime && recordingTime > 0) {
      clearInterval(timer);
    } else if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4",
      });
      const file = new File([blob], `captured-video.mp4`, {
        type: "video/mp4",
      });
      getCapturedVideo(file);
    }

    return () => {
      clearInterval(timer);
    };
  }, [recordingState]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    setError(uploadError);

    // TODO: Set prop for auto close one success /  with timeout?
  }, [uploadError]);

  useEffect(() => {
    setUploadSuccess(uploadSuccessfull);
  }, [uploadSuccessfull]);

  const root: VideoCaptureState["root"] = slot.always(
    getIntrinsicElementProps("div", {
      ref: useMergedRefs(
        ref,
        innerRef.current ? innerRef : undefined
      ) as React.Ref<HTMLDivElement>,
      ...props,
    }),
    { elementType: "div" }
  );

  const state: VideoCaptureState = {
    components: { root: "div" },
    root,
    fileInputRef: fileInputRef as RefObject<HTMLInputElement>,
    videoPreviewRef: videoPreviewRef as RefObject<Webcam>,
    mediaRecorderRef,
    isMirrored,
    canPause,
    allowFrameCapture,
    showDownloadButton,
    videoOn,
    setVideoOn,
    isCloudUploading,
    setIsCloudUploading,
    uploadSuccess,
    setUploadSuccess,
    devices,
    setDevices,
    setSelectedFile,
    previewUrl,
    setPreviewUrl,
    previewVideoUrl,
    setPreviewVideoUrl,
    error,
    setError,
    recordingState,
    setRecordingState,
    handleFileSelect,
    handleImageDownload,
    handleVideoDownload,
    startCamera,
    stopCamera,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    formatTime,
    formatFileSize,
  };

  return state;
};
