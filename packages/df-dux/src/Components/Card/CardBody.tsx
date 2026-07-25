import type { JSX } from 'react';
import { CardBody as HCardBody, extendVariants } from '@heroui/react';
import { mergeClasses } from '@griffel/react';

import type { CardBodyProps } from './Card.types';
import { useCardStyles } from './Card.styles';

const ReCardBody = extendVariants(HCardBody, {});
/**
 * Render the final JSX of Card
 */
export const CardBody: React.FC<CardBodyProps> = (props: CardBodyProps): JSX.Element => {
  const { children } = props;
  const styles = useCardStyles();

  return (
    <ReCardBody {...props} className={mergeClasses(styles.body_root, props.className)}>
      {children}
    </ReCardBody>
  );
};
