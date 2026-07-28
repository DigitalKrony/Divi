/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useEffect, useState, useRef, useCallback } from 'react';

import { Checkmark, ErrorOutline } from '@Icons';
import { Input, Spinner } from '@Components';
import { cn, parseAAMVA } from '@df/utilities';

import { type PDF417Props } from './PDF417.types';
import { usePDF417SClasses } from './PDF417.styles';

/**
 * Render the final JSX of PDF417
 */
export const PDF417: React.FC<PDF417Props> = (props: PDF417Props): JSX.Element => {
  const {
    size,
    variant,
    color = 'default',
    label,
    placeholder = 'Ready to scan',
    spinnerProps,
    onValueChange = () => {},
    getInput,
  } = props;
  const classes = usePDF417SClasses(props);
  const baseRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [disabled, setDisabled] = useState<boolean>(false);
  const [scanning, setScanning] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string | undefined>();
  const [bardata, setBardata] = useState<any | undefined>(undefined);
  const [preSize, setPreSize] = useState<number>(4);
  const [inputError, setInputError] = useState<boolean>(false);

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      onValueChange(value ?? '');
    },
    [onValueChange]
  );

  useEffect(() => {
    switch ((spinnerProps && spinnerProps.size) || size) {
      case 'sm':
        setPreSize(3);
        break;
      case 'lg':
        setPreSize(6);
        break;
      case 'md':
      default:
        setPreSize(4);
        break;
    }
  }, [size, variant, color, spinnerProps]);

  useEffect(() => {
    setScanning(false);

    if (!!barcode && barcode !== '') {
      setBardata(parseAAMVA(barcode));
      setDisabled(true);
    }
  }, [barcode]);

  useEffect(() => {
    handleValueChange(bardata);
  }, [bardata, disabled]);

  useEffect(() => {
    if (baseRef.current !== null) {
      !!inputRef && getInput && getInput(inputRef.current!);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Input
        ref={inputRef}
        classNames={{ innerWrapper: disabled && classes.inputWrapper, input: disabled && classes.input }}
        baseRef={baseRef}
        label={label}
        size={size}
        color={color}
        variant={variant}
        isClearable={true}
        placeholder={placeholder}
        useDebouncer={true}
        startContent={
          scanning ? (
            <Spinner
              color={(spinnerProps && spinnerProps.color) || color}
              variant={spinnerProps ? spinnerProps.variant : 'dots'}
              size={(spinnerProps && spinnerProps.size) || size}
              classNames={{
                dots: color === 'default' && cn(`bg-gray-900`),
              }}
            />
          ) : inputError ? (
            <ErrorOutline
              className={cn(
                `w-${preSize}`,
                `h-${preSize}`,
                `text-${size}`,
                spinnerProps && spinnerProps.color && `text-${spinnerProps.color}`
              )}
            />
          ) : (
            barcode && (
              <Checkmark
                className={cn(
                  `w-${preSize}`,
                  `h-${preSize}`,
                  spinnerProps && spinnerProps.color && `text-${spinnerProps.color}`
                )}
              />
            )
          )
        }
        onChange={() => {
          if (inputError) setInputError(false);
          if (scanning === false) setScanning(true);
        }}
        validate={() => {
          if (inputError) return 'The input is not a valid barcode scan. Please claer it and try again.';
          else true;
        }}
        onValueChange={(value) => {
          setBarcode(value);

          if (!!!value || value === '') {
            setInputError(false);
            setBardata(undefined);
            setDisabled(false);
          }
        }}
      />
    </div>
  );
};
