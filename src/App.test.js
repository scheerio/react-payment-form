import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const text = screen.getByText('Enter your credit card information');
  expect(text).toBeInTheDocument();
});
