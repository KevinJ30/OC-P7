import { render, screen } from '@testing-library/react';
import App from './App';

test('App affiche avis des restaurants autour de chez vous.', () => {
  render(<App />);
  const textAppElement = screen.getByText(/Avis des restaurants autour de chez vous./);
  expect(textAppElement).toBeInTheDocument();
});
