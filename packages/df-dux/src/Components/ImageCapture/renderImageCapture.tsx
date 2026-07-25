/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type { JSX } from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import { Camera, CloudUpload, Close, Aperture } from '@carbon/icons-react';
import Webcam from 'react-webcam';
import { cn } from '@heroui/react';

import { Button, Chip, Input } from '@Components';

import type { ImageCaptureSlots, ImageCaptureState } from './ImageCapture.types';

/**
 * Render the final JSX of ImageCapture
 */
export const renderImageCapture = (state: ImageCaptureState): JSX.Element => {
  assertSlots<ImageCaptureSlots>(state);
  const {
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
    handleFileSelect,
    startCamera,
    stopCamera,
    uploadPhoto,
    clearSelection,
  } = state;

  return (
    <state.root>
      <h3 className={cn('text-2xl', 'font-semibold', 'pb-4')}>Image Capture</h3>

      <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4 mb-4')}>
        <Button
          className={cn('h-16', 'border-dashed')}
          color={'primary'}
          variant={'bordered'}
          onPress={() => {
            setTakePhoto(false);
            setUploadSuccess(undefined);
            setPreviewUrl(undefined);
            fileInputRef && (fileInputRef.current as HTMLInputElement).click();
          }}
        >
          <Input
            ref={fileInputRef}
            id={'fileInput'}
            classNames={{ base: cn('hidden') }}
            type={'file'}
            accept={'image/*'}
            onChange={(event) => {
              handleFileSelect && handleFileSelect(event);
            }}
          />
          <CloudUpload className={cn('w-8', 'h-8')} />
          Select Image
        </Button>

        <Button
          className={cn('h-16', 'border-dashed')}
          onPress={() => {
            setUploadSuccess(undefined);
            setPreviewUrl(undefined);
            startCamera && startCamera();
          }}
          color={'primary'}
          variant={'bordered'}
        >
          <Camera className={cn('w-8', 'h-8')} />
          Take photo
        </Button>
      </div>

      <div className={cn('w-full', 'flex', 'flex-col', 'items-center')}>
        {uploadSuccess !== true && takePhoto && (
          <div className={cn('light', `w-[640px]`, `h-[360px]`)}>
            <div className={cn('w-full', 'h-full', 'relative', 'bg-black', 'overflow-hidden')}>
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored={isMirrored}
                videoConstraints={{
                  width: 640,
                  height: 360,
                  deviceId: devices[0]?.deviceId,
                  facingMode: isMirrored ? 'user' : 'environment',
                }}
                screenshotFormat={'image/jpeg'}
                screenshotQuality={0.8}
                className={cn('w-full', 'h-full', 'object-cover')}
                onUserMediaError={(error) => {
                  setError({
                    message: 'Unable to access camera. Please check permissions.',
                    error: `Camera access error: ${error}`,
                  });
                  setTakePhoto(false);
                }}
              />

              {countdown && countdown > 0 && (
                <div
                  className={cn(
                    'absolute',
                    'inset-0',
                    'bg-black',
                    'opacity-50',
                    'flex',
                    'items-center',
                    'justify-center'
                  )}
                >
                  <div className={cn('text-white', 'text-center')}>
                    <div className={cn('text-8xl', 'font-bold', 'mb-4', 'animate-ping')}>{countdown}</div>
                  </div>
                </div>
              )}

              {countdown === undefined && (
                <div
                  className={cn(
                    'px-6',
                    'py-2',
                    'flex',
                    'gap-4',
                    'justify-center',
                    'items-center',
                    'absolute',
                    'bottom-4',
                    'left-1/2',
                    'rounded-full',
                    'bg-gray-800/75',
                    '-translate-x-1/2'
                  )}
                >
                  <Button
                    color={'success'}
                    isIconOnly={true}
                    radius={'full'}
                    onPress={() => {
                      setCountdown(3);
                    }}
                  >
                    <Aperture className={cn('w-6', 'h-6')} />
                  </Button>
                  <Button color={'danger'} isIconOnly={true} radius={'full'} onPress={stopCamera}>
                    <Close className={cn('w-6', 'h-6')} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {uploadSuccess !== true && !takePhoto && previewUrl && (
          <div className={cn('flex', 'flex-col', 'gap-4', 'p-4')}>
            <h4 className={cn('text-lg', 'font-semibold')}>Selected Photo</h4>

            <div className={cn('relative', 'inline-block')}>
              <img
                src={previewUrl}
                alt={'Selected photo'}
                className={cn(
                  'min-w-[640px]',
                  'min-h-[360px]',
                  'object-cover',
                  'rounded-lg',
                  'border-2',
                  'border-primary-200'
                )}
              />

              <Button
                className={cn('absolute', 'top-2', 'right-2')}
                color={'danger'}
                isIconOnly={true}
                radius={'full'}
                onPress={clearSelection}
              >
                <Close className={cn('w-6', 'h-6')} />
              </Button>

              <Chip className={cn('absolute', 'top-2', 'left-2')} size={'sm'} color={'success'}>
                Ready to Upload
              </Chip>
            </div>
          </div>
        )}
      </div>
    </state.root>
  );
};
