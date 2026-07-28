/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { type JSX } from 'react';

import { cn } from '@Utilities';
import { Text } from '@Components';

import { type QuickListProps } from './QuickList.types';
import { useQuickListStyles } from './QuickList.styles';

/**
 * Render the final JSX of QuickList
 */
export const QuickList: React.FC<QuickListProps> = (props: QuickListProps): JSX.Element => {
  const { label, items, className, classNames } = props;
  const styles = useQuickListStyles();

  return (
    <div className={cn(styles.root, className, !!classNames?.base && classNames.base)}>
      {label && <Text className={cn(!!classNames?.label && classNames.label)}>{label}</Text>}
      <ul className={cn(!!classNames?.list && classNames.list)}>
        {items.map((item, idx) => (
          <li key={idx} className={cn(!!classNames?.listItem && classNames?.listItem)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
