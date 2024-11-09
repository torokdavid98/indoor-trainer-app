import React from 'react';
import { TableCell, Skeleton, TableRow } from '@mui/material';

const SkeletonTable = ({ rows, cells }) => {
    const skeletonRows = Array(rows)
        .fill('')
        .map((row, idx) => ({ ...row, id: idx }));
    const skeletonCells = Array(cells)
        .fill('')
        .map((cell, idx) => ({ ...cell, id: idx }));

    return skeletonRows.map((row) => {
        return (
            <TableRow key={row.id}>
                {skeletonCells.map((cell) => (
                    <TableCell key={cell.id}>
                        <Skeleton animation="pulse" />
                    </TableCell>
                ))}
            </TableRow>
        );
    });
};

export default SkeletonTable;
