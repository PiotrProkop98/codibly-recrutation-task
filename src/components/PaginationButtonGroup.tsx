import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

interface PropsType {
    handleOnNextClick: Function,
    handleOnPreviousClick: Function,
    nextButtonDisabled: boolean,
    previousButtonDisabled: boolean
};

const PaginationButtonGroup = (props: PropsType) => {
  return (
    <div className="PaginationButtonGroup">
        <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginTop: '30px' }}>
            <Button onClick={e => props.handleOnPreviousClick(e)} disabled={props.previousButtonDisabled}>previous</Button>
            <Button onClick={e => props.handleOnNextClick(e)} disabled={props.nextButtonDisabled}>next</Button>
        </ButtonGroup>
    </div>
  );
};

export default PaginationButtonGroup;