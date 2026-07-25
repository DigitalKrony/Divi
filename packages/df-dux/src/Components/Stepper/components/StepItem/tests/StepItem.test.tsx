/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { beforeEach, describe, expect, it } from 'vitest';
import 'vitest-axe/extend-expect';
import { axe } from 'vitest-axe';
import { render } from '@testing-library/react';

import { StepItem } from '../StepItem';

describe('StepItem', () => {
  let result: any;

  beforeEach(() => {
    const { container } = render(<StepItem>Default StepItem</StepItem>);
    result = container;
  });

  it('renders a basic state', () => {
    expect(result).toMatchSnapshot();
  });

  it('should not have a11y violations', async () => {
    expect(await axe(result)).toHaveNoViolations();
  });
});
