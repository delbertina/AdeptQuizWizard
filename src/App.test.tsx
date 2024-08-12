import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './shared/test-utils';

test('renders title text', () => {
  renderWithProviders(<App />);
  const titleElement = screen.getByText("Adept Quiz Wizard");
  expect(titleElement).toBeInTheDocument();
});
