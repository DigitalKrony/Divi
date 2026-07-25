/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { type JSX, useEffect, useState } from 'react';
import { assertSlots } from '@fluentui/react-utilities';

import { getNestedObject } from '@df/utilities';
import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  Checkbox,
  Pagination,
  Text,
} from '@Components';

import type { DataTableSlots, DataTableState, DataSchema, DataProps } from './DataTable.types';

/**
 * Render the final JSX of DataTable
 */
export const renderDataTable = (state: DataTableState): JSX.Element => {
  const {
    title,
    schema,
    data,
    isLoaded,
    setIsLoaded,
    selectRows,
    startIndex,
    hasPagination,
    displayCount = 5,
    totalItemCount,
    currentPage,
    onPageChange,
    header,
    setHeader,
    headerKeys,
    setHeaderKeys,
    rows,
    setRows,
    selectedRows,
    handelAllRowSelect,
    handelRowSelect,
    onRowPress,
    tableSort,
    setTableSort,
  } = state;
  const [activePage, setActivePage] = useState<number>(1);
  assertSlots<DataTableSlots>(state);
  const checkColProps: DataSchema = {
    colKey: 'colSelect',
    colType: 'actions',
    align: 'center',
    width: 75,
    isSortable: false,
  };

  const buildRow = (rowData: Array<DataProps>, rowIndex: number) => {
    const newRow: JSX.Element[] = [];
    const triggerRowPress = () => {
      onRowPress?.({ rowIndex, rowData });
    };

    if (!!selectRows) {
      newRow.splice(
        0,
        0,
        <TableCell key={`select-${rowIndex}`}>
          <Checkbox
            defaultSelected={selectedRows.has(rowIndex)}
            isSelected={selectedRows.has(rowIndex)}
            onChange={() => {
              handelRowSelect(rowIndex);
            }}
          />
        </TableCell>
      );
    }

    rowData.forEach((cell, index) => {
      const { value, col } = cell;

      if (!!!headerKeys) return false;
      if (Object.keys(headerKeys).indexOf(col) === -1) return false;

      let rowCell = <TableCell key={`${rowIndex}-${index}`}>Loading</TableCell>;
      if (headerKeys !== undefined && headerKeys[col] !== undefined) {
        const { order, key, type } = headerKeys[col];

        newRow.splice(
          order,
          0,
          <TableCell
            key={`${rowIndex}-${index}-${key}`}
            className={onRowPress ? 'cursor-pointer' : undefined}
            onClick={() => {
              triggerRowPress();
            }}
          >
            {value}
          </TableCell>
        );
      } else {
        newRow.push(rowCell);
      }
    });

    return (
      <TableRow
        key={rowIndex}
        className={onRowPress ? 'cursor-pointer hover:opacity-90' : undefined}
        tabIndex={onRowPress ? 0 : undefined}
        onClick={triggerRowPress}
        onKeyDown={(event) => {
          if (!onRowPress) return;

          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            triggerRowPress();
          }
        }}
      >
        {newRow}
      </TableRow>
    );
  };

  const buildRows = () => {
    const newRows: JSX.Element[] = [];

    data.forEach((rowData, rowIndex) => {
      newRows.push(buildRow(rowData, rowIndex));
    });

    return newRows;
  };

  const buildHeader = () => {
    const newHeader: JSX.Element[] = [];
    const newHeaderKeys: any = {};

    if (!!selectRows) {
      let indeterminateState = false;

      if (selectRows === 'multiple' && selectedRows.size > 0 && selectedRows.size < rows!.length) {
        indeterminateState = true;
      } else if (selectRows === 'single' && selectedRows.size > 0) {
        indeterminateState = true;
      }

      newHeader.unshift(
        <TableColumn
          key={checkColProps.colKey}
          width={checkColProps.width as number}
          maxWidth={checkColProps.width as number}
          align={checkColProps.align}
        >
          <Checkbox
            isIndeterminate={indeterminateState}
            aria-label={'Row Select'}
            isDisabled={selectRows !== 'multiple'}
            isSelected={selectRows === 'multiple' && selectedRows.size === rows?.length}
            onChange={(event) => {
              if (selectRows === 'multiple') {
                handelAllRowSelect(event);
              }
            }}
          />
        </TableColumn>
      );

      newHeaderKeys['rowSelect'] = {
        order: 0,
        ...checkColProps,
      };
    }

    schema.forEach((column, colIndex) => {
      const { colKey, colType, colLabel, isSortable } = column;
      newHeaderKeys[column.colKey] = {
        order: !!selectRows ? colIndex + 1 : colIndex,
        key: colKey,
        type: colType,
      };

      newHeader.push(
        <TableColumn key={colKey} allowsSorting={isSortable}>
          {colLabel}
        </TableColumn>
      );
    });

    return { elements: newHeader, keys: newHeaderKeys };
  };

  useEffect(() => {
    setRows(buildRows());
  }, [headerKeys, data]);

  useEffect(() => {
    setRows(undefined);
    setIsLoaded(false);

    const headerData = buildHeader();
    setHeaderKeys(headerData.keys);
    setHeader(headerData.elements);
  }, [schema]);

  useEffect(() => {
    const headerData = buildHeader();
    setHeaderKeys(headerData.keys);
    setHeader(headerData.elements);
  }, [selectRows, selectedRows]);

  useEffect(() => {
    setActivePage(1);
  }, [data, displayCount, hasPagination]);

  useEffect(() => {
    if (currentPage && currentPage > 0) {
      setActivePage(currentPage);
    }
  }, [currentPage]);

  const isServerPagination = hasPagination && !!onPageChange && typeof totalItemCount === 'number';

  const visibleRows =
    hasPagination && !isServerPagination
      ? rows?.slice((activePage - 1) * displayCount, activePage * displayCount)
      : rows;

  if (!isLoaded && rows === undefined) {
    return <state.root>Rendering Table</state.root>;
  }

  return (
    <state.root>
      <Text as={'div'} weight={'semibold'} size={'xl'}>
        {title}
      </Text>

      <Table
        isStriped
        role={'grid'}
        aria-labelledby={'grid1Label'}
        bottomContent={(() => {
          if (!hasPagination) return <></>;
          return (
            <Pagination
              initialPage={activePage}
              itemCount={isServerPagination ? totalItemCount : rows?.length}
              itemsDisplayed={displayCount}
              onChange={(page) => {
                setActivePage(page);
                onPageChange?.(page);
              }}
            />
          );
        })()}
        sortDescriptor={tableSort}
        onSortChange={setTableSort}
      >
        <TableHeader>{header}</TableHeader>
        <TableBody>{visibleRows!}</TableBody>
      </Table>
    </state.root>
  );
};
