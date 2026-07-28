import type { JSX } from 'react';
import { CardFooter as HCardFooter, extendVariants } from '@heroui/react';
import { mergeClasses } from '@griffel/react';

import type { CardFooterProps } from './Card.types';
import { useCardStyles } from './Card.styles';

const ReCardFooter = extendVariants(HCardFooter, {});
/**
 * Render the final JSX of Card
 */
export const CardFooter: React.FC<CardFooterProps> = (props: CardFooterProps): JSX.Element => {
  const { children } = props;
  const styles = useCardStyles();

  return (
    <ReCardFooter {...props} className={mergeClasses(styles.footer_root, props.className)}>
      {children}
    </ReCardFooter>
  );
};
