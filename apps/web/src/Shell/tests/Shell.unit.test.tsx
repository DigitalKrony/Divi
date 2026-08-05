import { render, screen } from '@testing-library/react';

import {Shell} from './../Shell';

describe('Shell Component', () => {
  it('renders without crashing', () => {
    render(<Shell />);
    expect(screen.getByText(/New/i)).toBe(true);
  });
});