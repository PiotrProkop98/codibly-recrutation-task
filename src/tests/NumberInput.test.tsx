import { render, fireEvent } from '@testing-library/react';

import NumberInput from '../components/NumberInput';

const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
  //
};

test('Renders NumberInput component correctly.', () => {
  const { container } = render(<NumberInput handleChange={handleInputChange} value="" />);
  const elements = container.getElementsByClassName('NumberInput');
  expect(elements.length).toBe(1);
});

test('NumberInput contains correct TextField.', () => {
  const { container } = render(<NumberInput handleChange={handleInputChange} value="" />);
  const elements = container.querySelectorAll('.NumberInput input[type="text"]');

  expect(elements.length).toBe(1);
  expect(elements[0].hasAttribute('value')).toBe(true);
});