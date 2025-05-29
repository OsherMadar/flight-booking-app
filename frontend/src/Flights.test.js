import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Flights from './Flights';

test('renders Available Flights heading', () => {
  render(<Flights />);
  const heading = screen.getByText(/Available Flights/i);
  expect(heading).toBeInTheDocument();
});
