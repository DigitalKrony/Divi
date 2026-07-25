/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import type { ReactElement } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Chip } from '@Components';

import { DataTable } from './..';
import type { DataTableProps } from './..';

export default {
  title: 'DUX Controls/DataTable',
  component: DataTable,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<DataTableProps> = (args) => {
  return <DataTable {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  selectRows: 'single',
  hasPagination: true,
  displayCount: 10,
  schema: [
    {
      colKey: 'fName',
      colLabel: 'First Name',
      colType: 'string',
      isSortable: true,
    },
    {
      colKey: 'lName',
      colLabel: 'Last Name',
      colType: 'string',
    },
    {
      colKey: 'submitDate',
      colLabel: 'Submit Date',
      colType: 'string',
    },
    {
      colKey: 'isActive',
      colLabel: 'Active',
      colType: 'boolean',
    },
    {
      colKey: 'menu',
      colLabel: '',
      colType: 'actions',
    },
  ],
  data: [
    [
      {
        col: 'fName',
        value: 'AJohn',
      },
      {
        col: 'lName',
        value: 'Doe',
      },
      {
        col: 'submitDate',
        value: (() => {
          const today = new Date();
          return today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        })(),
      },
      {
        col: 'isActive',
        value: (
          <Chip color={'success'} variant={'bordered'} size={'sm'}>
            Complete
          </Chip>
        ),
      },
      {
        col: 'menu',
        value: (() => {
          const newMenu: Array<ReactElement<any, any>> = [];

          newMenu.push(<></>);
          return newMenu;
        })(),
      },
    ],
    [
      {
        col: 'fName',
        value: 'DJohn',
      },
      {
        col: 'lName',
        value: 'Doe',
      },
      {
        col: 'submitDate',
        value: (() => {
          const today = new Date();
          return today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        })(),
      },
      {
        col: 'isActive',
        value: (
          <Chip color={'success'} variant={'bordered'} size={'sm'}>
            Complete
          </Chip>
        ),
      },
      {
        col: 'menu',
        value: (() => {
          const newMenu: Array<ReactElement<any, any>> = [];

          newMenu.push(<></>);
          return newMenu;
        })(),
      },
    ],
    [
      {
        col: 'fName',
        value: 'FJohn',
      },
      {
        col: 'lName',
        value: 'Doe',
      },
      {
        col: 'submitDate',
        value: (() => {
          const today = new Date();
          return today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        })(),
      },
      {
        col: 'isActive',
        value: (
          <Chip color={'success'} variant={'bordered'} size={'sm'}>
            Complete
          </Chip>
        ),
      },
      {
        col: 'menu',
        value: (() => {
          const newMenu: Array<ReactElement<any, any>> = [];

          newMenu.push(<></>);
          return newMenu;
        })(),
      },
    ],
    [
      {
        col: 'fName',
        value: 'BJohn',
      },
      {
        col: 'lName',
        value: 'Doe',
      },
      {
        col: 'submitDate',
        value: (() => {
          const today = new Date();
          return today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        })(),
      },
      {
        col: 'isActive',
        value: (
          <Chip color={'success'} variant={'bordered'} size={'sm'}>
            Complete
          </Chip>
        ),
      },
      {
        col: 'menu',
        value: (() => {
          const newMenu: Array<ReactElement<any, any>> = [];

          newMenu.push(<></>);
          return newMenu;
        })(),
      },
    ],
    [
      {
        col: 'fName',
        value: 'YJohn',
      },
      {
        col: 'lName',
        value: 'Doe',
      },
      {
        col: 'submitDate',
        value: (() => {
          const today = new Date();
          return today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        })(),
      },
      {
        col: 'isActive',
        value: (
          <Chip color={'success'} variant={'bordered'} size={'sm'}>
            Complete
          </Chip>
        ),
      },
      {
        col: 'menu',
        value: (() => {
          const newMenu: Array<ReactElement<any, any>> = [];

          newMenu.push(<></>);
          return newMenu;
        })(),
      },
    ],
    [
      {
        col: 'fName',
        value: 'RJohn',
      },
      {
        col: 'lName',
        value: 'Doe',
      },
      {
        col: 'submitDate',
        value: (() => {
          const today = new Date();
          return today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        })(),
      },
      {
        col: 'isActive',
        value: (
          <Chip color={'success'} variant={'bordered'} size={'sm'}>
            Complete
          </Chip>
        ),
      },
      {
        col: 'menu',
        value: (() => {
          const newMenu: Array<ReactElement<any, any>> = [];

          newMenu.push(<></>);
          return newMenu;
        })(),
      },
    ],
  ],
} as DataTableProps;
Basic.argTypes = {
  id: {
    control: 'text',
  },
  selectRows: {
    control: 'select',
    options: ['single', 'multiple'],
  },
  hasPagination: {
    control: 'boolean',
  },
  displayCount: {
    control: 'number',
  },
  as: {
    control: 'select',
    options: ['div', 'article', 'section'],
  },
};

Basic.parameters = {
  options: {},
};
