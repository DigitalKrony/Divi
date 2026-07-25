/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useEffect, useState } from 'react';

import { Select, SelectItem } from '@Components';
import { cn } from '@Utilities';

import { States } from './States.data';
import { type StateSelectionProps } from './StateSelection.types';
import { useStateSelectionStyles } from './StateSelection.styles';

/**
 * Render the final JSX of StateSelection
 */
export const StateSelection: React.FC<StateSelectionProps> = (props: StateSelectionProps): JSX.Element => {
  const {
    className,
    readOnly,
    size,
    color,
    variant,
    labelPlacement = 'outside-top',
    defaultSelection,
    onSelectionChange,
    onChange,
    label = 'State',
    isRequired
  } = props;
  const styles = useStateSelectionStyles();
  const [states, setStates] = useState<Array<JSX.Element>>([]);
  const [defaultAbbr, setDefaultAbbr] = useState(defaultSelection);

  const rendderStateSelections = () => {
    const stateSelects: Array<JSX.Element> = [];

    Object.keys(States).forEach((v: any, i: number, a: Array<string>) => {
      const curState = (States as any)[v];
      const { label, key, name } = curState;

      stateSelects.push(
        <SelectItem key={label} data-key={key} data-label={label}>
          {name}
        </SelectItem>
      );
    });

    return stateSelects;
  };

  useEffect(() => {
    setStates(rendderStateSelections());
  }, []);

  return (
    <Select
      isDisabled={readOnly}
      className={cn(styles.root, className)}
      classNames={{ base: styles.root }}
      label={label}
      labelPlacement={labelPlacement}
      size={size}
      color={color}
      variant={variant}
      isRequired={isRequired}
      multiple={false}
      defaultSelectedKeys={!!defaultAbbr ? [defaultAbbr] : undefined}
      onChange={(val) => {
        if (!!!val) return onChange && onChange(undefined);
        const { target } = val;
        if (!!!target) return onChange && onChange(undefined);
        const { value } = target;
        if (!!!value) return onChange && onChange(undefined);
        onChange && onChange(value);
      }}
      onSelectionChange={onSelectionChange}
    >
      {states}
    </Select>
  );
};
