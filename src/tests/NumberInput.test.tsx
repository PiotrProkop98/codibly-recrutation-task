import { render, fireEvent } from '@testing-library/react';

import NumberInput from '../components/NumberInput';

test('Renders App component correctly.', () => {
  const { container } = render(<NumberInput />);
  const elements = container.getElementsByClassName('NumberInput');
  expect(elements.length).toBe(1);
});

test('NumberInput contains correct TextField.', () => {
  const { container } = render(<NumberInput />);
  const elements = container.querySelectorAll('.NumberInput input[type="text"]');

  expect(elements.length).toBe(1);
  expect(elements[0].hasAttribute('value')).toBe(true);
});

test('NumberInput TextField accepts numbers.', () => {
  const { container } = render(<NumberInput />);
  const element = container.querySelectorAll('.NumberInput input[type="text"]')[0];

  fireEvent.change(element, { target: { value: '123456' } });

  expect(element.getAttribute('value')).toBe('123456');
});

test('NumberInput TextField contains only numbers.', () => {
  const { container } = render(<NumberInput />);
  const element = container.querySelectorAll('.NumberInput input[type="text"]')[0];

  fireEvent.change(element, { target: { value: 'abcdefg' } });

  expect(element.getAttribute('value')).toBe('');
});
