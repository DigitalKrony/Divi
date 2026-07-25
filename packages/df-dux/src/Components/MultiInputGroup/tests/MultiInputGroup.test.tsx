/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { beforeEach, describe, expect, it } from 'vitest';
import 'vitest-axe/extend-expect';
import { axe } from 'vitest-axe';
import { render } from '@testing-library/react';

import { MultiInputGroup } from '../MultiInputGroup';

describe('MultiInputGroup', () => {
  let result: any;

  beforeEach(() => {
    const { container } = render(<MultiInputGroup>Default MultiInputGroup</MultiInputGroup>);
    result = container;
  });

  it('renders a basic state', () => {
    expect(result).toMatchSnapshot();
  });

  it('should not have a11y violations', async () => {
    expect(await axe(result)).toHaveNoViolations();
  });
});
