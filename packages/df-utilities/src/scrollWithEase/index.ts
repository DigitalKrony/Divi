/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export const scrollWithEase = (props: {
  to: number;
  duration?: number;
  easingFn?: () => number;
  element?: any;
}): void => {
  const { to, duration = 600, easingFn = easeInOutQuad, element } = props;
  const toScroll = element || window;

  let startTime: number | null = null;
  let startY = 0;

  if (element !== undefined) {
    startY = element.scrollTop;
  } else {
    startY = toScroll.scrollY || toScroll.pageYOffset;
  }

  const distance = to - startY;

  const animation = (currentTime: number) => {
    if (!startTime) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easingFn(progress);

    toScroll.scrollTo(0, startY + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
