import { render, screen } from '@testing-library/react';
import App from './App';

test('App affiche Trouvez le meilleur restaurant près de chez vous', () => {
  render(<App />);
  const textAppElement = screen.getByText(/Trouvez le meilleur restaurant près de chez vous/);
  expect(textAppElement).toBeInTheDocument();
});
