import { render } from '@testing-library/react';

import DataTable from '../components/DataTable';

const testProducts = [
    {
        id: 1,
        name: 'Test name',
        year: '2022',
        color: '#ff0000'
    },
    {
        id: 2,
        name: 'Another project',
        year: '2500',
        color: '#00ff00'
    }
];

test('Renders DataTable component correctly.', () => {
    const { container } = render(<DataTable products={testProducts} />);
    const elements = container.getElementsByClassName('DataTable');
    expect(elements.length).toBe(1);
});