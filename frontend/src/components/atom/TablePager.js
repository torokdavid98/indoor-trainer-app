import React from 'react';
import { Grid, TablePagination } from '@mui/material';
import { TABLE_ROW_COUNT_OPTIONS } from '../../helpers/constants';

const TablePager = ({
    page,
    rowsPerPage,
    onPageChange,
    rowsPerPageOptions = TABLE_ROW_COUNT_OPTIONS,
    onRowsPerPageChange,
    count = -1,
}) => {
    return (
        <Grid container item xs={12} justifyContent="flex-end">
            <TablePagination
                component="div"
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                rowsPerPageOptions={rowsPerPageOptions}
                onRowsPerPageChange={onRowsPerPageChange}
                labelDisplayedRows={({ from, to }) => `${from}-${to}`}
                labelRowsPerPage="Results per page:"
            />
        </Grid>
    );
};

export default TablePager;
