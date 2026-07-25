import type { CardProps as HCardProps, CardFooterProps as HCardFooterProps } from '@heroui/react';

/**
 *  CardProps
 */
export type CardProps = React.PropsWithChildren &
  HCardProps & {
    status?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  };

export type CardBodyProps = React.PropsWithChildren & {
  className?: string;
};

export type CardHeaderProps = React.PropsWithChildren & {
  className?: string;
};

export type CardFooterProps = React.PropsWithChildren & HCardFooterProps & {};
