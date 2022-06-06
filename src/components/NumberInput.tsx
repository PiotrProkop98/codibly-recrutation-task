import React from 'react';
import { TextField } from '@mui/material';

const NumberInput = () => {
    const [value, setValue] = React.useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
        const newValue = e.target.value.replace(/\D/g,'');
        setValue(newValue);
    };

    return (
    <div className="NumberInput">
        <TextField
            label="Filter by ID"
            variant="outlined"
            value={value}
            sx={{ width: '90%' }}
            onChange={e => handleChange(e)}
        />
    </div>
    );
};

export default NumberInput;