/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useEffect, useRef, useState } from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';

import type { DataProps, DataTableProps, DataTableState } from './DataTable.types';
import { createUniqueId } from '@df/utilities';

/**
 * Create the state required to render  DataTable.
 *
 * The returned state can be modified with hooks such as use DataTableStyles,
 * before being passed to render DataTable.
 *
 * @param props - props from this instance of DataTable
 * @param ref - reference to root HTMLElement of DataTable
 */
export const useDataTable = (
  props: DataTableProps,
  ref: React.Ref<HTMLElement> & React.Ref<HTMLDivElement>
): DataTableState => {
  const {
    id,
    className,
    title,
    data,
    schema,
    hasPagination,
    selectRows,
    displayCount = 20,
    totalItemCount,
    currentPage,
    onPageChange,
    onRowPress,
  } = props as DataTableProps;

  const innerRef = useRef<HTMLElement>(null);

  const [rootId, setRootId] = useState<string>(createUniqueId({}));
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [header, setHeader] = useState<JSX.Element[]>([]);
  const [liveData, setLiveData] = useState<Array<Array<DataProps>>>(data);
  const [headerKeys, setHeaderKeys] = useState<any | undefined>(undefined);
  const [rows, setRows] = useState<JSX.Element[] | undefined>(undefined);
  const [tableSort, setTableSort] = useState<any | undefined>(undefined);
  const [startIndex, setStartIndex] = useState<number>(0);

  const handelAllRowSelect = (event: any) => {
    const selectSet = new Set();
    if (selectRows === 'multiple' && selectedRows.size < rows!.length) {
      rows?.forEach((val, i) => {
        selectSet.add(i);
      });
    }

    setSelectedRows(selectSet);
  };

  const handelRowSelect = (rowIteraction: number) => {
    if (selectRows === 'multiple') {
      setSelectedRows((prev) => {
        const setReplace = new Set(prev);
        if (prev.has(rowIteraction)) {
          setReplace.delete(rowIteraction);
        } else if (!prev.has(rowIteraction)) {
          setReplace.add(rowIteraction);
        } else {
          console.error('Selection issue, try again.');
        }
        return setReplace;
      });
    } else if (selectRows === 'single') {
      setSelectedRows((prev) => {
        const setReplace = new Set();
        if (prev.size === 0) {
          setReplace.add(rowIteraction);
        } else if (!prev.has(rowIteraction)) {
          setReplace.add(rowIteraction);
        }
        return setReplace;
      });
    }
  };

  useEffect(() => {
    id && setRootId(id);
  }, [id]);

  useEffect(() => {
    setLiveData(data);
    setTableSort(undefined);
  }, [data]);

  useEffect(() => {
    if (!!!rows) {
      setIsLoaded(true);
    }
  }, [rows, selectRows, selectedRows]);

  useEffect(() => {
    if (!!tableSort) {
      setSelectedRows((prev: any) => {
        let _clr = new Set();
        return _clr;
      });

      setLiveData((prev) => {
        const _prev = [...data];
        _prev.sort((a: any, b: any) => {
          if (!!!a || !!!b) return 0;

          const valA = a.find((item: any) => item && item.col === tableSort.column).value.toLowerCase();
          const valB = b.find((item: any) => item && item.col === tableSort.column).value.toLowerCase();

          if (valA < valB) return tableSort.direction === 'ascending' ? -1 : 1;
          if (valA > valB) return tableSort.direction === 'ascending' ? 1 : -1;

          return 0;
        });

        return _prev;
      });
    }
  }, [tableSort]);

  const root: DataTableState['root'] = slot.always(
    getIntrinsicElementProps('div', {
      ref: useMergedRefs(ref, innerRef.current ? innerRef : undefined) as React.Ref<HTMLDivElement> | any,
      id: rootId,
      ...props,
    }),
    { elementType: 'div' }
  );

  const state: DataTableState = {
    components: { root: 'div' },
    root,
    id,
    className,
    title,
    schema,
    data: liveData,
    setData: setLiveData,
    isLoaded,
    setIsLoaded,
    selectRows,
    startIndex,
    hasPagination,
    displayCount,
    totalItemCount,
    currentPage,
    onPageChange,
    onRowPress,
    header,
    setHeader,
    headerKeys,
    setHeaderKeys,
    rows,
    setRows,
    selectedRows,
    setSelectedRows,
    handelAllRowSelect,
    handelRowSelect,
    tableSort,
    setTableSort,
  };

  return state;
};
