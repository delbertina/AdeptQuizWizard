import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

test('renders title text', () => {
  render(<Provider store={store}><App /></Provider>);
  const titleElement = screen.getByText("Adept Quiz Wizard");
  expect(titleElement).toBeInTheDocument();
});
