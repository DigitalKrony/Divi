/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import 'vitest-axe/extend-expect';
import { axe } from 'vitest-axe';
import * as axeMatchers from 'vitest-axe/matchers';

import { %name.pascal% } from './../';

expect.extend(axeMatchers);

describe('%name.pascal% Default Unit Test', () => {
  let result: any;

  beforeEach(() => {
    const { container } = render(<%name.pascal%>Default %name.pascal%</%name.pascal%>);
    result = container;
  });

  it('renders a basic state', () => {
    expect(result).toMatchSnapshot();
  });

  it('should not have a11y violations', async () => {
    expect(await axe(result)).toHaveNoViolations();
  });
});