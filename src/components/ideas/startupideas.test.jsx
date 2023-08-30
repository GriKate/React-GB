import React from 'react';
import { render } from '@testing-library/react';

describe('startupIdeas', () => {
  it('render text about loading data', () => {
    render(<p>Loading data</p>);
  });
});
