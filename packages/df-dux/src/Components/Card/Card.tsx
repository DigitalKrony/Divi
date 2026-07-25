import type { JSX } from 'react';
import { Card as HCard, extendVariants } from '@heroui/react';
import { mergeClasses } from '@griffel/react';

import type { CardProps } from './Card.types';
import { useCardStyles } from './Card.styles';

const ReCard = extendVariants(HCard, {});
/**
 * Render the final JSX of Card
 */
export const Card: React.FC<CardProps> = (props: CardProps): JSX.Element => {
  const { children, status } = props;
  const styles = useCardStyles();

  return (
    <ReCard
      {...props}
      className={mergeClasses(
        styles.parent_root,
        !!status && styles.has_status,
        !!status && styles[`status_${status}`],
        props.className
      )}
    >
      {children}
    </ReCard>
  );
};
