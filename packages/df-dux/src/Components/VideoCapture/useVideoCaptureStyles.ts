/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, mergeClasses } from "@griffel/react";
import type { SlotClassNames } from "@fluentui/react-utilities";

import type {
  VideoCaptureSlots,
  VideoCaptureState,
} from "./VideoCapture.types";

export const VideoCaptureClassNames: SlotClassNames<VideoCaptureSlots> = {
  root: "som-videoCapture",
};

/**
 * Styles for the root slot
 */
export const useVideoCaptureClasses = makeStyles({
  root: {},
  preview: {
    right: "calc(-50% + 16px)",
  },
});

/**
 * Apply styling to the VideoCapture slots based on the props
 */
export const useVideoCaptureStyles = (
  props: VideoCaptureState
): VideoCaptureState => {
  const styles = useVideoCaptureClasses();

  props.root.className = mergeClasses(VideoCaptureClassNames.root, styles.root);

  return props;
};
