/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type { JSX } from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import {
  Pause,
  StopFilledAlt,
  PauseFuture,
  RecordingFilledAlt,
  VideoOff,
  VideoAdd,
  CloudUpload,
  Aperture,
  Close,
  Download,
} from '@carbon/icons-react';
import Webcam from 'react-webcam';
import { cn } from '@heroui/react';

import { Button, Chip, Input } from '@Components';

import { useVideoCaptureClasses } from './useVideoCaptureStyles';
import type { VideoCaptureSlots, VideoCaptureState } from './VideoCapture.types';

/**
 * Render the final JSX of VideoCapture
 */
export const renderVideoCapture = (state: VideoCaptureState): JSX.Element => {
  const {
    fileInputRef,
    videoPreviewRef,
    mediaRecorderRef,
    showDownloadButton,
    isMirrored,
    canPause,
    allowFrameCapture,
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
  } = state;
  assertSlots<VideoCaptureSlots>(state);
  const classes = useVideoCaptureClasses();

  return (
    <state.root>
      <h3 className={cn('text-2xl', 'font-semibold', 'pb-4')}>Video Record</h3>

      <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4 mb-4')}>
        <Button
          className={cn('h-16', 'border-dashed')}
          color={'primary'}
          variant={'bordered'}
          onPress={() => {
            setVideoOn(false);
            setUploadSuccess(undefined);
            setPreviewUrl(undefined);
            setPreviewVideoUrl(undefined);
            fileInputRef && (fileInputRef.current as HTMLInputElement).click();
          }}
        >
          <Input
            ref={fileInputRef}
            id={'fileInput'}
            classNames={{ base: cn('hidden') }}
            type={'file'}
            accept={'video/*'}
            onChange={(event) => {
              handleFileSelect(event);
            }}
          />
          <CloudUpload className={cn('w-8', 'h-8')} />
          Select Video to Upload
        </Button>

        <Button
          className={cn('h-16', 'border-dashed')}
          onPress={() => {
            setUploadSuccess(undefined);
            setPreviewUrl(undefined);
            setPreviewVideoUrl(undefined);
            !videoOn ? startCamera() : stopCamera();
          }}
          color={'primary'}
          variant={'bordered'}
        >
          {videoOn ? <VideoOff className={cn('w-8', 'h-8')} /> : <VideoAdd className={cn('w-8', 'h-8')} />}
          {!videoOn ? `Start Video` : `Close Video`}
        </Button>
      </div>

      <div className={cn('w-full', 'flex', 'flex-col', 'items-center')}>
        {videoOn && (
          <div className={cn('light', 'w-[640px]', 'h-[360px]')}>
            <div className={cn('w-full', 'h-full', 'relative', 'bg-black', 'overflow-hidden')}>
              <Webcam
                ref={videoPreviewRef}
                className={cn('w-full', 'h-full', 'object-cover')}
                audio={true}
                muted={false}
                mirrored={isMirrored}
                videoConstraints={{
                  width: 640,
                  height: 360,
                  deviceId: devices[0]?.deviceId,
                  frameRate: {
                    ideal: 21,
                    max: 30,
                  },
                  facingMode: isMirrored ? 'user' : 'environment',
                }}
                screenshotFormat={'image/jpeg'}
                screenshotQuality={0.8}
                onUserMediaError={(error) => {
                  setError({
                    message: 'Unable to access camera. Please check permissions.',
                    error: `Camera access error: ${error}`,
                  });
                  setVideoOn(false);
                }}
              />

              {recordingState.isRecording && (
                <div
                  className={cn(
                    'absolute',
                    'top-2',
                    'left-0',
                    'right-0',
                    'opacity-50',
                    'flex',
                    'justify-center'
                  )}
                >
                  <Chip className={cn('cursor-default')} size={'sm'} color={'danger'}>
                    {recordingState.isPaused ? `Recording paused` : `Recording in progress...`}
                  </Chip>
                </div>
              )}

              <div
                className={cn(
                  'px-6',
                  'py-2',
                  'rounded-full',
                  'flex',
                  'gap-4',
                  'justify-center',
                  'items-center',
                  'absolute',
                  'bottom-4',
                  'bg-gray-800/75',
                  '-translate-x-1/2',
                  'left-1/2'
                )}
              >
                <Chip
                  size={'lg'}
                  className={cn(
                    'w-[60px]',
                    'max-w-none',
                    'inline-flex',
                    'line-height-1',
                    'text-center',
                    'cursor-default'
                  )}
                >
                  {`${formatTime(recordingState.recordingTime as number)}`}
                </Chip>

                <Button
                  className={cn('z-2')}
                  radius={'full'}
                  size={'lg'}
                  isIconOnly={true}
                  color={recordingState.isRecording ? 'danger' : 'success'}
                  onPress={recordingState.isRecording ? stopRecording : startRecording}
                >
                  {recordingState.isRecording ? (
                    <StopFilledAlt className={cn('w-8', 'h-8')} />
                  ) : (
                    <RecordingFilledAlt className={cn('w-8', 'h-8')} />
                  )}
                </Button>

                {canPause && (
                  <Button
                    className={cn(
                      'w-[100px]',
                      'max-w-none',
                      'inline-flex',
                      'line-height-1',
                      'text-center',
                      'text-medium',
                      'z-2'
                    )}
                    radius={'full'}
                    size={'sm'}
                    color={'default'}
                    isDisabled={!recordingState.isRecording}
                    onPress={recordingState.isPaused ? resumeRecording : pauseRecording}
                  >
                    {recordingState.isPaused ? (
                      <PauseFuture className={cn('w-5', 'h-5')} />
                    ) : (
                      <Pause className={cn('w-5', 'h-5')} />
                    )}
                  </Button>
                )}

                {allowFrameCapture && (
                  <Button
                    className={cn('z-2')}
                    size={'sm'}
                    radius={'full'}
                    isIconOnly={true}
                    onPress={async () => {
                      const imageSrc = videoPreviewRef.current?.getScreenshot();

                      if (imageSrc) {
                        try {
                          const response = await fetch(imageSrc);
                          const blob = await response.blob();
                          const file = new File([blob], 'captured-photo.jpg', {
                            type: 'image/jpeg',
                          });

                          setSelectedFile(file);
                          setPreviewUrl(imageSrc);
                        } catch (error) {
                          setError({
                            message: 'Failed to capture photo. Please try again.',
                            error: `Capture error: ${error}`,
                          });
                        }
                      }
                    }}
                  >
                    <Aperture />
                  </Button>
                )}

                {previewUrl && (
                  <div
                    className={cn(
                      'h-[80px]',
                      'absolute',
                      'z-1',
                      'top-4/9',
                      '-translate-x-1/2',
                      '-translate-y-1/2',
                      'border-white',
                      'border-2',
                      classes.preview
                    )}
                  >
                    <Button
                      className={cn('min-w-0', 'min-h-0', 'absolute', '-top-3', '-right-4')}
                      radius={'full'}
                      size={'sm'}
                      color={'danger'}
                      isIconOnly={true}
                      onPress={() => {
                        setPreviewUrl(undefined);
                        setPreviewVideoUrl(undefined);
                      }}
                    >
                      <Close />
                    </Button>

                    <Button
                      className={cn('min-w-0', 'min-h-0', 'absolute', '-bottom-3', '-right-4')}
                      radius={'full'}
                      size={'sm'}
                      color={'success'}
                      isIconOnly={true}
                      onPress={() => handleImageDownload()}
                    >
                      <Download />
                    </Button>

                    <img className={cn('max-w-full', 'max-h-full')} src={previewUrl} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {previewVideoUrl && (
          <div className={cn('light', 'w-[640px]', 'h-[360px]', 'relative')}>
            <Button
              className={cn('min-w-0', 'min-h-0', 'absolute', 'top-2', 'right-2', 'z-10')}
              radius={'full'}
              size={'sm'}
              color={'danger'}
              isIconOnly={true}
              onPress={() => {
                setPreviewUrl(undefined);
                setPreviewVideoUrl(undefined);
              }}
            >
              <Close />
            </Button>
            <div className={cn('w-full', 'h-full', 'relative', 'bg-black', 'overflow-hidden')}>
              <video className={cn('w-full', 'h-full', 'object-cover')} src={previewVideoUrl} controls />
            </div>
          </div>
        )}

        {showDownloadButton && recordingState.recordedChunks.length > 0 && !recordingState.isRecording && (
          <div className={cn('mt-4', 'flex', 'gap-4')}>
            <Button color={'primary'} onPress={handleVideoDownload}>
              Save Recording
            </Button>

            {false && (
              <Button
                color={'primary'}
                onPress={() => {
                  console.log('Upload logic here');
                }}
              >
                Upload Recording
              </Button>
            )}
          </div>
        )}
      </div>
    </state.root>
  );
};
