import React from 'react';
import { cleanup, render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import HomePage from '../index';

describe('home page', () => {
  test('renders a title', () => {
    const { getByTestId } = render(<HomePage />);
    const title = getByTestId('homePage-title-h1');
    expect(title).toHaveTextContent('Home');
  });
});
