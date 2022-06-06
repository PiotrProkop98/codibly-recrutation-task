import React from 'react';
import { Container } from '@mui/material';

import NumberInput from './components/NumberInput';
import DataTable from './components/DataTable';

const App = () => {
  return (
    <div className="App">
      <Container maxWidth="sm" sx={{ marginTop: '50px', textAlign: 'center' }}>
        <NumberInput />
        <DataTable />
      </Container>
    </div>
  );
};

export default App;
