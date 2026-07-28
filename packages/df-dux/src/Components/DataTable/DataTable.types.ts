/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, type Dispatch, type SetStateAction } from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DataSchema = {
  colKey: string;
  colLabel?: string | JSX.Element;
  colType?: 'string' | 'number' | 'actions' | 'element' | 'boolean';
  align?: 'center' | 'start' | 'end';
  width?: number | string;
  minWidth?: number | string;
  order?: 'asc' | 'desc';
  isSortable?: boolean;
  onPress?: (event: any) => void;
};

export type DataProps = {
  col: string;
  value: string | JSX.Element | Array<JSX.Element>;
};

/**
 * DataTableSlots
 */
export type DataTableSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 *  DataTableProps
 */

export type DataTablePropsDefault = ComponentProps<DataTableSlots> & {};

export type DataTableProps = ComponentProps<DataTableSlots> & {
  id?: string;
  className?: string;
  title?: string;
  schema: DataSchema[];
  data: Array<Array<DataProps>>;
  selectRows?: 'single' | 'multiple';
  hasPagination?: boolean;
  displayCount?: number;
  totalItemCount?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onRowPress?: (args: { rowIndex: number; rowData: Array<DataProps> }) => void;
};

/**
 * DataTableState
 */
export type DataTableState = ComponentState<DataTableSlots> &
  Pick<
    DataTableProps,
    | 'id'
    | 'className'
    | 'title'
    | 'schema'
    | 'data'
    | 'hasPagination'
    | 'selectRows'
    | 'displayCount'
    | 'totalItemCount'
    | 'currentPage'
    | 'onPageChange'
    | 'onRowPress'
  > & {
    isLoaded: boolean;
    setIsLoaded: any;
    startIndex: number;
    header: JSX.Element[];
    setHeader: any;
    headerKeys: any;
    setHeaderKeys: any;
    rows?: JSX.Element[];
    setRows: any;
    selectedRows: any;
    setSelectedRows: any;

    handelAllRowSelect: (event: any) => void;
    handelRowSelect: (event: any) => void;

    setData: Dispatch<SetStateAction<Array<Array<DataProps>>>>;

    tableSort: any;
    setTableSort: any;
  };
