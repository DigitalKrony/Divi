/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { useEffect, useRef, useState } from 'react';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';

import { type %name.pascal%Slots, type %name.pascal%Props, type %name.pascal%State } from './%name.pascal%.types';

/**
 * Create the state required to render  %name.pascal%.
 *
 * The returned state can be modified with hooks such as use %name.pascal%Styles,
 * before being passed to render %name.pascal%.
 *
 * @param props - props from this instance of %name.pascal%
 * @param ref - reference to root HTMLElement of %name.pascal%
 */
export const use%name.pascal% = (
  props: %name.pascal%Props,
  ref: React.Ref<HTMLElement> & React.Ref<HTMLDivElement>
) => {
  const {} = props;
  
  const innerRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const root: %name.pascal%State['root'] = slot.always(
    getIntrinsicElementProps('div', {
      ref: useMergedRefs(ref, innerRef.current ? innerRef : undefined) as React.Ref<HTMLDivElement>,
      ...props,
    }),
    { elementType: 'div' }
  );

  useEffect(()=>{
    if(!isLoaded) setIsLoaded(true);
  }, [])

  const state = {
    components: { root: 'div' },
    root,
    isLoaded,
  }

  return state;
};