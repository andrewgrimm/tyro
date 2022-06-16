import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Getflix test suite', () => {
  it('should display the home page', () => {
    const { getByText } = render(<App />);

    expect(getByText('Hello world!')).toBeTruthy();
  });
});
