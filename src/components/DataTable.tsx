import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const DataTable = () => {
  return (
    <div className="DataTable">
        <TableContainer component={Paper} sx={{ width: '90%', margin: '20px auto 0 auto' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Year</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
};

export default DataTable;