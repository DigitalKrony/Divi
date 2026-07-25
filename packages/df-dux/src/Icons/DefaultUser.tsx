import type { IconProps } from './icon.types';

export const DefaultUser = (props: IconProps) => {
  const { className, styles, height, width, size } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={styles}
      width={size || width || 800}
      height={size || height || 800}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      {...props}
    >
      <path
        fill="currentColor"
        d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
      />
    </svg>
  );
};
