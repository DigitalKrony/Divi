/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import type { JSX } from 'react';

import type { InterstitialViewProps } from './InterstitialView.types';
import { useInterstitialViewStyles } from './InterstitialView.styles';

/**
 * Render the final JSX of InterstitialView
 */
export const InterstitialView: React.FC<InterstitialViewProps> = (
  props: InterstitialViewProps
): JSX.Element => {
  const { children } = props;
  const styles = useInterstitialViewStyles();

  return (
    <div className={styles.root}>{children || `Loading... (Yes, we're going to make this look better)`}</div>
  );
};
