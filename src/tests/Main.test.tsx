import { render } from '@testing-library/react';

import Main from '../pages/Main';

test('Renders main page correctly.', () => {
    const { container } = render(<Main />);
    const elements = container.getElementsByClassName('Main');
    expect(elements.length).toBe(1);
});