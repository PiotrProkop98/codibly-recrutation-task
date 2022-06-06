import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Product {
    id: number,
    name: string,
    year: string,
    color: string
};

interface PropsType {
    products: Array<Product>
};

const DataTable = (props: PropsType) => {
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
                    {props.products.map((product: Product, key: number) => (
                        <TableRow key={key} sx={{ backgroundColor: product.color }}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.year}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
};

export default DataTable;