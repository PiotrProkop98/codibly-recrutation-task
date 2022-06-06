import { render } from '@testing-library/react';

import DataTable from '../components/DataTable';

test('Renders DataTable component correctly.', () => {
    const { container } = render(<DataTable />);
    const elements = container.getElementsByClassName('DataTable');
    expect(elements.length).toBe(1);
});