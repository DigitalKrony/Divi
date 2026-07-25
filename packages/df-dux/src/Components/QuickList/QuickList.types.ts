/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/**
 *  QuickListProps
 */
export type QuickListProps = React.PropsWithChildren & {
  className?: string;
  label?: string;
  items: string[];
  classNames?: {
    base?: string;
    label?: string;
    list?: string;
    listItem?: string;
  };
};
