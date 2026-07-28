/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { Meta, StoryFn } from '@storybook/react';

import { Divider } from '@Components/Divider';
import { Card, CardBody, CardHeader, CardFooter } from '..';
import type { CardProps } from '..';

export default {
  title: 'HeroUI Controls/Card',
  component: Card,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<CardProps> = (args) => {
  return (
    <>
      <Card {...args}>
        <CardBody>Simple Card Story</CardBody>
      </Card>
      <br />
      <Card status={'primary'} {...args}>
        <CardBody>Simple Card Story</CardBody>
      </Card>
      <br />
      <Card {...args}>
        <CardHeader>The Card Header</CardHeader>
        <Divider />
        <CardBody>Story Card Body</CardBody>
        <Divider />
        <CardFooter>The Card Footer</CardFooter>
      </Card>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {} as CardProps;
Basic.parameters = {
  options: {},
};
