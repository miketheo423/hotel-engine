import React from 'react';
import { render, screen } from '@testing-library/react';

import Count from './Count';

describe('<Count />', () => {
  it('should properly display the count for numbers less than 999', () => {
    render(<Count count={998} />);

    expect(screen.getByText(998)).toBeInTheDocument();
  });

  it('should properly display the count for numbers greater than 999', () => {
    render(<Count count={20000} />);

    expect(screen.getByText('20k')).toBeInTheDocument();
  });
});
