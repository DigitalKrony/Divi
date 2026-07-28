/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { forwardRef } from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useDataTable } from './useDataTable';
import { renderDataTable } from './renderDataTable';
import { useDataTableStyles } from './useDataTableStyles';
import type { DataTableProps } from './DataTable.types';

export const DataTable: ForwardRefComponent<DataTableProps> = forwardRef((props, ref) => {
  const state = useDataTable(props, ref);
  useDataTableStyles(state);
  return renderDataTable(state);
});

DataTable.displayName = 'DataTable';