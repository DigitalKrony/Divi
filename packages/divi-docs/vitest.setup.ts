/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { expect } from "vitest";
import * as matchers from "vitest-axe/matchers";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/react-vite";
import "vitest-axe/extend-expect";

import * as projectAnnotations from "./storybook-config/preview";

setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);

expect.extend(matchers);
