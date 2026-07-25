/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { beforeEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { render } from '@testing-library/react';

import { Card } from '../Card';

describe('Card', () => {
  let result: any;

  beforeEach(() => {
    const { container } = render(<Card>Default Card</Card>);
    result = container;
  });

  it('renders a basic state', () => {
    expect(result).toMatchSnapshot();
  });

  it('should not have a11y violations', async () => {
    expect(await axe(result)).toHaveNoViolations();
  });
});
