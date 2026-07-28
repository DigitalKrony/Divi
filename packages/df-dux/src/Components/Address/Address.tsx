/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useEffect, useState } from 'react';

import { Input, Text } from '@Components';
import { cn } from '@Utilities';

import { type AddressProps, type CompleteAddress } from './Address.types';
import { StateSelection, type StateDto } from './components/StateSelection';
import { useAddressStyles } from './Address.styles';
/**
 * A unified address component
 */
export const Address: React.FC<AddressProps> = (props: AddressProps): JSX.Element => {
  const {
    id,
    className,
    readOnly,
    label,
    size,
    color,
    variant,
    defaultValues,
    onValueChange,
    isItValid,
    labelPlacement = 'outside-top',
    isRequired,
  } = props;
  const [refId, setRefId] = useState<string | undefined>(id);
  const [completeAddress, setCompleteAddress] = useState<CompleteAddress>(
    defaultValues || {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zipCode: '',
    }
  );
  const [gap, setGap] = useState<number>(4);
  const [itsValid, setIsItValid] = useState(true);
  const styles = useAddressStyles();

  const inputValueHandler = (props: { [key: string]: string | number | StateDto }) => {
    const setAddress = { ...completeAddress, ...props };
    setCompleteAddress(setAddress);
  };

  useEffect(() => {
    let elementGap: number;
    switch (size) {
      case 'sm':
        elementGap = 2;
        break;
      case 'lg':
        elementGap = 6;
        break;
      case 'md':
      default:
        elementGap = 4;
        break;
    }

    setGap(elementGap);
  }, [size]);

  useEffect(() => {
    onValueChange && onValueChange(completeAddress);
  }, [completeAddress]);

  useEffect(() => {
    isItValid && isItValid(itsValid);
  }, [itsValid]);

  return (
    <div id={refId} className={cn(styles.root, className)}>
      <Text className={cn(`mb-${gap}`)} size={size} weight={'semibold'}>
        {label}
      </Text>
      <div className={cn('flex', 'flex-col', `gap-${gap}`)}>
        <div className={cn('flex', 'flex-row', `gap-${gap}`)}>
          <Input
            isDisabled={readOnly}
            classNames={{ base: cn('flex-grow') }}
            label={'Address'}
            size={size}
            color={color}
            variant={variant}
            labelPlacement={labelPlacement}
            defaultValue={completeAddress.line1 && completeAddress.line1}
            isClearable={!readOnly}
            isRequired={true && isRequired}
            useDebouncer={true}
            onValueChange={(value) => {
              inputValueHandler({ line1: value });
            }}
            validate={(value) => {
              if (value.length > 50) {
                setIsItValid(false);
                return 'Street address must not exceed 50 characters.';
              } else {
                setIsItValid(true);
                return true;
              }
            }}
          />

          <Input
            isDisabled={readOnly}
            classNames={{ base: cn('flex-grow') }}
            label={'Apartment/Unit Number'}
            size={size}
            color={color}
            variant={variant}
            labelPlacement={labelPlacement}
            defaultValue={completeAddress.line2 && completeAddress.line2}
            isClearable={!readOnly}
            isRequired={false}
            useDebouncer={true}
            onValueChange={(value) => {
              inputValueHandler({ line2: value });
            }}
            validate={(value) => {
              if (value.length > 50) {
                setIsItValid(false);
                return 'Address line 2 must not exceed 50 characters.';
              } else {
                setIsItValid(true);
                return true;
              }
            }}
          />
        </div>

        <div className={cn('flex', 'flex-row', `gap-${gap}`)}>
          <Input
            isDisabled={readOnly}
            classNames={{ base: cn('flex-grow') }}
            label={'City'}
            size={size}
            color={color}
            variant={variant}
            labelPlacement={labelPlacement}
            defaultValue={completeAddress.city && completeAddress.city}
            isClearable={!readOnly}
            isRequired={true && isRequired}
            useDebouncer={true}
            onValueChange={(value) => {
              inputValueHandler({ city: value });
            }}
            validate={(value) => {
              if (value.length > 25) {
                setIsItValid(false);
                return 'City name must not exceed 25 characters.';
              } else {
                setIsItValid(true);
                return true;
              }
            }}
          />

          <StateSelection
            readOnly={readOnly}
            className={cn('w-62')}
            size={size}
            color={color}
            isRequired={true && isRequired}
            variant={variant}
            defaultSelection={!!completeAddress.state ? (completeAddress.state as string) : undefined}
            labelPlacement={labelPlacement}
            onChange={(value) => inputValueHandler({ state: value })}
          />

          <Input
            isDisabled={readOnly}
            classNames={{ base: cn('flex-grow', 'w-75') }}
            label={'Zip'}
            size={size}
            color={color}
            labelPlacement={labelPlacement}
            defaultValue={completeAddress.zipCode && completeAddress.zipCode}
            isClearable={!readOnly}
            isRequired={true && isRequired}
            variant={variant}
            useDebouncer={true}
            onValueChange={(value) => {
              inputValueHandler({ zipCode: value });
            }}
            validate={(value: string) => {
              const zipPattern = /^[0-9]{5}$|^[0-9]{5}\-[0-9]{4}$/;
              if (value.match(zipPattern) === null) {
                setIsItValid(false);
                return 'Zip code invalid.';
              } else {
                setIsItValid(true);
                return true;
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
