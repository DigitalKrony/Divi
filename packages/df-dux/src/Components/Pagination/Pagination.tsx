/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from '@carbon/icons-react';

import {
  cn,
  Pagination as HPagination,
  PaginationItemType,
  type PaginationItemRenderProps,
} from '@heroui/react';

import { Button, Text } from '@Components';

import type { PaginationProps } from './Pagination.types';
import { usePaginationStyles } from './Pagination.styles';

/**
 * Render the final JSX of Pagination
 */
export const Pagination: React.FC<PaginationProps> = (props: PaginationProps): JSX.Element => {
  const {
    className,
    onChange,
    size,
    color = 'primary',
    itemCount = 1,
    itemsDisplayed = 10,
    initialPage = 1,
  } = props;
  const classes = usePaginationStyles();

  const [total, setTotal] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [displayed, setDesplayed] = useState<number>(itemsDisplayed);
  const [activePage, setActivePage] = useState<number>(initialPage);
  const [viewRange, setViewRange] = useState({ from: 0, to: 0 });

  const renderItem = (args: PaginationItemRenderProps) => {
    const {
      ref,
      key,
      className,
      value,
      isActive,
      activePage,
      page,
      onNext,
      onPrevious,
      setPage,
      onPress,
      getAriaLabel,
    } = args;
    if (value === PaginationItemType.PREV) {
      return (
        <li>
          <Button
            key={key}
            variant={'light'}
            color={'primary'}
            isIconOnly
            onPress={onPrevious}
            aria-label={'Next Page'}
          >
            <ChevronLeft />
          </Button>
        </li>
      );
    }

    if (value === PaginationItemType.NEXT) {
      return (
        <li>
          <Button
            key={key}
            variant={'light'}
            color={'primary'}
            isIconOnly
            onPress={onNext}
            aria-label={'Next Page'}
          >
            <ChevronRight />
          </Button>
        </li>
      );
    }

    if (value === PaginationItemType.DOTS) {
      const DotsArrow =
        activePage > page ? (
          <ArrowLeft className={cn('hidden group-hover:block group-data-[focus-visible=true]:block')} />
        ) : (
          <ArrowRight className={cn('hidden group-hover:block group-data-[focus-visible=true]:block')} />
        );
      return (
        <li>
          <Button key={key} variant={'light'} isIconOnly onPress={onPress}>
            <span className={cn('group-hover:hidden group-data-[focus-visible=true]:hidden')}>...</span>
            {DotsArrow}
          </Button>
        </li>
      );
    }

    return (
      <li>
        <Button
          key={key}
          ref={ref}
          className={cn(isActive && className, isActive && 'cursor-default')}
          variant={isActive ? 'flat' : 'light'}
          color={isActive ? 'primary' : 'default'}
          isIconOnly
          onPress={() => !isActive && setPage(value)}
        >
          {value}
        </Button>
      </li>
    );
  };

  useEffect(() => {
    // Rerender on prop update for docs
  }, [size, className]);

  useEffect(() => {
    setDesplayed(itemsDisplayed);
  }, [itemsDisplayed]);

  useEffect(() => {
    const newFrom = activePage * itemsDisplayed - itemsDisplayed;
    const newTo = activePage * itemsDisplayed;

    setViewRange({ from: newFrom === 0 ? 1 : newFrom + 1, to: newTo > itemCount ? itemCount : newTo });
  }, [initialPage, activePage]);

  useEffect(() => {
    if (total > 5) setShowControls(true);
    else setShowControls(false);
  }, [total]);

  useEffect(() => {
    if (itemCount && itemsDisplayed) setTotal(Math.ceil(itemCount / itemsDisplayed));
  }, [displayed, itemCount, itemsDisplayed]);

  return (
    <div className={cn('flex', 'flex-row', 'items-center', classes.wrapper, total === 0 && classes.hidden)}>
      {itemCount > itemsDisplayed && (
        <HPagination
          className={cn(classes.root, 'gap-2', className)}
          size={size}
          total={total}
          variant={'light'}
          color={color}
          initialPage={initialPage}
          showControls={showControls}
          renderItem={renderItem}
          onChange={(page: number) => {
            setActivePage(page);
            onChange && onChange(page);
          }}
          {...props}
        />
      )}
      <div className={cn(classes.verbal, 'grow-1', 'flex', 'justify-end')}>
        <Text>
          {viewRange.from} - {viewRange.to} of {itemCount} items
        </Text>
      </div>
    </div>
  );
};
