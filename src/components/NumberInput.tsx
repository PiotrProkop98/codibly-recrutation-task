import React from 'react';
import { TextField } from '@mui/material';

interface PropsType {
    handleChange: Function,
    value: string
};

const NumberInput = (props: PropsType) => {
    return (
    <div className="NumberInput">
        <TextField
            label="Filter by ID"
            variant="outlined"
            value={props.value}
            sx={{ width: '90%' }}
            onChange={e => props.handleChange(e)}
        />
    </div>
    );
};

export default NumberInput;