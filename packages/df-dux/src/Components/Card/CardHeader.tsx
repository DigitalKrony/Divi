import type { JSX } from 'react';
import { CardHeader as HCardHeader, extendVariants } from '@heroui/react';
import { mergeClasses } from '@griffel/react';

import type { CardHeaderProps } from './Card.types';
import { useCardStyles } from './Card.styles';

const ReCardHeader = extendVariants(HCardHeader, {});
/**
 * Render the final JSX of Card
 */
export const CardHeader: React.FC<CardHeaderProps> = (props: CardHeaderProps): JSX.Element => {
  const { children } = props;
  const styles = useCardStyles();

  return (
    <ReCardHeader {...props} className={mergeClasses(styles.header_root, props.className)}>
      {children}
    </ReCardHeader>
  );
};
