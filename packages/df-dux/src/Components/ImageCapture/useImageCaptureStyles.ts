/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { makeStyles, mergeClasses } from "@griffel/react";
import  { type SlotClassNames } from "@fluentui/react-utilities";

import  {
  type ImageCaptureSlots,
  type ImageCaptureState,
} from "./ImageCapture.types";

export const ImageCaptureClassNames: SlotClassNames<ImageCaptureSlots> = {
  root: "som-imageCapture",
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the ImageCapture slots based on the props
 */
export const useImageCaptureStyles = (
  props: ImageCaptureState
): ImageCaptureState => {
  const styles = useStyles();

  props.root.className = mergeClasses(ImageCaptureClassNames.root, styles.root);

  return props;
};
