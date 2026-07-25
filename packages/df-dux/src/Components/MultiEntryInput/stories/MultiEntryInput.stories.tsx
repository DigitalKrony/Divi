/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { useState } from 'react';
import { type Meta, type StoryFn } from '@storybook/react';

import { ColorsEnum, ElementPositionEnum, SizeEnum } from '@df/utilities';

import { MultiEntryInput } from '..';
import type { MultiEntryInputProps } from '..';

export default {
  title: 'DUX Controls/MultiEntryInput',
  component: MultiEntryInput,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<MultiEntryInputProps> = (args) => {
  const [entries, setEntries] = useState(new Set());
  return (
    <MultiEntryInput
      {...args}
      validate={(value) => {
        const maxLength = 20;

        if (value.length > maxLength) {
          console.log('invalid: ', value);

          return `${value.length} || too long by ${value.length - maxLength} characters`;
        }

        return true;
      }}
      onValueChange={(value) => {
        console.log(value);
        setEntries(new Set(value));
      }}
    />
  );
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Additional Names',
  inputLocation: 'after',
  size: 'lg',
  color: 'default',
  defaultValue: ['Jim', 'James', 'Big Fudge'],
  disableAnimation: false,
} as MultiEntryInputProps;
Basic.argTypes = {
  inputLocation: {
    control: 'select',
    options: Object.keys(ElementPositionEnum).map((key) => (ElementPositionEnum as any)[key]),
  },
  size: {
    control: 'select',
    options: Object.keys(SizeEnum).map((key) => (SizeEnum as any)[key]),
  },
  color: {
    control: 'select',
    options: Object.keys(ColorsEnum).map((key) => (ColorsEnum as any)[key]),
  },
  disableAnimation: {
    control: 'boolean',
  },
  validate: {
    control: 'text',
  },
  as: {
    control: 'select',
  },
};
Basic.parameters = {
  options: {},
};
