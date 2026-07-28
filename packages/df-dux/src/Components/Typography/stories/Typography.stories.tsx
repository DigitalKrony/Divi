/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Text } from './..';
import type { TypographyProps } from './..';

export default {
  title: 'DUX Controls/Typography',
  component: Text,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<TypographyProps> = (args) => {
  return (
    <>
      <div className={'mb-4'}>
        <Text {...args} />
      </div>
      <div>
        <Text as="h1" isDisplay={1}>
          Display 1
        </Text>
        <Text as="h2" isDisplay={2}>
          Display 2
        </Text>
        <Text as="h3" isDisplay={3}>
          Display 3
        </Text>
        <Text as="h4" isDisplay={4}>
          Display 4
        </Text>

        <Text as="h1">Heading 1</Text>
        <Text as="h2">Heading 2</Text>
        <Text as="h3">Heading 3</Text>
        <Text as="h4">Heading 4</Text>
        <Text as="h5">Heading 5</Text>
        <Text as="h6">Heading 6</Text>

        <br />

        <Text as="p" size={'base'}>
          Paragraph
        </Text>
        <Text as="p" size={'sm'}>
          Paragraph
        </Text>

        <br />

        <Text color={'default'}>Default</Text>
        <Text color={'primary'}>Primary</Text>
        <Text color={'secondary'}>Secondary</Text>
        <Text color={'success'}>Success</Text>
        <Text color={'warning'}>Warning</Text>
        <Text color={'danger'}>Danger</Text>
      </div>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  children: 'The lazy dog jumped over the quick fox',
  as: 'p',
  color: 'default',
  size: 'base',
  isDisplay: undefined,
  className: '',
} as TypographyProps;
Basic.argTypes = {
  weight: {
    control: 'select',
  },
  isDisplay: {
    control: 'select',
  },
};
Basic.parameters = {
  options: {},
};
