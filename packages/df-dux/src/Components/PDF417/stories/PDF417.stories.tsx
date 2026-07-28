/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { type JSX, useState } from 'react';
import { type Meta, type StoryFn } from '@storybook/react';

import { Spinner, Input, Card, Code, Divider, Text } from '@Components';
import { cn } from '@Utilities';

import { type PDF417Props, PDF417, ElementIDs } from './../';

export default {
  title: 'DUX Controls/PDF417',
  component: PDF417,
  subcomponents: { Spinner, Input },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<PDF417Props> = (args) => {
  const [barcode, setBarcode] = useState<any | undefined>('...');

  return (
    <>
      <PDF417 onValueChange={(value: any) => setBarcode(value)} {...args} />

      <Divider className={cn('mt-4', 'mb-4')} />

      <div className={cn('flex', 'flex-wrap', 'gap-4', 'justify-between')}>
        {(() => {
          const dataBlock: JSX.Element[] = [];

          Object.entries(barcode).forEach(([key, value]) => {
            const meta = ElementIDs.find((val) => val.id === key);
            dataBlock.push(
              <Card key={key} className={cn('w-[30%]')} style={{ width: 'calc(100% * .30)' }}>
                <Code className={cn('w-f')}>
                  <Text weight={'semibold'}>
                    <em>{key}:</em> {`${value}`}
                  </Text>
                </Code>
                {!!meta && (
                  <Text size={'sm'} className={cn('p-2')}>
                    <div>{meta.name}</div>
                    <div>{meta.description}</div>
                  </Text>
                )}
              </Card>
            );
          });

          return dataBlock;
        })()}
      </div>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {} as PDF417Props;
Basic.argTypes = {
  size: {
    control: 'select',
  },
  variant: {
    control: 'select',
  },
  spinnerProps: {
    size: {
      control: 'select',
    },
  },
};
Basic.parameters = {
  options: {},
};
