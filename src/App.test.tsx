import { render } from '@testing-library/react';

import App from './App';

test('Renders App component correctly.', () => {
  const { container } = render(<App />);
  const element = container.getElementsByClassName('App');
  expect(element.length).toBe(1);
});
